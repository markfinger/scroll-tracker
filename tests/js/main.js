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
  $(tests.init);
});