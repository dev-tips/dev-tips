Title: Difference between »throttling« and »debouncing« a JavaScript function

-----

Date: 1520175584

-----

Contributors: rasshofer

-----

Text:

One of the things that make JavaScript special is events. For example, this enables a specific function to be performed when the browser window is resized or scrolled. However, this kind of events also has its pitfalls: Depending on the complexity of the handler function to be applied and the speed of occurrences of the events, the impact on performance may be fatal. Slow animations or even complete freezing of the browser are the result.

A solution to this problem is »throttling« and »debouncing« functions. The purpose of these concepts is to bundle multiple events and postpone/reduce the amount of function calls overall by providing decorated intermediary functions. The only difference between the two is the way how the events are bundled and when the original function is actually executed.

## Throttle: grouping sequential calls to regular intervals

The `throttle` function offers the possibility to »slow down« multiple occurring events and to execute them regularly. If a throttled function is defined with an interval/threshold of e.g. 500 milliseconds, then its original function is executed every 500 milliseconds in a flood of events.

Example: If the browser window `resize` event is heard and the user resizes evenly for 1 minute, the function will be executed every 500 milliseconds (instead of all the time during the minute).

```js
function throttle (fn, threshold) {
  let last;
  let timeout;

  return (...args) => {
    const now = Date.now();

    if (last && now < last + threshold) {
      window.clearTimeout(timeout);
      timeout = window.setTimeout(() => {
        last = now;
        fn(...args);
      }, threshold);
    } else {
      last = now;
      fn(...args);
    }
  };
}
```

```js
const resizeHandler = () => {
  // Do something
};

window.addEventListener('resize', throttle(resizeHandler, 250));
```

Rule of thumb: the original function is called at most once within the specified period.

## Debounce: delaying sequential calls to a single call at the end

The `debounce` function waits for events and doesn’t execute the original function as long as the debounced function continues to be invoked, i.e. until after a certain time no new event has been triggered. If a debounced function is defined with an interval/threshold of 500 milliseconds, its original function will not be executed until the event is no longer fired for 500 milliseconds.

Example: If the browser window `resize` event is heard and the user resizes evenly for 1 minute, the function will not be executed during the whole minute but after 1 minute + 500 milliseconds = 60500 milliseconds (instead of all the time during the minute).

```js
function debounce (fn, wait) {
  let timeout;

  return (...args) => {
    const later = () => {
      timeout = null;
      fn(...args);
    };

    window.clearTimeout(timeout);
    timeout = window.setTimeout(later, wait);
  };
}
```

```js
const resizeHandler = () => {
  // Do something
};

window.addEventListener('resize', debounce(resizeHandler, 250));
```

Rule of thumb: the original function is called after the caller stops calling the decorated function after a specified period.

## Perceived performance vs. real performance of throttled functions

It is beyond question that in many cases throttling a function can increase performance, especially on weaker devices, as fewer function calls occur. However, the intended use of throttling is very important: if soft animations are supposed to be realized using the throttled function, a wrong threshold may give the user the impression of poor performance due to low frame rates. Luckily, it’s easy to calculate the resulting frames per second based on the specified threshold.

```js
const threshold = 50;
const fps = (1000 / threshold);
```

The example above results a frame rate of only 20 frames per second. However, for liquid animations, the threshold should never deceed 30 frames per second. Thus, a lower threshold would make more sense, and may simply be calculated the other way round based on the desired frames per second.

```js
const fps = 60;
const threshold = (1000 / fps);
```
