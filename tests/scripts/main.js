require.config({
  paths: {
    jquery: '../components/jquery/jquery',
    lodash: '../components/lodash/lodash',
    qunit: '../components/qunit/qunit/qunit'
  },
  shim: {
    qunit: {
      exports: 'QUnit'
    }
  },
  packages: [{
    name: 'viewport',
    location: '../../'
  }]
});

require([
  'jquery',
  'viewport'
], function($) {
  $(function() {
    if ($('#qunit').length) {
      require(['./unit-tests']);
    } else {
      require(['./visual-tests']);
    }
  });
});