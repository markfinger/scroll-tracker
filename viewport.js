// viewport - utilities for working within the browser's viewport
// https://github.com/markfinger/viewport

define([
  'jquery'
], function viewport($) {

  var settings = {
    // A positive number lowers the top of the viewport,
    // while a negative number lowers the top of the viewport
    topOffset: null,
    // A positive number raises the bottom of the
    // viewport, while a negative number lowers the
    // bottom of the viewport
    bottomOffset: null
  };

  var setViewport = function(viewportSettings) {
    // Altering the settings allows you to change the
    // scope of the viewport.

    _.extend(settings, viewportSettings);
  };

  var _wrapElement = function(element) {
    // Wrap the element in jQuery, if necessary

    if (!element.jquery) {
      element = $(element);
    }
    return element;
  };

  var getScrollY = function() {
    // Cross-browser determination of the the amount of pixels scrolled

    return (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
  };

  var getHeight = function() {
    // Returns the height of the viewport

    var height = window.innerHeight;

    if (settings.topOffset) {
      height -= settings.topOffset;
    }
    if (settings.bottomOffset) {
      height -= settings.bottomOffset;
    }

    return height;
  };

  var getOffset = function(element) {
    // Returns a superset of jQuery(element).offset

    element = _wrapElement(element);

    var offset = element.offset();

    if (settings.topOffset) {
      offset.top -= settings.topOffset;
    }

    offset.bottom = offset.top + element.outerHeight();
    offset.right = offset.left + element.outerWidth();

    return offset;
  };

  var getPositionOf = function(element, precomputed) {
    // Returns an object containing details about the position
    // of `element` relative to the viewport

    element = _wrapElement(element);

    precomputed = precomputed || {};
    var scrollY = precomputed.scrollY || getScrollY();
    var viewportHeight = precomputed.viewportHeight || getHeight();
    var offset = precomputed.offset || getOffset(element);

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

    return {
      inside: !(topBelowViewportBottom || bottomAboveViewportTop),
      outside: topBelowViewportBottom || bottomAboveViewportTop,
      above: bottomAboveViewportTop,
      below: topBelowViewportBottom,
      contained: topBelowViewportTop && bottomAboveViewportBottom,
      intersectsTop: topAboveViewportTop && bottomBelowViewportTop,
      intersectsBottom: topAboveViewportBottom && bottomBelowViewportBottom,
      distanceFromViewport: distanceFromViewport,
      offsetTopFromViewport: elementTop - viewportTop
    };
  };

  return {
    getPositionOf: getPositionOf,
    setViewport: setViewport,
    getScrollY: getScrollY,
    getHeight: getHeight,
    getOffset: getOffset
  };
});
