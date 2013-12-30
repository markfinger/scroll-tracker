define([
  'QUnit',
  'viewport'
], function(QUnit, viewport) {

  var test = function() {
    QUnit.module('viewport.bindings');

    QUnit.test('Sanity checks', function() {
      deepEqual(viewport.bindings.length, 0, 'Viewport bindings length should be 0.');
      deepEqual(viewport.bindings, [], 'Viewport bindings should be an empty array.');
    });
  };

  return {
    test: test
  };

});