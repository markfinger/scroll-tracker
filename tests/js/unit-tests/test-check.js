(function() {

  QUnit.module('scroll.check');

  QUnit.test('Runs and accepts element argument', 1, function() {
    scroll.check();
    scroll.check(document.body);
    ok(true, 'Both passed');
  });

  QUnit.test('Fires 2 bindings', 2, function() {
    var testFunc = function() {
      ok(true, 'Fired binding.');
    };
    scroll.on(document.body, 'true', testFunc);
    scroll.on(document.body, 'true', testFunc);
    scroll.check();
  });

  QUnit.test('Only triggers for true conditions', 2, function() {
    var testFunc = function() {
      ok(true, 'Fired binding.');
    };
    scroll.on(document.body, 'true', testFunc);
    scroll.on(document.body, 'true', testFunc);
    scroll.on(document.body, 'false', testFunc);
    scroll.check();
  });

  QUnit.test('Triggers for multiple elements', 2, function() {
    var testFunc = function() {
      ok(true, 'Fired binding.');
    };
    scroll.on(document.body, 'true', testFunc);
    scroll.on(document.head, 'true', testFunc);
    scroll.check();
  });

  QUnit.test('Respects checkTimeout delay', 1, function() {
    var testFunc = function() {
      ok(true, 'Fired binding.');
    };
    scroll.on(document.body, 'true', testFunc, {checkTimeout: 10000000});
    scroll.check();
    scroll.check();
  });

  QUnit.test('Respects no checkTimeout', 2, function() {
    var testFunc = function() {
      ok(true, 'Fired binding.');
    };
    scroll.on(document.body, 'true', testFunc, {checkTimeout: 0});
    scroll.check();
    scroll.check();
  });

})();
