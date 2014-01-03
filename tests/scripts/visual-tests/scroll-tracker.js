define([
  'jquery',
  'lodash',
  'viewport'
], function($, _, viewport) {

  var container;
  var viewportTopElement;
  var viewportBottomElement;

  var initViewportOffsets = function() {
    viewport.settings.topPadding = viewportTopElement.outerHeight();
    viewport.settings.bottomPadding = viewportBottomElement.outerHeight();
  };

  // viewport.on(element, '!enter', function(){});
  // viewport.on(element, '!intersectingMiddle', function(){});

  var setBindings = function() {
    $(window).on('resize', _.debounce(initViewportOffsets, 10));
  };

  var init = function() {
    container = $('.test-container');
    viewportTopElement = $('.viewport-top');
    viewportBottomElement = $('.viewport-bottom');

    initViewportOffsets();

    setBindings();
  };

  return {
    init: init
  };
});