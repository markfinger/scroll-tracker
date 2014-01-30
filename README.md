Viewport
============================================

**Scroll tracker and viewport utilities.**

### Install

`bower install --save viewport`

```javascript
// Add to require config

require.config({
  paths: {
    viewport: '/path/to/bower_components/viewport/dist/viewport'
  }
});
```

### Basic Usage

```javascript
require(['viewport'], function(viewport) {

  // The binding will be called when the element enters the viewport
  viewport.on(element, 'enter', function(){});

  // The binding will be called when the element exits the viewport
  viewport.on(element, 'exit', function(){});
    
  // The binding will be called when the element intersects the top of the viewport
  viewport.on(element, 'intersectingTop', function(){});
    
  // The binding will be called when the element is entirely within the viewport
  viewport.on(element, 'contained', function(){});

});
```

### Documentation by example

```javascript

  // Bindings are specified by the position or condition that will trigger a callback
  viewport.on(element, 'enter', someFunction);

  // Bindings can be bound to variety of positions and conditions, including:
  // - enter
  // - exit
  // - inside
  // - above
  // - below
  // - contained
  // - intersectingTop
  // - intersectingMiddle
  // - intersectingBottom

  // Bindings can be bound to the negation of conditions by 
  // prepending an exclamation mark. For example, to bind a
  // function to the condition where an element is outside
  // the viewport
  viewport.on(element, '!inside', someFunction);



  // Additional conditions can be specified, 
  // see src/conditions.js for examples

  viewport.defineCondition('someCondition', function(element, data) {
    return checkSomethingOn(element) ? true : false;
  });



  // All conditions can be checked programmatically

  // Returns true if an element is inside the viewport
  viewport.is(element, 'inside');

  // Returns true if an element is not entirely within the viewport
  viewport.is(element, '!contained');



  // Calculations of positions can be offset, which is useful 
  // for working around fixed headers or footers

  viewport.settings.topPadding = $('.fixed-nav').outerHeight();
  viewport.settings.bottomPadding = $('.fixed-footer').outerHeight();



  // A variety of utility methods exist for working around the viewport

  // Returns an element's top, bottom, left, and right offsets 
  // from the document's top and left.
  viewport.offsetOf(element)

  // Returns the viewport's position and dimensions.
  viewport.position()

  // Returns the dimensions of the document
  viewport.document()

  // Returns the vertical scroll position of the viewport
  viewport.scrollY()

  // Returns the horizontal scroll position of the viewport
  viewport.scrollX()

  // Returns the width of the viewport
  viewport.width()

  // Returns the height of the viewport, with respect to 
  // the `topPadding` and `bottomPadding` settings
  viewport.height()
```
