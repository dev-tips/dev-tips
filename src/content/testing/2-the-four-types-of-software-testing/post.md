Title: The four types of software testing

-----

Date: 1611484308

-----

Description: A holistic view on what makes up software testing and what the difference between static tests, unit tests, integration tests, and end-to-end tests is. And, of course, how/where you should start testing.

-----

Authors: rasshofer

-----

Text:

## Static tests: linting is another form of testing

Performing a static code analysis to flag potential errors and suspicious sections of code is the easiest way of testing. The source code gets checked, among other things, for syntactic/logical programming errors, uniform formatting, and the implementation of best practices. Linters are the only way to ensure that all team members produce consistent code.

(image: static-linting.png)

For languages like JavaScript, this doesn’t only include characteristic linters like ESLint or Prettier but also super-sets introducing typing like TypeScript.

(image: type-check.png)

Having strict typing in your project also benefits the static tests and catches a lot of potential runtime issues like usage of wrong or inconsistent data types.

## Unit tests: the backbone of testing

Unit tests place the test focus on the smallest units of the software design: the individual module. A »unit« is defined as the smallest component possible for the compilation and is tested in an isolated manner. This can be, for example, individual functions or methods of a class. Some problems which may be covered by unit tests are as follows.

1. Wrong or inconsistent typing (if not caught by aforementioned static tests already)
2. Incorrect initialization or default values
3. Incorrectly written or truncated variables
4. Inconsistent data types
5. Underflow, overflow, and exceptions in addressing

(image: unit-testing.png)

However, in real life, such units don’t always exist in isolation and may require dependencies or specific values, forcing you to fake these dependencies/parameters that your unit needs to run but aren’t part of the unit itself. There are several names and definitions such as »mock« or »stub« for such objects that aren’t real.

The classification between »mocks« and »stubs« (and other terms such as »fakes« or »dummies«) usually is highly inconsistent and basically there isn’t too much of a difference. All of those terms simply are test doubles. As a rule of thumb, if you’re making assertions against such a fake (e.g. checking whether it was called a specific amount of times or with specific parameters), it means you’re using the fake as a »mock«. But if you’re using the fake only to run the test without assertion over it, you’re using the fake as a »stub«.

The actual unit tests are written after a module has been implemented. Another approach is to write unit tests before implementing the actual module. This concept is taken from development methodologies such as TDD (»test-driven development«).

The following example demonstrates a basic function and its unit test.

```js
const sum = (a, b) => {
  return a + b;
};
```

```js
test('Adding 1 + 2 equals 3', () => {
  expect(sum(1, 2)).toBe(3);
});

test('Floating point edge cases are handled properly', () => {
  expect(sum(0.1, 0.2)).toBe(0.30000000000000004);
});

test('Adding non-numbers is caught', () => {
  expect(sum('A', 'B')).toBe('AB');
});
```

The last test case also shows an examplary issue of that function: it doesn’t validate its input parameters, allowing the function to be used with strings as well. This could be a potential bug finding that is fixed next and covered by dedicated test cases to prevent future regressions.

## Integration tests: an extension of unit tests

Integration tests verify that several units work together in harmony, i.e. if and how those different parts of a system work together holistically, which is especially useful when simple unit tests aren’t enough. Even if the individual modules have already been tested by unit testing and appear to work, a combination of modules may introduce new problems.

(image: integration-testing.png)

However, this adds some complexity to the test environment, making integration tests usually take longer and often more difficult to write and maintain. The line between integration tests and unit tests sometimes is a bit squishy and characterized mostly by the fact that less functionalities are mocked in integration tests – basically only those functionalities you really can’t do (e.g. charging bank accounts or credit cards). Everything else (e.g. third-party dependencies such as npm packages) are considered part of the integration and thus should be covered in integration tests.

The following example demonstrates a function that integrates different other smaller functions which have external dependencies (like HTTP APIs). Within the test cases, only external dependencies are mocked to keep the test runs fast, reliable, and independent of any external sources. All other functions are used as-is.

```js
const axios = require('axios');

const { getInitialState } = require('./state');

jest.mock('axios');

describe('State', () => {
  it('provides initial data', async () => {
    const mockedPosts = [
      {
        userId: 1,
        id: 1,
        title: 'title',
        body: 'body',
      },
      {
        userId: 1,
        id: 2,
        title: 'title',
        body: 'body',
      },
      {
        userId: 1,
        id: 3,
        title: 'title',
        body: 'body',
      },
      {
        userId: 1,
        id: 4,
        title: 'title',
        body: 'body',
      },
      {
        userId: 1,
        id: 5,
        title: 'title',
        body: 'body',
      },
    ];

    axios.get.mockImplementationOnce(() => Promise.resolve(mockedPosts));

    const initialState = await getInitialState();

    expect(initialState).toMatchSnapshot();
  });
});
```

```js
const { fetchPosts } = require('./posts');
const { getImageForUser } = require('./image');

const getInitialState = async () => {
  const posts = await fetchPosts();
  const postsWithImages = await Promise.all(
    posts.map(async (post) => ({
      ...post,
      avatar: await getImageForUser(post.userId),
    })),
  );
  return postsWithImages.slice(0, 3);
};
```

```js
const axios = require('axios');

const API_ENDPOINT = 'https://example.com';

const fetchPosts = async () => {
  const url = `${API_ENDPOINT}/posts`;
  return await axios.get(url);
};
```

## End-to-end/E2E tests: emulating user interactions

End-to-end tests (sometimes called »functional tests«) are designed to test the critical paths of an application from the end-user perspective (instead of relying on the users to do it for you) and are performed at the end of the test cycle, i.e. after the unit/integration tests, by using tools like Cypress or Selenium to automate a web browser (or device) and check user actions. Realistic usage scenarios/flows are ran through in an automated manner in the application, covering as many functional areas and parts of the used technology stack as possible.

E2E testing is usually performed in the most realistic test environment possible, including the genuine backend services and external interfaces such as network, database, or third-party services. This is also why E2E testing can reveal problems that would otherwise only be apparent in a live environment compared to the isolated and mocked environments used for unit/integration tests.

(image: e2e-testing.png)

In contrast to unit/integration tests (which are much more limited in scope), E2E tests are much more complex, error-prone, and require high maintenance as well as more time to execute as real user interactions are simulated. Due to this, it’s common to implement fewer E2E tests than unit/integration tests.

(image: e2e-testing-browser.png)

(image: e2e-testing-console.png)

The following example demonstrates a test emulating different user interactions within an actual browser.

```js
describe('TODO Demo Application', () => {
  beforeEach(() => {
    cy.visit('https://todomvc.com/examples/react');
  });

  context('When the application is initially opened', () => {
    it('should focus on the input field', () => {
      cy.focused().should('have.class', 'new-todo');
    });
  });

  context('When adding items', () => {
    it('allows to add new items', () => {
      cy.get('.new-todo').type('do something').type('{enter}');
      cy.get('.new-todo').type('do something else').type('{enter}');
      cy.get('.todo-list li').should('have.length', 2);
    });

    it('should clear text input field after an item is added', () => {
      cy.get('.new-todo').type('do something').type('{enter}');
      cy.get('.new-todo').should('have.text', '');
    });
  });
});
```

In addition, for some types of tests (such as performance tests), it may be necessary to run the tests over a few days. The problem with the increased run times is the loss of immediate feedback.

## Smoke tests: establishing confidence in releases/builds

In the software industry, »smoke tests« are an example of E2E testing and build verification tests to establish (or improve) the confidence of stakeholders and development teams in a release/build. Smoke testing covers most of the key functionality of a product from an end-user’s perspective. However, all features defined for this test suite are tested superficially at the most important points and to see if and where »smoke is rising«. Even the main features are explicitly not tested down to the very smallest detail.

On the one hand, it may be a good reference point to base the release decision on. By means of a smoke test, it’s relatively easy to demonstrate that the product works and that there are no serious problems.

On the other hand, a failed smoke test shows that the product is »badly broken«. More detailed testing in this case would be a waste of time and resources.

Last but not least, it’s a good way to check if everything went well after a release. Since it’s not a complex/complete test of the website/application, the smoke test can be executed after a production deployment in order to quickly detect issues and errors in production.

## How/where you should start testing

You should focus on the end-users first and prioritize smoke tests (and E2E tests in general). Your software most likely will use some third-party scripts and APIs (such as tracking integrations, chat bot, or GDPR banner) or have a server misconfiguration that may break your website/application and make it unusable while all your unit/integration tests passed flawlessly in abstracted and mocked lab conditions.

Nobody cares about fast tests/pipelines if the end-product is not working for its users.

If you built trust and confidence with good E2E test coverage, you should focus on good integration tests next.

Fast and easy unit tests come last.

There is no rule of thumb what percentage of which type of tests to write. Focus on writing effective tests that establish confidence and allow you to deliver features/fixes continuously.
