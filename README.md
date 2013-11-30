viewport
========

Utilities for working within the browser's viewport.

```javascript

  // Example
  // Adds/removes classes if an element is in the viewport

  require([
    'viewport'
  ], function(viewport) {

    var position = viewport.getElementPosition($('.my-element'));

    if (position.in) {
      element.addClass('active');
    } else if (position.out) {
      element.removeClass('active');
    }

  });

```

## Dependencies

[requirejs](https://github.com/jrburke/requirejs)
[jquery](https://github.com/jquery/jquery)

Viewport depends on your require config having an entry for `jquery`. Something like the following will work...
```javascript
  require.config({
    paths: {
      jquery: '/path/to/jquery',
      // ...
    },
    // ...
  });
```