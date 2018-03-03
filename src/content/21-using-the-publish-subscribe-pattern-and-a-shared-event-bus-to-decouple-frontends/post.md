Title: Using the publish/subscribe pattern and a shared event bus to decouple frontends

-----

Date: 1520081279

-----

Contributors: rasshofer

-----

Text:

In software engineering, »design patterns« are generalized and reusable solutions to common problems. Within this article, the »publish/subscribe« pattern (»pub/sub«), which is well known and ordinary applied within backends, shall be adapted to frontends.

## An introduction to pub/sub

The main idea of pub/sub is delivering and processing events/notifications asynchronously. This is usually performed by using an implementation of a shared »event bus«. The bus is designed as an interface with the API needed to subscribe (and unsubscribe) to events and to publish events.

Event generators (»publishers«) send events to the shared event bus and event processors (»subscribers«) subscribe to the shared event bus. Subsequently, subscribers process the notifications and may create new events and publish them back to the event bus. This approach solves the following key problems in modern Web application development.

- Tightly coupled systems are a common problem: If a change to a component requires a change in an other component, it may end up in unexpected errors, an ensuing waterfall of changes, and aggravated testing of components in isolation.
- To ensure flexibility and future-proofness, the underlying technology should be free to choose: One should be able to write parts of projects in plain JavaScript, Vue, React, or Angular and to have it work seamlessly with the rest of the site/application. This is especially relevant for microservice-ish frontends but may also be necessary for integrating and interacting with third-party components.

## Implementation

Now that it’s obvious how the pattern works and what kind of problems it solves, let’s start creating a simple event bus system.

```js
const bus = {};
const handlers = {};

// Publish some data on a named topic
bus.publish = (topic, ...args) => {
  if (handlers[topic]) {
    handlers[topic].forEach((handler) => {
      handler(...args);
    });
  }
};

// Register a callback on a named topic
bus.subscribe = (topic, handler) => {
  if (!handlers[topic]) {
    handlers[topic] = [];
  }

  handlers[topic].push(handler);

  // Return function to unsubscribe
  return () => {
    handlers[topic] = handlers[topic].filter((item) => item !== handler);
  };
};
```

We can use this `bus` object to send messages between components using its standardized API. Every module can be built using its own technology and framework – it just has to publish events and handle incoming events.

To prevent events from replicating to all subscribers without filtering (even if a subscriber doesn’t have the ability or need to consume the event data) the implementation above uses »topics« for namespacing events. This avoids an increase of memory demand with the rise of subscribers in time and eludes filtering within the subscribers as a prerequisite.

Furthermore, by using the function `subscribe` returns, it’s easy to discontinue listening to events later on.

```js
const sidebar = document.querySelector('.sidebar');

bus.subscribe('chat:initializedChatSession', (session) => {
  sidebar.insertAdjacentHTML('beforeend', `
    <div class="status">
      You’re in chat with ${session.agentName} right now.
    </div>
  `);
});
```

```js
function startChat () {
  // Chat module does something
  bus.publish('chat:initializedChatSession', {
    id,
    userName,
    agentName
  });
}
```

The two modules above don’t know anything about each other. Their implementation may be changed without caring about the impact of the changes for other modules as long as the events which the modules fire or listen to are preserved.

In addition, there is no need for the assurance of the delivery of the event in this example. The chat module tries to send the event to the subscribers only once but it doesn’t care about broken pipes, connection errors, or other possible lacks. In case this is necessary, the subscriber could publish back an event that confirms the original event has been received and handled.

```js
bus.subscribe('chat:initializedChatSession', (session) => {
  // Do something
  bus.publish('main:updatedChatStatus');
});
```

## Conclusion

Pub/sub provides an event driven architecture that allows highly scalable, reactive, asynchronous, and loosely coupled applications, suiting both small and complex application stacks while allowing developers to create modular and reusable code.
