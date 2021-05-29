Title: A/B tests with React and Google Optimize or Optimizely

-----

Date: 1622280210

-----

Description: Due to React re-rendering the DOM autonomously (and thus unpredictably), it’s not possible to use the usual WYSIWYG (»What You See Is What You Get«) approach of A/B testing tools like Google Optimize or Optimizely used by non-developers to maintain A/B tests.

-----

Authors: rasshofer

-----

Text:

As the WYSIWYG approach interoperates directly with the DOM (»Document Object Model«), any of such changes would immediately be overridden by React in the next re-render cycle and get lost. As a consequence, you’ll need to implement the experiments on a React level.

For this, a dedicated React component needs to be implemented that accepts an experiment ID and React nodes to render for each variant. From a process point of view, this means that tests have to be prepared and implemented by the development team after the testing team provides information about the experiment.

## Setting up the generic React component for experiments

First of all, we need a dedicated wrapper component which takes care of determining the proper variant and rendering the respective variant React node. Using an agreed experiment ID, Google Optimize or Optimizely inform the component via some kind of (reference: frontend/using-the-publish-subscribe-pattern-and-a-shared-event-bus-to-decouple-frontends text: event bus) or globally exposed API that they’d like to enable an experiment and what variant of that experiment.

The basic implementation of the `Experiment` component and the necessary types may look as follows.

```ts
export type ExperimentVariant = {
  id: string;
  variant: number;
};

export type ExperimentCallback = {
  id: string;
  callback: (variant: number) => void;
};

export type Experiments = {
  register: (experiment: ExperimentCallback) => void;
  unregister: (experiment: ExperimentCallback) => void;
  activate: (experiment: ExperimentVariant) => void;
};

export type ExperimentsObj = Record<string, number>;

declare global {
  interface Window {
    experiments: Experiments;
  }
}
```

```ts
import { FC, ReactElement, useEffect, useState } from 'react';

export interface ExperimentProps {
  id: string;
  default: ReactElement;
  variants: ReactElement[];
}

export const Experiment: FC<ExperimentProps> = ({
  id,
  default: defaultVariant,
  variants,
}) => {
  const [variant, setVariant] = useState<number>(0);

  if (typeof window !== 'undefined' && window.experiments) {
    useEffect(() => {
      window.experiments.register({
        id,
        callback: setVariant,
      });

      return () => window.experiments.unregister({ id, callback: setVariant });
    }, []);
  }

  if (variant && variant !== 0 && variants[variant - 1]) {
    return variants[variant - 1];
  }

  return defaultVariant;
};
```

As you can see, we’re referencing a global API at `window.experiments`. The purpose of this API is to be the central state of experiments, i.e. a way to allow the React component to register and unregister itself from the experiment pool and manage the current state of all registered experiments and their variants.

In addition, the test variants are represented as an array using the following indexing.

- `0` = default variant
- `1` = first variant in variants array
- `2` = second variant in variants array
- (and so and and so forth)

## Setting up the global API for toggling experiments

For the aforementioned example, the `window.experiments` API may be defined as follows.

```ts
const experimentList: ExperimentsObj = {};

const activate = (experiment: ExperimentVariant) => {
  experimentList[experiment.id] = experiment.variant;
  document.dispatchEvent(new Event(`experiment:${experiment.id}`));
};

const handleExperiment = ({ id, callback }: ExperimentCallback) => {
  callback(experimentList[id] ?? 0);
};

const register = ({ id, callback }: ExperimentCallback) => {
  const experiment = experimentList[id];
  if (experiment) {
    callback(experiment);
  } else {
    document.addEventListener(`experiment:${id}`, () =>
      handleExperiment({ id, callback }),
    );
  }
};

const unregister = ({ id, callback }: ExperimentCallback) => {
  const experiment = experimentList[id];
  if (experiment) {
    document.removeEventListener(`experiment:${id}`, () =>
      handleExperiment({ id, callback }),
    );
  }
};

window.experiments = {
  activate,
  register,
  unregister,
};
```

## Using the Experiment component

Now that both the global API for Google Optimize or Optimizely and the React component itself are prepared, the first experiment can be embedded into the existing application.

```tsx
<Experiment
  id="product-label-test"
  default={<Badge label="Advertisement" />}
  variants={[
    <Badge label="Offer" />,
    <Badge label="Recommendation" />,
  ]}
/>;
```

## Setting up tests in Google Optimize or Optimizely

Finally, the testing team can create a new test/experiment in the Google Optimize or Optimizely console. For all variants, executing custom JavaScript code needs to be defined as variant change which triggers the respective variant by using the globally exposed `window.experiments` API as demonstrated below.

```ts
window.experiments.activate({
  id: 'product-label-test',
  variant: 1,
});
```

## Showing a loading state placeholder (e.g. skeleton)

In case Google Optimize or Optimizely are not available (e.g. because the user is using an ad blocker or the systems take too long to load), the default variant is shown in aforementioned example, because no test variant is ever activated.

To prevent visual flickering for the end user (i.e. the default variant being exchanged for a test variant after a few seconds), you may want to show a loading state such as a skeleton or loading spinner for the time being. However, this loading state needs to be combined with a proper timeout to fall back to the default variant in case the initialization takes too long.

```ts
export interface ExperimentProps {
  id: string;
  default: ReactElement;
  variants: ReactElement[];
  skeleton?: ReactElement;
}

export const Experiment: FC<ExperimentProps> = ({
  id,
  default: defaultVariant,
  variants,
  skeleton = defaultVariant,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [variant, setVariant] = useState<number>(0);

  if (typeof window !== 'undefined' && window.experiments) {
    // If no experiment has been activated after 3 seconds, the default variant will be shown
    const timer = window.setTimeout(() => {
      if (isLoading) {
        setVariant(0);
        setIsLoading(false);
      }
    }, 3 * 1000);

    const callback = (variant: number): void => {
      window.clearTimeout(timer);
      setIsLoading(false);
      setVariant(variant);
    };

    useEffect(() => {
      window.experiments.register({
        id,
        callback,
      });

      return () => window.experiments.unregister({ id, callback });
    }, []);
  }

  if (isLoading) {
    return skeleton;
  }

  if (variant && variant !== 0 && variants[variant - 1]) {
    return variants[variant - 1];
  }

  return defaultVariant;
};
```

The main change is the `skeleton` property which allows passing a placeholder element, the internal `isLoading` state, and the timeout which makes sure that the default variant is shown after maximum 3 seconds in case Google Optimize or Optimizely are unavailable or take too long to determine a variant.
