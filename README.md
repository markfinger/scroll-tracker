_These docs are quite out of date and should not be relied upon_

Viewport
============================================


Utilities for working within the browser's viewport.

```javascript

  // An example that triggers media assets based on the 
  // position of their elements within the viewport

  var video = document.getElementsByTagName('video')[0];
  
  var position = viewport.getPositionOf(video);
  
  if (position.inside) {
    video.play();
  } else if (position.distanceFromViewport < viewport.getHeight()) {
    fadeInAmbience();
  } else {
    video.pause();
  }

```


Methods
--------------------------------------------


### viewport.getPositionOf(element)

Returns an object containing properties that detail an element's position relative to the viewport. The properties include:

- `inside` - indicates if the element is at least partially within the viewport.
- `outside` - indicates if the element is completely outside of the viewport.
- `above` - indicates if the element is above the viewport.
- `below` - indicates if the element is below the viewport.
- `contained` - indicates if the element is completely within the viewport.
- `intersectsTop` - indicates if the element is partially within the viewport and has a top edge that is above the viewport.
- `intersectsBottom` - indicates if the element is partially within the viewport and has a bottom edge that is below the viewport.
- `distanceFromViewport` - A positive integer that reflects the distance botween the closest two points of the element and the viewport. If the element is within the viewport, this will equal 0.
- `viewportOffset` - an object containing offsets relative to the viewport:
 - `top` - the top of the element offset from the top of the viewport.
 - `bottom` - the bottom of the element offset from the top of the viewport.


### viewport.setViewport(settings)

Allows you to define top and bottom offsets of the viewport such that calculations of an element's position can take
into consideration environment variables such as fixed headers and footers.

The `settings` argument should be an object and can contain the following properties:

- `topOffset` - a positive integer will lower the top of the viewport, versus a negative number which raises it.
- `bottomOffset` - a positive integer will raise the bottom of the viewport, versus a negative number which lowers it.


### viewport.getScrollY()

Returns the distance between the top of the document and the top of the viewport.


### viewport.getHeight()

Returns the height of the viewport.


### viewport.getOffset(element)

Returns a superset of [jQuery.offset](http://api.jquery.com/offset/) that includes the `bottom` and `right` offsets.
- `bottom` is measured from the top of the document.
- `right` is measured from the left of the document.


Dependencies
--------------------------------------------


- [jQuery](https://github.com/jquery/jquery) (Built against 1.10+, earlier versions probably work)
