# jquery.stepper.js
> Lightweight input stepper. [Check it out on Codepen (with touch events for mobile)](https://codepen.io/anon/pen/qjJbMr?editors=0011)

## Features
- Works on input type="text"
- Set initial values in the markup or Javascript
- Optionally configure min/max values with attributes

## Install
Download and include the javascript file.
```html
<script src="jquery.stepper.js"></script>
<link href="style.css" media="all" rel="stylesheet" />
```

## Basic usage
Check out `index.html` for all examples.

```html
<div class="stepper" id="stepper_1">
  <div class="stepper-progress"></div>
  <input type="text" class="stepper-number">
</div> 
```

Call the input stepper plugin on the desired selector

```javascript
$(function () {
	// Document ready
	$('#stepper_1').stepper();
});
```

## Advanced usage

```html
<div class="stepper">
  <div class="stepper-progress"></div>
  <input type="text" class="stepper-number" min="10" max="90" onChange="console.log('changed value =' + this.value);">
</div>
```
Another example :
```html
<div class="stepper">
  <div class="stepper-progress"></div>
  <input type="text" class="stepper-number" unit="px" min="10" max="90" step="5" value="50" onChange="console.log('changed value =' + this.value);">
</div>
```

Override properties like the input stepper plugin on the desired selector

```javascript
$('#stepper_3').stepper({
	selectorProgressBar: '.stepper-progress',
	selectorInputNumber: '.stepper-number',
	classNameChanging: 'is-changing',
	decimals: 2,
	unit: 'px',
	value: 50,
	min: -200,
	max: 200,
	step: 5
});

```

## Default settings
The input stepper can be called with a number of options. The defaults of each option are listed below

```javascript
$('#stepper_3').stepper({
	selectorProgressBar: '.stepper-progress',
	selectorInputNumber: '.stepper-number',
	classNameChanging: 'is-changing',
	decimals: 0,
	unit: '%',
	value: '',
	min: 0,
	max: 100,
	step: 1
});
```

## License
This plugin is under MIT License.
