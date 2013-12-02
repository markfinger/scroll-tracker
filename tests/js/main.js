require.config({
  paths: {
    jquery: './libs/jquery',
    lodash: './libs/lodash',
    viewport: './../../viewport'
  }
});

require([
  'jquery',
  './tests'
], function($, tests) {
  $(function() {
    tests.init();
    tests.checkElementsInViewport();
  });
});