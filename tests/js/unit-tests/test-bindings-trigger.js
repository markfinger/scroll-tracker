(function() {

  QUnit.module('scroll.bindings.trigger');

  QUnit.test('Accepts correct arguments', function() {
    scroll.on(document.body, 'test', function() {});
    ok(scroll.bindings.trigger(document.body, 'test'), 'Accepts dummy event.');
  });

  QUnit.test('Returns false for unmatched elements', function() {
    equal(scroll.bindings.trigger(document.body, 'test'), false, 'Should return false.');
  });

  QUnit.test('Triggers bindings', 1, function() {
    scroll.on(document.body, 'enter', function() {
      ok(true, 'Triggered binding.');
    });
    scroll.bindings.trigger(document.body, 'enter');
  });

  QUnit.test('Triggers custom bindings', 1, function() {
    scroll.on(document.body, 'test', function() {
      ok(true, 'Triggered custom binding.');
    });
    scroll.bindings.trigger(document.body, 'test');
  });

  QUnit.test('Triggers a specific binding when others share the same element or name', 1, function() {
    var func1 = function() { ok(true, 'Triggered custom binding.'); };
    var func2 = function() { ok(true, 'This shouldn\'t be hit.'); };
    scroll.on(document.body, 'test', func1);
    scroll.on(document.body, 'test', func2);
    scroll.on(document.head, 'test', func2);
    scroll.bindings.trigger(document.body, 'test', func1);
  });

  QUnit.test('Passes the element and the element\'s position to the binding', 2, function() {
    scroll.on(document.body, 'test', function(obj) {
      ok(_.isElement(obj.element), 'Received the element.');
      ok(_.isObject(obj.position), 'Received the element position.');
    });
    scroll.bindings.trigger(document.body, 'test');
  });

})();
