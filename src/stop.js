define([
  'jquery',
  'viewport/src/settings'
], function($, settings) {

  return function stop() {
    $(window).off('scroll' + settings.eventNamespace);
    $(window).off('resize' + settings.eventNamespace);

    settings.hasBoundEvents = false;
  };

});
