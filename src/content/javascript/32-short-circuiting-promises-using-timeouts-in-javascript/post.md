Title: Short-circuiting promises using timeouts in JavaScript

-----

Date: 1653057586

-----

Description: In case a promise may need too long to resolve, short-circuiting it using a timeout ensures good and fail-safe user experience.

-----

Authors: rasshofer

-----

Text:

Taking transactional event tracking as an example, you may want/have to wait for a tracking promise (which may do e.g. a network call to send the tracking event data to Google Analytics or any custom tracking tool) to fulfill before proceeding with the application flow, e.g. in order to track a conversion. If one wouldn’t wait for that tracking event to complete, it could be that the conversion gets lost.

But what happens if the tracking promise takes too long, e.g. because the network is unstable or slow? To prevent (or, more precisely, reduce) bad user experience, you may short-circuit such promises by introducing timeout promises and letting both race against each other. The following example demonstrates this as code.

```ts
const circuitBreaker = async <T>(
  promise: Promise<T>,
  timeout = 3000,
): Promise<T | void> => {
  let timer: number | undefined;
  return Promise.race([
    promise,
    new Promise<void>((resolve) => {
      timer = window.setTimeout(() => resolve(), timeout);
    }),
  ]).finally(() => clearTimeout(timer));
};
```

`Promise.race` returns the first successful or failed promise as soon as one of the passed promises succeeds or fails. This way the timeout promise serves as some kind of fallback in case the original promise takes too long and resolves after the fallback promise (e.g. after 3 seconds). But if everything goes well, the original promise will be fast(er) and »win the race«.

```ts
const trackEvent = async (name: string) =>
  circuitBreaker(
    new Promise<void>((resolve) => {
      myTrackingTool.track(name, () => {
        resolve();
      });
    }),
  );
```

The example above demonstrates how the (hypothetical) `myTrackingTool.track` method is wrapped into a promise and short-circuited using the aforementioned generic helper function.

In your application, you now can use/await that promise without blocking the original method for longer than the defined amount of milliseconds (i.e. `3000` by default).

```tsx
actions.map(({ id, name }) => (
  <button
    key={id}
    onClick={async () => {
      await trackEvent(`${name} Click`);
      await handleAction(id);
    }}
  >
    {name}
  </button>
));
```

Of course, this basic concept can (and should) be combined with e.g. retrying and exponential back-off to provide a real fail-safe user experience. While the example above implements soft-failing (by resolving the fallback promise without any value), it can be adjusted to fail hard by rejecting the fallback promise as well depending on the intended use-case.
