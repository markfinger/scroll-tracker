define([
  'QUnit',
  'viewport'
], function(QUnit, viewport) {

  var test = function() {
    QUnit.module('viewport.check');

    QUnit.test('Runs and accepts element argument', 1, function() {
      viewport.check();
      viewport.check(document.body);
      ok(true, 'Both passed');
    });

    QUnit.test('Fires 2 bindings', 2, function() {
      var testFunc = function() {
        ok(true, 'Fired binding.');
      };
      viewport.on(document.body, 'true', testFunc);
      viewport.on(document.body, 'true', testFunc);
      viewport.check();
    });

    QUnit.test('Only triggers for true conditions', 2, function() {
      var testFunc = function() {
        ok(true, 'Fired binding.');
      };
      viewport.on(document.body, 'true', testFunc);
      viewport.on(document.body, 'true', testFunc);
      viewport.on(document.body, 'false', testFunc);
      viewport.check();
    });

    QUnit.test('Triggers for multiple elements', 2, function() {
      var testFunc = function() {
        ok(true, 'Fired binding.');
      };
      viewport.on(document.body, 'true', testFunc);
      viewport.on(document.head, 'true', testFunc);
      viewport.check();
    });

    QUnit.test('Respects checkTimeout delay', 1, function() {
      var testFunc = function() {
        ok(true, 'Fired binding.');
      };
      viewport.on(document.body, 'true', testFunc, {checkTimeout: 10000000});
      viewport.check();
      viewport.check();
    });

    QUnit.test('Respects no checkTimeout', 2, function() {
      var testFunc = function() {
        ok(true, 'Fired binding.');
      };
      viewport.on(document.body, 'true', testFunc, {checkTimeout: 0});
      viewport.check();
      viewport.check();
    });

  };

  return {
    test: test
  };

});