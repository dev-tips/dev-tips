Title: BDD

-----

Alias: Behavior-driven Development

-----

Description: An evolution of TDD that facilitates non-programmers to write specifications in the form of test cases and thus improve the quality of the software.

-----

Authors: rasshofer

-----

Text:

Compared to TDD, with BDD not a test case is defined, but an expectation. Stakeholders have no primary interest in how something is implemented, but only that it’s implemented correctly.

Each feature is broken down by the stakeholders into several scenarios and recorded in writing in a standardized form. This makes it easy to involve e.g. the business department more deeply in the specification of an application. The goal is not a collection of tests but an executable specification of the software to be developed.

In practice, there are various tools that simplify working with BDD. The best known is probably [Cucumber](https://cucumber.io/) and its ports to various programming languages. Here, the [Gherkin syntax](https://cucumber.io/docs/gherkin/) is used to define the test cases in a formal language. It’s a domain specific language that maps English phrases via regular expressions to programming language functions/instructions.

```gherkin
Given my bank account has a positive balance
When I attempt to withdraw an amount less than my current balance
Then the withdrawal should complete without errors
```

The word `Given` is the preparatory step with which the system is brought into the desired state to be able to be tested. With the word `When`, the user (inter-)actions of the functionality to be tested are executed. The word `Then` is then used to compare the expected result with the actual result.
