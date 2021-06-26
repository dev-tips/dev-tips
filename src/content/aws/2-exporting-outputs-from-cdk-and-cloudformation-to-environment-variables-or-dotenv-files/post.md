Title: Exporting outputs from CDK and CloudFormation to environment variables or ».env« files

-----

Date: 1624742354

-----

Description: When running an application involving different services on AWS, you may need to export infrastructure output (e.g. API endpoints) as environment variables or ».env« files for further use (e.g. SPA frontends such as React or Vue.js).

-----

Authors: rasshofer

-----

Text:

Based on (npm: @aws-sdk/client-cloudformation), you can access the output variables of your AWS CloudFormation stacks (which may have been created via AWS CDK) easily and prepare/export them to environment variables or `.env` files. The following example shows how the function `getStackName` (which is shared between this custom script and CDK to generate a stack name for the current project and feature branch deployment) is used to get the right stack name and then fetch all outputs from the CloudFormation stack.

```ts
import {
  CloudFormationClient,
  DescribeStacksCommand,
} from '@aws-sdk/client-cloudformation';
import { getStackName } from '../lib/utils';

const whitelist = ['UiEndpoint', 'BffEndpoint'];

(async () => {
  const client = new CloudFormationClient({
    region: process.env.AWS_DEFAULT_REGION,
  });
  const stackName = getStackName();
  try {
    const describeStacks = new DescribeStacksCommand({
      StackName: stackName,
    });
    const response = await client.send(describeStacks);
    const stack = response.Stacks?.find(stack => stack.StackName === stackName);
    if (stack) {
      const variables = (stack.Outputs || [])
        .filter(({ OutputKey }) => OutputKey && whitelist.includes(OutputKey))
        .reduce(
          (acc, { OutputKey, OutputValue }) => ({
            ...acc,
            [String(OutputKey)]: String(OutputValue),
          }),
          {} as Record<string, string>,
        );
      console.log(
        [
          {
            key: 'PUBLIC_URL',
            value: `https://${variables.UiEndpoint}`,
          },
          {
            key: 'REACT_APP_BFF_ENDPOINT',
            value: String(variables.BffEndpoint).replace(/\/$/, ''),
          },
        ]
          .map(({ key, value }) => `${key}="${value}"`)
          .join('\n'),
      );
    }
  } catch {
    /* NOOP */
  }
})();
```

In CDK, these dedicated outputs can be created as follows.

```ts
const ui = new UI(this, 'UI');
const bff = new BFF(this, 'BFF');

new cdk.CfnOutput(this, 'UiEndpoint', {
  value: ui.bucket.bucketDomainName,
});

new cdk.CfnOutput(this, 'BffEndpoint', {
  value: bff.api.url,
});
```

(`UI` and `BFF` here are custom CDK constructs wrapping `s3.Bucket` and `apigw.LambdaRestApi` respectively.)

Running this CLI script will return the prepared environment variable definitions which may be stored as `.env` file for further use and processing or directly sourced in the current environment. Of course, you can also write the `.env` file (or other configuration files such as `application.properties`) directly within the script if you prefer. The example above implements a dedicated whitelist of outputs to consider which is not necessary but helps to prevent you from leaking potential secrets by accident.

The CLI script can be included in a CI/CD pipeline to create a `.env` file which may then be consumed by a subsequent pipeline step (e.g. a React/Vue.js application build which takes the environment variables into consideration). Due to possible limitations of the consuming systems, naming conventions for environment variables may apply (e.g. the `REACT_APP_` and `VUE_APP_` prefixes for React and Vue.js for non-standard variable names).

The following example shows a reduced GitLab CI example where the CLI script runs as part of the `prepare` stage and creates a `.env` file for the subsequent `build` stage/job.

```yaml
env-variables:
  stage: prepare
  script:
    - yarn ts-node env-variables.ts > ../../.env
  artifacts:
    untracked: true
    expire_in: 1 hour

build:
  stage: build
  dependencies:
    - env-variables
  script:
    - yarn build
```

This allows to e.g. fetch the URL of an API from CloudFormation and passing it to the build process of the static React/Vue.js frontend application where the URL is bundled statically.
