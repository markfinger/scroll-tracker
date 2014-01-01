define([
  'QUnit',
  'viewport'
], function(QUnit, viewport) {

  var test = function() {
    QUnit.module('viewport.start');

    QUnit.test('start sets listeners', function() {
      viewport.start();
      ok(viewport.settings.hasBoundEvents, 'settings have been updated to reflect event bindings');
    });

  };

  return {
    test: test
  };

});