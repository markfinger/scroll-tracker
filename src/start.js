define([
  'jquery',
  'lodash',
  'viewport/src/check',
  'viewport/src/settings',
  'viewport/src/update'
], function($, _, check, settings, update) {

  var onScroll = function onScroll() {
    check();
  };

  var onResize = function onResize() {
    update();
    check();
  };

  onScroll = _.throttle(onScroll, settings.onScrollThrottle);
  onResize = _.debounce(onResize, settings.onResizeDebounce);

  return function start() {
    // Add event handlers that viewport uses to track scroll
    // and resize events that are fired by the browser.
    if (!settings.hasBoundEvents) {
      $(window).on('scroll' + settings.eventNamespace, onScroll);
      $(window).on('resize' + settings.eventNamespace, onResize);
      settings.hasBoundEvents = true;
    }
  };

});
