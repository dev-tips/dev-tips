Title: Detect Touch devices using JavaScript

-----

Date: 1405156020

-----

Contributors: rasshofer

-----

Text:

The following function allows the detection of touch devices (smartphones, tablets, …) using JavaScript. As an example, this allows you to offer certain actions on a website or web application only for appropriate devices like disabling hover effects for touch devices.

```javascript
function isTouchDevice() {
	return ('ontouchstart' in window);
}
```
