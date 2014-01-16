define([
  'jquery',
  'viewport/src/settings'
], function($, settings) {

  var scrollX = function() {
    // Returns the distance between the left edges of the viewport and the document
    return (window.pageXOffset !== undefined) ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
  };

  var scrollY = function() {
    // Returns the distance between the top edges of the viewport and the document
    return (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
  };

  var width = function() {
    // Returns the width of the viewport
    return window.innerWidth;
  };

  var height = function() {
    // Returns the height of the viewport, this value is adjusted to
    // respect the topPadding and bottomPadding properties in
    // viewport.settings

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
    // Returns a superset of jQuery(element).offset() which contains
    // the bottom and right offsets from the top and left edges of
    // the document respectively

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
    // Returns an object which contains the viewport's top, bottom, left and
    // right offsets from the document's top or left edge. The object also
    // contains the viewport's height and width
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

  var _document = function() {
    // Returns an object which contains the document's height and width
    var $document = $(document);
    return {
      height: $document.height(),
      width: $document.width()
    };
  };

  return {
    scrollX: scrollX,
    scrollY: scrollY,
    width: width,
    height: height,
    offsetOf: offsetOf,
    position: position,
    document: _document
  };
});