Title: Virtualized List

-----

Description: Name given to a performance optimization technique where only the visible items of a longer list/table that is currently visible in the browser is rendered.

-----

Authors: rasshofer

-----

Text:

To visualize how this works, let’s take a list with a 1000 rows where each row has a height of 35 pixels. Thus, the total height of that list equals the total item count multiplied by the height of the item, i.e. (math: 1000 × 35px = 35000px). Based on this height, the virtualized list creates an empty DOM element that matches the height and the width dimension of its parent visible window/element. In the UI, we’d like to display the scrollable list with a height of 150 pixels.

This empty placeholder DOM element allows to emulate the behavior of a non-virtualized list by taking the position of the scrollbar within the list: the scroll position basically determines which index we’re at in the list. Combined with the height per item as well as the overall maximum height of the list, the visible/relevant items of the list can be determined and rendered. All other items are skipped and not rendered. Rendered items receive the style `position: absolute` and `top` property calculated based on the item’s index and height.

```html
<div style="position: relative; width: 300px; height: 150px; overflow: auto;">
  <div style="width: 100%; height: 35000px;">
    <div style="position: absolute; left: 0px; top: 3395px; width: 100%; height: 35px;">Item 97</div>
    <div style="position: absolute; left: 0px; top: 3430px; width: 100%; height: 35px;">Item 98</div>
    <div style="position: absolute; left: 0px; top: 3465px; width: 100%; height: 35px;">Item 99</div>
    <div style="position: absolute; left: 0px; top: 3500px; width: 100%; height: 35px;">Item 100</div>
    <div style="position: absolute; left: 0px; top: 3535px; width: 100%; height: 35px;">Item 101</div>
    <div style="position: absolute; left: 0px; top: 3570px; width: 100%; height: 35px;">Item 102</div>
    <div style="position: absolute; left: 0px; top: 3605px; width: 100%; height: 35px;">Item 103</div>
    <div style="position: absolute; left: 0px; top: 3640px; width: 100%; height: 35px;">Item 104</div>
    <div style="position: absolute; left: 0px; top: 3675px; width: 100%; height: 35px;">Item 105</div>
  </div>
</div>
```

In the example above, the `scrollTop` property of the root/list element is `3477`. That means the first visible item would be (math: 3477 ÷ 35 = ~99.34) which means we’re starting somewhere between item #99 and item #100 in the list (i.e. ~⅔ of item #99 is visible).

Now, as the maximum height of the list itself is 150 pixels, (math: 150 ÷ 35 = ~4.29) tells us the amount of visible items. As you can see in the DOM example above, a small amount of non-visible items above and below the visible range (i.e. items #97, #98, #104, and #105) are rendered in addition so that it appears like other items above/below the visible items are existing when scrolling, resulting in a smooth scroll experience (compared to simply adding items into the view once they enter the visible window).

This safety-net approach is called »overscan«, a term borrowed from television.

Virtualized list also work as horizontal lists. In this case, the logic is simply switched for `width`/`height` and `top`/`left`. A combination of both horizontally and vertically scrollable lists would be possible as well, of course.

As you may guess, the big challenge of virtualized lists is items with varying/variable heights based on their content, as the basic concept of calculating/reserving the space with a placeholder DOM element does not work as-is anymore.
