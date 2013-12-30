define([
  'QUnit',
  'viewport'
], function(QUnit, viewport) {

  var test = function() {
    QUnit.module('viewport.on');

    QUnit.test('Accepts correct arguments', function() {
      ok(viewport.on(document.body, {}), 'Accepts dummy data.');
      ok(viewport.on(document.body, { enter: function() { } }), 'Accepts a binding.');
    });

    QUnit.test('Fires bindings', 1, function() {
      viewport.on(document.body, {
        enter: function() {
          ok(true, 'Fired binding.');
        }
      });
      console.log(viewport.bindings)
      viewport.check()
    });

    QUnit.test('Adds bindings to `viewport.bindings', function() {
      viewport.on(document.body, { enter: function() {} });

      equal(viewport.bindings.length, 1, '`viewport.bindings.length` should be 1');
    });

    QUnit.test('Multiple bindings to the same element are merged into the same object', 3, function() {
      var testFunction = function() {
        ok(true, 'Fired binding.');
      };

      viewport.on(document.body, {
        enter: testFunction
      });
      viewport.on(document.body, {
        exit: testFunction
      });

      equal(viewport.bindings.length, 1, '`viewport.bindings.length` should be 1');

      viewport.trigger(document.body, 'enter');
      viewport.trigger(document.body, 'exit');
    });

    QUnit.test('Multiple bindings to the same event do not override one another', 3, function() {
      var testFunction = function() {
        ok(true, 'Fired binding.');
      };

      viewport.on(document.body, {
        enter: testFunction
      });
      viewport.on(document.body, {
        enter: testFunction
      });

      equal(viewport.bindings.length, 1, '`viewport.bindings.length` should be 1');

      viewport.trigger(document.body, 'enter');
    });

  };

  return {
    test: test
  };

});