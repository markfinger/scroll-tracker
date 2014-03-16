Scroll Tracker
============================================

**Tracks element positions relative to the viewport and fires conditional callbacks**

### Install

`bower install --save scroll-tracker`

### Dependencies

- jQuery
- Lodash/Underscore

### Basic Usage

```javascript

// The binding will be called when the element enters the viewport
scroll.on(element, 'enter', function(){});

// The binding will be called when the element exits the viewport
scroll.on(element, 'exit', function(){});

// The binding will be called when the element intersects the top of the viewport
scroll.on(element, 'intersectingTop', function(){});

// The binding will be called when the element is entirely within the viewport
scroll.on(element, 'contained', function(){});

```

### Documentation by example

```javascript

// Bindings are specified by the position or condition that will trigger a callback
scroll.on(element, 'enter', someFunction);

// A number of predefined conditions are available:
//
//   'enter'
//   'exit'
//   'inside'
//   'above'
//   'below'
//   'contained'
//   'intersectingTop'
//   'intersectingMiddle'
//   'intersectingBottom'
//

// Bindings can be bound to the negation of conditions by
// prepending an exclamation mark. For example, to bind a
// function to the condition where an element is not
// wholly within the viewport
scroll.on(element, '!contained', someFunction);

// All conditions can be checked programmatically...

// Returns true if an element is inside the viewport
scroll.is(element, 'inside');

// Returns true if an element is both entirely within the viewport and
// intersecting the middle of the viewport
scroll.is(element, 'contained') && scroll.is(element, 'intersectingMiddle')

// Additional conditions can be specified, by providing an identifying string
// and a callback with which to test the condition.
// Callbacks should return `true` if the condition has been met, and false if
// not.
// Callbacks are provided with two arguments, the element that is being tested
// and an object containing precomputed information about the element's
// position, the viewport's position, and an object with which to persist
// state changes on an object.
scroll.defineCondition('someCondition', function(element, data) {
  return scroll.is(element, 'inside', data) && someFunction(element, data);
});



// Calculations of positions can be offset, which is useful
// for working around fixed headers or footers
scroll.settings.topPadding = $('.fixed-header').outerHeight();
scroll.settings.bottomPadding = $('.fixed-footer').outerHeight();



// A variety of utility methods exist for working with the viewport

// Returns an element's top, bottom, left, and right offsets
// from the document's top and left.
scroll.offsetOf(element)

// Returns the viewport's position and dimensions.
scroll.position()

// Returns the dimensions of the document
scroll.document()

// Returns the vertical scroll position of the viewport
scroll.scrollY()

// Returns the horizontal scroll position of the viewport
scroll.scrollX()

// Returns the width of the viewport
scroll.width()

// Returns the height of the viewport, with respect to
// the `topPadding` and `bottomPadding` settings
scroll.height()

```
