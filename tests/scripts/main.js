require.config({
  paths: {
    jquery: '../components/jquery/jquery',
    lodash: '../components/lodash/dist/lodash',
    QUnit: '../components/qunit/qunit/qunit'
  },
  shim: {
    QUnit: {
      exports: 'QUnit',
      init: function() {
        QUnit.config.autoload = false;
        QUnit.config.autostart = false;
      }
    }
  },
  packages: [{
    name: 'viewport',
    location: '../..'
  }]
});

require([
  'jquery',
  'viewport'
], function($) {
  $(function() {
    if ($('#qunit').length) {
      require(['./unit-tests/main']);
    } else {
      require(['./visual-tests/main']);
    }
  });
});