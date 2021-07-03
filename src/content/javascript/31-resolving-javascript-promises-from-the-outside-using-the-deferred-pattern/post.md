Title: Resolving JavaScript promises from the outside using the »Deferred« pattern

-----

Date: 1625347154

-----

Description: Native promises in JavaScript don’t expose public »resolve« and »reject« methods. However, if you need to resolve a promise from the outside, e.g. to pause or delay asynchronous operations, you can simply use a custom »Deferred« class.

-----

Authors: rasshofer

-----

Text:

In general, while a promise represents a value that isn’t yet known, a deferred object represents an operation that isn’t yet finished. While `Promise` is a value returned by an asynchronous function, `Deferred` isn’t associated with any specific asynchronous operation but can be resolved (or rejected) by its caller (using its exposed `resolve()` and `reject()` methods) from the outside, separating the promise from the resolver. Every deferred object holds a promise internally which works as a proxy for the future result.

An implementation can be done as class as follows.

```ts
export class Deferred {
  public promise: Promise<void>;
  public resolve: () => void = () => undefined;
  public reject: () => void = () => undefined;

  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}
```

As an alternative, you can use a plain (named) function as well, doing the exact same thing.

```js
function deferred() {
  const obj = {};
  obj.promise = new Promise((resolve, reject) => {
    obj.resolve = resolve;
    obj.reject = reject;
  });
  return obj;
}
```

Now, when using this helper class/function, anybody can create and resolve/reject a `Deferred` instance. This is useful when needing to pause or delay asynchronous operations from outside of the current flow.

Let’s take the following use-case: a React application with a simple button that triggers some action. We want to show a confirmation modal and delay any (asynchronous) action until the user interacted with the modal. This means the modal controls the deferred object, decides when it should resolve/reject, and thus controls when the main application continues. The main application then only waits for the deferred promise and when to continue its operation.

```tsx
import { FC } from 'react';
import { Deferred } from './deferred';

type ConfirmationModalProps = {
  text: string;
  shouldContinue: Deferred;
};

export const ConfirmationModal: FC<ConfirmationModalProps> = ({
  text,
  shouldContinue,
}) => (
  <div className="modal">
    <p>{text}</p>
    <button
      onClick={() => {
        shouldContinue.resolve();
      }}
    >
      Okay
    </button>
    <button
      onClick={() => {
        shouldContinue.reject();
      }}
    >
      Cancel
    </button>
  </div>
);
```

```tsx
import { FC, useState } from 'react';
import { ConfirmationModal } from './ConfirmationModal';
import { Deferred } from './deferred';

const doSomething = async () => {
  console.log('Did something');
};

const doSomethingElse = async () => {
  console.log('Did something else');
};

export const App: FC = () => {
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [confirmationConfig, setConfirmationConfig] = useState<
    | {
        text: string;
        shouldContinue: Deferred;
      }
    | undefined
  >();

  return (
    <>
      {showConfirmation && confirmationConfig ? (
        <ConfirmationModal
          text={confirmationConfig.text}
          shouldContinue={confirmationConfig.shouldContinue}
        />
      ) : null}
      <button
        onClick={async () => {
          // Create new `Deferred` instance
          const shouldContinue = new Deferred();
          setConfirmationConfig({
            text: 'Do you really want to do this?',
            shouldContinue,
          });
          setShowConfirmation(true);
          // Do some initial operation
          await doSomething();
          try {
            // Pause further execution until this promise is either resolved or rejected
            await shouldContinue.promise;
            // Do the actual operation
            await doSomethingElse();
          } catch {
            // Do nothing
          } finally {
            setShowConfirmation(false);
          }
        }}
      >
        Do something
      </button>
    </>
  );
};
```

As you can see, `shouldContinue` is the shared API between the confirmation modal and the main application. It’s initialized in the main application but controlled from the outside, i.e. the confirmation modal component.

Once the main button is clicked, the asynchronous operation `doSomething` is executed right away in the background. However, for `doSomethingElse` to be executed, the user needs to confirm that action using the confirmation modal. Due to `await shouldContinue.promise`, any subsequent operation is delayed until the externally controlled promise is resolved. This is done in the confirmation modal: it either resolves or rejects the deferred object once the user clicks on one of the available actions/buttons.

Another example could be creating a global deferred object for a third-party callback (e.g. doing something once a polyfill library is initialized) where the outside third-party system is in control of the state and several internal systems are waiting for the promise to be resolved.

```ts
window.polyfillLoaded = new Deferred();

something.init({
  onPolyfillLoaded() {
    window.polyfillLoaded.resolve();
  },
});
```

```ts
(async () => {
  await window.polyfillLoaded();
  // Polyfills are ready, now do something
})();
```

(Of course, deferred objects also can provide actual values as a result of their internal promise being resolved. In the aforementioned examples, it’s simply used as a plain breakpoint to pause/delay the main control flow.)
