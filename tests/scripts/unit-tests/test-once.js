define([
  'QUnit',
  'viewport'
], function(QUnit, viewport) {

  var test = function() {
    QUnit.module('viewport.once');

    QUnit.test('Accepts correct arguments', function() {
      ok(viewport.once(document.body, 'enter', function() { }), 'Accepts a binding.');
      ok(viewport.once(document.body, 'test', function() { }), 'Accepts another binding to the same element.');
      ok(viewport.once(document.body, 'enter', function() { }), 'Accepts another binding to the same position on the same element.');
    });

    QUnit.test('Fires bindings', function() {
      viewport.once(document.body, 'enter', function() {
        ok(true, 'Fired binding.');
      });
      viewport.bindings.trigger(document.body, 'enter');
    });

    QUnit.test('Binding only fires once', 1, function() {
      viewport.once(document.body, 'enter', function() {
        ok(true, 'Fired binding, this should only happen once.');
      });

      viewport.bindings.trigger(document.body, 'enter');
      viewport.bindings.trigger(document.body, 'enter');
    });

    QUnit.test('Removes binding after execution', function() {
      viewport.once(document.body, 'enter', function() { });

      viewport.bindings.trigger(document.body, 'enter');

      equal(viewport.bindings.length, 0, 'There should be no bindings on the body');
    });
  };

  return {
    test: test
  };

});