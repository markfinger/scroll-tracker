define([
  'QUnit',
  'viewport'
], function(QUnit, viewport) {

  var test = function() {
    QUnit.module('viewport.stop');

    QUnit.test('stop removes listeners', function() {
      viewport.start();
      viewport.stop();
      ok(!viewport.settings.hasBoundEvents, 'settings have been updated to reflect that events have been unbound');
    });

  };

  return {
    test: test
  };

});