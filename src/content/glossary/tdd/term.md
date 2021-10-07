Title: TDD

-----

Alias: Test-driven Development

-----

Description: A method of software development where a test is written first and before the actual code that is tested is implemented. Afterwards, the implementation is done to ensure its tests pass.

-----

Authors: rasshofer

-----

Text:

The test is then executed and fails because the code to be tested doesn’t exist yet. The next step is to implement the missing code for the test. This is repeated until the test works. After the test has been successfully executed, the code may be refactored. Once the test works and refactoring is no longer necessary, a new test can be written. This process is repeated until all functions are implemented.

This way, the test determines how the software is supposed to be implemented and indicates whether it meets the requirements. As soon as the implementation is completed, the test need/have to run successfully as a consequence.

This leads to a software architecture that is precisely aligned with the requirements and is easy to test. If a test fails, there is either no implementation for it yet or there is a problem in the source code.

Tests are written at different levels and for different purposes. Integrations to other systems can be checked and fixed side effects can be excluded by means of own tests.

With such tests you get a high test coverage from the beginning and thus a risk reduction for the software project.
