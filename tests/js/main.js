require.config({
  paths: {
    jquery: './libs/jquery',
    lodash: './libs/lodash',
    viewport: './../../viewport',
    scroll: './libs/scroll'
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