(function() {

  QUnit.module('scroll.on');

  QUnit.test('Accepts correct arguments', function() {
    ok(scroll.on(document.body, 'enter', function() { }), 'Accepts a binding.');
    ok(scroll.on(document.body, 'test', function() { }), 'Accepts another binding to the same element.');
    ok(scroll.on(document.body, 'enter', function() { }), 'Accepts another binding to the same position on the same element.');
  });

  QUnit.test('Fires bindings', 1, function() {
    scroll.on(document.body, 'enter', function() {
      ok(true, 'Fired binding.');
    });
    scroll.bindings.trigger(document.body, 'enter');
  });

  QUnit.test('Adds bindings to `scroll.bindings', function() {
    scroll.on(document.body, 'enter', function() {});

    equal(scroll.bindings.length, 1, '`scroll.bindings.length` should be 1');
  });

  QUnit.test('Multiple bindings to the same element are merged into the same object', 3, function() {
    var testFunction = function() {
      ok(true, 'Fired binding.');
    };

    scroll.on(document.body, 'enter', testFunction);
    scroll.on(document.body, 'exit', testFunction);

    equal(scroll.bindings.length, 1, '`scroll.bindings.length` should be 1');

    scroll.bindings.trigger(document.body, 'enter');
    scroll.bindings.trigger(document.body, 'exit');
  });

  QUnit.test('Multiple bindings to the same event do not override one another', 4, function() {
    var testFunction = function() {
      ok(true, 'Fired binding.');
    };

    scroll.on(document.body, 'enter', testFunction);
    scroll.on(document.body, 'enter', testFunction);

    equal(scroll.bindings.length, 1, '`scroll.bindings.length` should be 1');
    equal(
      scroll.bindings.get(document.body).bindings.enter.length,
      2,
      'the body should have 2 bindings to the enter event'
    );

    scroll.bindings.trigger(document.body, 'enter');
  });

  QUnit.test('Binding an element causes events to be bound', function() {
    scroll.settings.initialiseOnFirstBinding = true;

    equal(scroll.settings.hasBoundEvents, false, 'events have not been bound');

    scroll.on(document.body, 'enter', function(){});

    equal(scroll.settings.hasBoundEvents, true, 'events have been bound');
  });

})();
