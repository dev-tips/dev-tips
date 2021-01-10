Title: Asynchronous event bus

-----

Date: 1610272918

-----

Description: What happens if an event publisher is emitting an event before any relevant event subscribers are registered? (And how a queue can prevent such event from getting lost.)

-----

Authors: rasshofer

-----

Text:

You may remember our basic (reference: frontend/using-the-publish-subscribe-pattern-and-a-shared-event-bus-to-decouple-frontends text: event bus) implementation and may ask yourself what happens if a subscriber is loaded later than a publisher. This is a quite common issue, so let’s have a look at how we can still implement a simple pub/sub event bus by adding a queue to it.

The following example describes the »happy path« of event buses: the relevant subscriber(s) are registered before the first publisher is emitting an event using that topic.

```js
bus.subscribe('userJoined', (name) => {
  console.log(`Hello, ${name}!`);
});

bus.publish('userJoined', 'Jane');
```

However, the following order of calls would cause aforementioned issue: the publisher is emitting an event before any relevant subscriber is registered.

The event simply gets lost and nothing happens.

```js
bus.publish('userJoined', 'Jane');

bus.subscribe('userJoined', (name) => {
  console.log(`Hello, ${name}!`);
});
```

To prevent this, we need to add a queuing mechanism to our event bus which will ensure the following conditions/prerequisites.

1. Publishers are not only emitting their event but also store that event in a queue.
2. Subscribers check the queue when being registered to handle previous events as well.

The following exemplary implementation limits the queue to 10 items. Depending on the structure and extent of the event payloads, the queue may consume quite some memory and cause memory leaks. Due to this, it makes sense to have such a basic limitation in place.

```js
const QUEUE_MAX_ITEMS = 10;

const bus = {};
const handlers = {};
const queue = {};

// Publish some data on a named topic
bus.publish = (topic, ...args) => {
  // Run existing handlers if present
  if (handlers[topic]) {
    handlers[topic].forEach((handler) => {
      handler(...args);
    });
  }

  // Add event to queue for potential future subscribers
  queue[topic] = [...(queue[topic] || []).slice(-1 * QUEUE_MAX_ITEMS), args];
};

// Register a callback on a named topic
bus.subscribe = (topic, handler) => {
  if (!handlers[topic]) {
    handlers[topic] = [];
  }

  handlers[topic].push(handler);

  // Run existing handlers in queue if present
  (queue[topic] || []).forEach((args) => {
    handler(...args);
  });

  // Return function to unsubscribe
  return () => {
    handlers[topic] = handlers[topic].filter((item) => item !== handler);
  };
};
```

Using this event bus implementation, the following example works as expected: both event subscriptions are considered even though the publisher is triggering the event in-between.

```js
bus.subscribe('userJoined', (name) => {
  console.log(`Hello, ${name}!`);
});

bus.publish('userJoined', 'Jane');

bus.subscribe('userJoined', (name) => {
  console.log(`Hello again, ${name}!`);
});
```
