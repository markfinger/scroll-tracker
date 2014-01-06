define([
  'QUnit',
  'lodash',
  'viewport'
], function(QUnit, _, viewport) {

  var test = function() {
    QUnit.module('viewport.bindings.trigger');

    QUnit.test('Accepts correct arguments', function() {
      viewport.on(document.body, 'test', function() {});
      ok(viewport.bindings.trigger(document.body, 'test'), 'Accepts dummy event.');
    });

    QUnit.test('Returns false for unmatched elements', function() {
      equal(viewport.bindings.trigger(document.body, 'test'), false, 'Should return false.');
    });

    QUnit.test('Triggers bindings', 1, function() {
      viewport.on(document.body, 'enter', function() {
        ok(true, 'Triggered binding.');
      });
      viewport.bindings.trigger(document.body, 'enter');
    });

    QUnit.test('Triggers custom bindings', 1, function() {
      viewport.on(document.body, 'test', function() {
        ok(true, 'Triggered custom binding.');
      });
      viewport.bindings.trigger(document.body, 'test');
    });

    QUnit.test('Triggers a specific binding when others share the same element or name', 1, function() {
      var func1 = function() { ok(true, 'Triggered custom binding.'); };
      var func2 = function() { ok(true, 'This shouldn\'t be hit.'); };
      viewport.on(document.body, 'test', func1);
      viewport.on(document.body, 'test', func2);
      viewport.on(document.head, 'test', func2);
      viewport.bindings.trigger(document.body, 'test', func1);
    });

    QUnit.test('Passes the element and the element\'s position to the binding', 2, function() {
      viewport.on(document.body, 'test', function(obj) {
        ok(_.isElement(obj.element), 'Received the element.');
        ok(_.isObject(obj.position), 'Received the element position.');
      });
      viewport.bindings.trigger(document.body, 'test');
    });

  };

  return {
    test: test
  };

});