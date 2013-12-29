define([
  './utils'
], function(utils) {
  var positionOf = function(element, precomputed) {
    // Returns an object containing details about the position
    // of `element` relative to the viewport

    precomputed = precomputed || {};
    var scrollY = precomputed.scrollY || utils.scrollY();
    var viewportHeight = precomputed.viewportHeight || utils.height();
    var offset = precomputed.offset || utils.getOffset(element);

    var viewportTop = scrollY;
    var viewportBottom = scrollY + viewportHeight;
    var elementTop = offset.top;
    var elementBottom = offset.bottom;

    var topAboveViewportTop = elementTop < viewportTop;
    var topBelowViewportTop = elementTop >= viewportTop;

    var topAboveViewportBottom = elementTop < viewportBottom;
    var topBelowViewportBottom = elementTop >= viewportBottom;

    var bottomAboveViewportTop = elementBottom < viewportTop;
    var bottomBelowViewportTop = elementBottom >= viewportTop;

    var bottomAboveViewportBottom = elementBottom < viewportBottom;
    var bottomBelowViewportBottom = elementBottom >= viewportBottom;

    var distanceFromViewport = 0;
    if (bottomAboveViewportTop) {
      distanceFromViewport = Math.abs(elementBottom - viewportTop);
    } else if (topBelowViewportBottom) {
      distanceFromViewport = Math.abs(elementTop - viewportBottom);
    }

    var inside = !(topBelowViewportBottom || bottomAboveViewportTop);

    var intersectsMiddle = false;
    if (inside) {
      var viewportMiddle = viewportTop + ((viewportBottom - viewportTop) / 2);
      if (elementTop <= viewportMiddle && elementBottom >= viewportMiddle) {
        intersectsMiddle = true;
      }
    }

    return {
      inside: inside,
      outside: !inside,
      above: bottomAboveViewportTop,
      below: topBelowViewportBottom,
      contained: topBelowViewportTop && bottomAboveViewportBottom,
      intersectsTop: topAboveViewportTop && bottomBelowViewportTop,
      intersectsMiddle: intersectsMiddle,
      intersectsBottom: topAboveViewportBottom && bottomBelowViewportBottom,
      distanceFromViewport: distanceFromViewport,
      offsetTopFromViewport: elementTop - viewportTop,
      viewportTop: viewportTop,
      viewportMiddle: viewportMiddle,
      viewportBottom: viewportBottom,
      elementTop: elementTop,
      elementBottom: elementBottom,
      scrollY: scrollY
    };
  };

  return {
    positionOf: positionOf
  };
});