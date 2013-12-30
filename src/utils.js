define([
  'jquery',
  'viewport/src/settings'
], function($, settings) {

  var _wrapElement = function(element) {
    // Wrap the element in jQuery, if necessary

    if (!element.jquery) {
      element = $(element);
    }

    return element;
  };

  var scrollY = function() {
    // Cross-browser determination of the the amount of pixels scrolled

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

  var getOffset = function(element) {
    // Returns a superset of jQuery(element).offset

    element = _wrapElement(element);

    var offset = element.offset();

    if (settings.topPadding) {
      offset.top -= settings.topPadding;
    }

    offset.bottom = offset.top + element.outerHeight();
    offset.right = offset.left + element.outerWidth();

    return offset;
  };

  return {
    scrollY: scrollY,
    height: height,
    width: width,
    getOffset: getOffset
  };
});