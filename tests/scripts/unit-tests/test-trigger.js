define([
  'QUnit',
  'viewport'
], function(QUnit, viewport) {

  var test = function() {
    QUnit.module('viewport.trigger');

    QUnit.test('Accepts correct arguments', function() {
      viewport.on(document.body, 'test', function() {});
      ok(viewport.trigger(document.body, 'test'), 'Accepts dummy event.');
    });

    QUnit.test('Returns false for unmatched elements', function() {
      equal(viewport.trigger(document.body, 'test'), false, 'Should return false.');
    });

    QUnit.test('Triggers bindings', 1, function() {
      viewport.on(document.body, 'enter', function() {
        ok(true, 'Triggered binding.');
      });
      viewport.trigger(document.body, 'enter')
    });

    QUnit.test('Triggers custom bindings', 1, function() {
      viewport.on(document.body, 'test', function() {
        ok(true, 'Triggered custom binding.');
      });
      viewport.trigger(document.body, 'test')
    });

  };

  return {
    test: test
  };

});