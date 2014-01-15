define([
  'visual-tests/shim',
  'visual-tests/scroll-tracker'
], function(shim, scrollTracker) {
  $('.loading').removeClass('loading');
  shim();
  scrollTracker.init();
});