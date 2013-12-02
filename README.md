Viewport
============================================


Utilities for working within the browser's viewport.

```javascript

  // Example
  // Adds/removes classes if an element is in the viewport

  require(['viewport'], function(viewport) {

    var element = $('.my-element');
    var position = viewport.getElementPosition(element);

    if (position.in) {
      element.addClass('active');
    } else if (position.out) {
      element.removeClass('active');
    }

  });

```


Methods
--------------------------------------------


### viewport.setViewport(settings)

Allows you to define top and bottom offsets of the viewport such that calculations of an element's position can take
into consideration environment variables such as fixed headers and footers.

The `settings` argument should be an object and can contain the following properties:

- `topOffset` - a positive integer will lower the top of the viewport, versus a negative number which raises it.
- `bottomOffset` - a positive integer will lower the bottom of the viewport, versus a negative number which raises it.


### viewport.getScrollY()

Returns the distance between the top of the document and the top of the viewport.


### viewport.getHeight()

Returns the height of the viewport.


### viewport.getWidth()

Returns the width of the viewport.


### viewport.getOffset(element)

Returns a superset of [jQuery.offset](http://api.jquery.com/offset/) that includes the `bottom` and `right` offsets.
- `bottom` is measured from the top of the document.
- `right` is measured from the left of the document.


### viewport.getPositionOf(element)

Returns an object containing details about an element's position relative to the viewport.

The information includes:
- `in` - indicates if the element is at least partially within the viewport [Boolean]
- `out` - indicates if the element is completely outside of the viewport [Boolean]
- `above` - indicates if the element is above the viewport [Boolean]
- `below` - indicates if the element is below the viewport [Boolean]
- `contained` - indicates if the element is completely within the viewport [Boolean]
- `intersectsTop` - indicates if the element is partially within the viewport and intersects with the top of the viewport [Boolean]
- `intersectsBottom` - indicates if the element is partially within the viewport and intersects with the bottom of the viewport [Boolean]
- `scrollY` - the distance between the top of the document and the top of the viewport. Equivalent to `viewport.getScrollY()`. [Integer]
- `viewportHeight` - the height of viewport. Equivalent to `viewport.getHeight()`. [Integer]
- `offset` - contains the various offsets of `element` relative to the document. Equivalent to `viewport.getOffset(element)`. [Object]
- `offsetFromViewport` - contains various offsets of `element` relative to the viewport, including:
 - topFromTop - the top of the element offset from the top of the viewport
 - topFromBottom - the top of the element offset from the bottom of the viewport
 - bottomFromTop - the bottom of the element offset from the top of the viewport
 - bottomFromBottom - the bottom of the element offset from the bottom of the viewport


Dependencies
--------------------------------------------


- [RequireJS](https://github.com/jrburke/requirejs)
- [jQuery](https://github.com/jquery/jquery)

Viewport depends on your require.js path config having an entry for `jquery`. Something like the following will work...
```javascript
  require.config({
    paths: {
      jquery: '/path/to/jquery',
      // ...
    },
    // ...
  });
```