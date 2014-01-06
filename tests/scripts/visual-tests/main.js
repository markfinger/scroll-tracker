define([
  'visual-tests/shim',
  'visual-tests/scroll-tracker'
], function(shim, scrollTracker) {
  shim();
  scrollTracker.init();
});