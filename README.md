Viewport
============================================

**Scroll tracker and viewport utilities.**

```javascript
  // Basic usage
  
  require.config({
    packages: [{
      name: 'viewport',
      location: 'path/to/package'
    }]
  });

  define(['viewport'], function(viewport) {

    // The binding will be called when the element enters the viewport
    viewport.on(someElement, 'enter', someFunction);

    // The binding will be called when the element exits the viewport
    viewport.on(someElement, 'exit', anotherFunction);

  });



  // Bindings can be bound to variety of positions and conditions, including:

  //  enter
  //  exit
  //  inside
  //  above
  //  below
  //  contained
  //  intersectingTop
  //  intersectingMiddle
  //  intersectingBottom



  // Bindings can be bound to the negation of conditions by 
  // prepending an exclamation mark.

  // Binds the function to a condition where the element is outside the viewport
  viewport.on(element, '!inside', someFunction);



  // Additional conditions can be specified, see src/conditions.js for examples

  viewport.defineCondition('someCondition', function(element, data) {
    // ...
  });



  // All conditions can be checked programmatically

  // Returns true if an element is inside the viewport
  viewport.is(element, 'inside');

  // Returns true if an element is completely within the viewport
  viewport.is(element, 'contained');



  // Calculations of positions can be offset, which is useful 
  // for working around fixed headers or footers
  viewport.settings.topPadding = $('fixed-nav').outerHeight();
  viewport.settings.bottomPadding = $('fixed-footer').outerHeight();



  // A variety of utility methods exist for working around the viewport

  // Returns an element's top, bottom, left, and right offsets 
  // from the document's top and left.
  viewport.offsetOf(element)

  // Returns the viewport's dimensions and offset from the document's top and left.
  viewport.position()

  // Returns the dimensions of the document
  viewport.document()

  // Returns the vertical scroll position of the viewport
  viewport.scrollY()

  // Returns the horizontal scroll position of the viewport
  viewport.scrollX()

  // Returns the width of the viewport
  viewport.width()

  // Returns the height of the viewport, taking in to consideration
  // the `topPadding` and `bottomPadding` settings
  viewport.height()
```
