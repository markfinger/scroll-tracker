(function() {

  QUnit.module('scroll.off');

  QUnit.test('Returns false for unknown elements and bindings', function() {
    equal(
      scroll.off(document.body),
      false,
      'Should return false as it can\'t find a matching element.'
    );

    equal(
      scroll.off(document.body, 'test'),
      false,
      'Should return false as it can\'t find a matching binding.'
    );
  });

  QUnit.test('Returns true for unbound elements', function() {
    scroll.on(document.body, 'inside', function() {});

    // sanity check
    equal(
      scroll.bindings.length,
      1,
      '`scroll.bindings.length` should equal 1'
    );

    equal(
      scroll.off(document.body),
      true,
      'Should return true as the element is unbound.'
    );

    equal(
      scroll.bindings.length,
      0,
      '`scroll.bindings.length` should equal 0'
    );
  });

  QUnit.test('Returns true for specifically named bindings', function() {

    scroll.on(document.body, 'enter', function() { });
    scroll.on(document.body, 'exit', function() { });

    equal(
      scroll.off(document.body, 'enter'),
      true,
      'Should return true as the binding name is matched.'
    );

    equal(scroll.bindings.length, 1, '`scroll.bindings.length` should equal 1');

  });

  QUnit.test('Removes the binding object if the removed binding was the last binding on an element', function() {

    scroll.on(document.body, 'enter', function() { });

    equal(
      scroll.off(document.body, 'enter'),
      true,
      'Should return true as the binding name is matched.'
    );

    equal(
      scroll.bindings.length,
      0,
      '`scroll.bindings.length` should equal 0'
    );
  });

})();
