(function() {

  QUnit.module('scroll.once');

  QUnit.test('Accepts correct arguments', function() {
    ok(scroll.once(document.body, 'enter', function() { }), 'Accepts a binding.');
    ok(scroll.once(document.body, 'test', function() { }), 'Accepts another binding to the same element.');
    ok(scroll.once(document.body, 'enter', function() { }), 'Accepts another binding to the same position on the same element.');
  });

  QUnit.test('Fires bindings', function() {
    scroll.once(document.body, 'enter', function() {
      ok(true, 'Fired binding.');
    });
    scroll.bindings.trigger(document.body, 'enter');
  });

  QUnit.test('Binding only fires once', 1, function() {
    scroll.once(document.body, 'enter', function() {
      ok(true, 'Fired binding, this should only happen once.');
    });

    scroll.bindings.trigger(document.body, 'enter');
    scroll.bindings.trigger(document.body, 'enter');
  });

  QUnit.test('Removes binding after execution', function() {
    scroll.once(document.body, 'enter', function() { });

    scroll.bindings.trigger(document.body, 'enter');

    equal(scroll.bindings.length, 0, 'There should be no bindings on the body');
  });

})();
