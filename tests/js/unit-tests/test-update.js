(function() {

  QUnit.module('scroll.update');

  QUnit.test('Updates all elements', function() {
    scroll.bindings.set(document.body, 'test', function(){});
    scroll.bindings.set(document.head, 'test', function(){});

    scroll.bindings[0].position = undefined;
    scroll.bindings[1].position = undefined;
    scroll.update();
    ok(scroll.bindings[0].position !== undefined, 'Updated first element.');
    ok(scroll.bindings[1].position !== undefined, 'Updated second element.');

    ok(scroll.bindings[0].position.top !== undefined, 'Element position has `top` property.');
    ok(scroll.bindings[0].position.bottom !== undefined, 'Element position has `bottom` property.');
  });

  QUnit.test('Updates a specific element', function() {
    scroll.bindings.set(document.body, 'test', function(){});
    scroll.bindings.set(document.head, 'test', function(){});

    scroll.bindings[0].position = undefined;
    scroll.bindings[1].position = undefined;

    scroll.update(document.body);

    ok(scroll.bindings[0].position !== undefined, 'Updated first element.');
    ok(scroll.bindings[1].position === undefined, 'Did not update second element.');
  });

})();
