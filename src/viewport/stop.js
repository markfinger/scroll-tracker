define([
  'jquery',
  './settings'
], function($, settings) {

  return function stop() {
    // Remove event handlers that viewport uses to track scroll
    // and resize events that are fired by the browser.
    $(window).off('scroll' + settings.eventNamespace);
    $(window).off('resize' + settings.eventNamespace);

    settings.hasBoundEvents = false;
  };

});
