Title: Imperative vs. declarative events

-----

Date: 1591437336

-----

Description:

Events are a way for handling communication in decoupled environments. Although the basics seem simple, a proper event structure/naming can have a big impact on the overall application architecture.

-----

Authors: rasshofer

-----

Text:

When using a (reference: frontend/using-the-publish-subscribe-pattern-and-a-shared-event-bus-to-decouple-frontends text: shared event bus) or any kind of event-based communication to decouple systems, events always should be declarative, not imperative. This means publishers don’t give orders to their subscribers but instead are publishing/reporting what happened.

Assuming we’d like to react to clicking the »Order« button in an application, the following example represents a characteristic implementation for this based on an event bus.

```js
orderButton.addEventListener(() => {
  bus.publish('createOrder');
});
```

Here, the name `createOrder` dictates a specific order/command. To be more precise: it’s being imperative, not declarative.

In another application context where we don’t want to create an order (as the event name suggests) but do something completely different (e.g. just adding it to a queue), this event name would completely lose its meaning and intent.

Instead, if the event name is switched to declarative wording, the event is just reporting what happened, it doesn’t know/care about the implementation details.

```js
orderButton.addEventListener(() => {
  bus.publish('orderButtonClick');
});
```

This way events can be reused in different application contexts and these contexts can react accordingly and individually. The user clicked the »Order« button, and nothing more than that. What happens next will be the sole responsibility of the subscribing event processors while the publishing event generator doesn’t need to consider this at all.

```js
bus.subscribe('orderButtonClick', showConfirmationNotification);

bus.subscribe('orderButtonClick', addItemToQueue);

bus.subscribe('orderButtonClick', doSomethingElse);
```
