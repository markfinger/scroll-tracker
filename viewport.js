define([
  'jquery'
], function viewport($) {

  // Altering the settings allows you to change the
  // scope of the viewport
  var _defaultSettings = {
    // A positive number lowers the top of the viewport,
    // while a negative number lowers the top of the viewport
    viewportTopOffset: null,
    // A positive number raises the bottom of the
    // viewport, while a negative number lowers the
    // bottom of the viewport
    viewportBottomOffset: null
  };

  var _wrapElement = function(element) {
    // Wrap the element in jQuery if necessary
    if (!element.jquery) {
      element = $(element);
    }
    return element;
  };

  var getScrollY = function() {
    // Cross-browser determination of the the amount of pixels scrolled
    return (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
  };

  var getHeight = function(settings) {
    var height = window.innerHeight;

    if (settings) {
      if (settings.viewportTopOffset) {
        height -= settings.viewportTopOffset;
      }
      if (settings.viewportBottomOffset) {
        height -= settings.viewportBottomOffset;
      }
    }

    return height;
  };

  var getElementOffset = function(element, settings) {
    element = _wrapElement(element);

    var offset = element.offset();

    if (settings && settings.viewportTopOffset) {
      offset.top -= settings.viewportTopOffset;
    }

    offset.bottom = offset.top + element.outerHeight();
    offset.right = offset.left + element.outerWidth();

    return offset;
  };

  var getElementPosition = function(element, settings) {
    element = _wrapElement(element);

    var viewportScrollY = getScrollY();
    var viewportHeight = getHeight(settings);
    var elementOffset = getElementOffset(element, settings);

    var viewportTop = viewportScrollY;
    var viewportBottom = viewportScrollY + viewportHeight;
    var elementTop = elementOffset.top;
    var elementBottom = elementOffset.bottom;

    var topAboveViewportTop = elementTop < viewportTop;
    var topBelowViewportTop = elementTop >= viewportTop;

    var topAboveViewportBottom = elementTop < viewportBottom;
    var topBelowViewportBottom = elementTop >= viewportBottom;

    var bottomAboveViewportTop = elementBottom < viewportTop;
    var bottomBelowViewportTop = elementBottom >= viewportTop;

    var bottomAboveViewportBottom = elementBottom < viewportBottom;
    var bottomBelowViewportBottom = elementBottom >= viewportBottom;

    return {
      in: !(topBelowViewportBottom || bottomAboveViewportTop),
      out: topBelowViewportBottom || bottomAboveViewportTop,
      above: bottomAboveViewportTop,
      below: topBelowViewportBottom,
      contained: topBelowViewportTop && bottomAboveViewportBottom,
      intersectsTop: topAboveViewportTop && bottomBelowViewportTop,
      intersectsBottom: topAboveViewportBottom && bottomBelowViewportBottom,
      viewportHeight: viewportHeight,
      viewportScrollY: viewportScrollY,
      elementOffset: elementOffset,
      elementTopOffsetFromViewportTop: elementTop - viewportTop,
      elementTopToViewportBottom: elementTop - viewportBottom,
      elementBottomToViewportTop: elementBottom - viewportTop,
      elementBottomToViewportBottom: elementBottom - viewportBottom
    };
  };

  return {
    getScrollY: getScrollY,
    getHeight: getHeight,
    getElementOffset: getElementOffset,
    getElementPosition: getElementPosition,
    _defaultSettings: _defaultSettings
  };
});