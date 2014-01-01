define([
  'jquery',
  'lodash',
  'viewport/src/check',
  'viewport/src/settings',
  'viewport/src/update'
], function($, _, check, settings, update) {

  var onScroll = _.throttle(check, 10);
  var onResize = _.debounce(function() {
    update();
    check();
  }, 100);

  return function start() {
    $(window).on('scroll' + settings.eventNamespace, onScroll);
    $(window).on('resize' + settings.eventNamespace, onResize);
    settings.hasBoundEvents = true;
  };

});
