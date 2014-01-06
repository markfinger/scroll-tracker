define([
  'jquery',
  'lodash',
  'viewport/src/settings'
], function($, _, settings) {

  var scrollX = function() {
    return (window.pageXOffset !== undefined) ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
  };

  var scrollY = function() {
    return (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
  };

  var width = function() {
    return window.innerWidth;
  };

  var height = function() {
    // Returns the height of the viewport

    var height = window.innerHeight;

    if (settings.topPadding !== 0) {
      height -= settings.topPadding;
    }

    if (settings.bottomPadding !== 0) {
      height -= settings.bottomPadding;
    }

    return height;
  };

  var offsetOf = function(element) {
    // Returns a superset of jQuery(element).offset

    if (!element.jquery) {
      element = $(element);
    }

    var offset = element.offset();

    if (settings.topPadding) {
      offset.top -= settings.topPadding;
    }

    offset.bottom = offset.top + element.outerHeight();
    offset.right = offset.left + element.outerWidth();

    return offset;
  };

  var position = function() {
    var _scrollX = scrollX();
    var _scrollY = scrollY();
    var _width = width();
    var _height = height();

    return {
      top: _scrollY,
      bottom: _scrollY + _height,
      left: _scrollX,
      right: _scrollX + _width,
      width: _width,
      height: _height
    };
  };

  return {
    scrollX: scrollX,
    scrollY: scrollY,
    width: width,
    height: height,
    offsetOf: offsetOf,
    position: position
  };
});