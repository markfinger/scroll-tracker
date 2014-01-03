define([
  'QUnit',
  'viewport'
], function(QUnit, viewport) {

  var test = function() {
    QUnit.module('viewport.off');

    QUnit.test('Returns false for unknown elements and bindings', function() {
      equal(
        viewport.off(document.body),
        false,
        'Should return false as it can\'t find a matching element.'
      );

      equal(
        viewport.off(document.body, 'test'),
        false,
        'Should return false as it can\'t find a matching binding.'
      );
    });

    QUnit.test('Returns true for unbound elements', function() {
      viewport.on(document.body, 'inside', function() {});

      // sanity check
      equal(
        viewport.bindings.length,
        1,
        '`viewport.bindings.length` should equal 1'
      );

      equal(
        viewport.off(document.body),
        true,
        'Should return true as the element is unbound.'
      );

      equal(
        viewport.bindings.length,
        0,
        '`viewport.bindings.length` should equal 0'
      );
    });

    QUnit.test('Returns true for specifically named bindings', function() {

      viewport.on(document.body, 'enter', function() { });
      viewport.on(document.body, 'exit', function() { });

      equal(
        viewport.off(document.body, 'enter'),
        true,
        'Should return true as the binding name is matched.'
      );

      equal(viewport.bindings.length, 1, '`viewport.bindings.length` should equal 1');

    });

    QUnit.test('Removes the binding object if the removed binding was the last binding on an element', function() {

      viewport.on(document.body, 'enter', function() { });

      equal(
        viewport.off(document.body, 'enter'),
        true,
        'Should return true as the binding name is matched.'
      );

      equal(
        viewport.bindings.length,
        0,
        '`viewport.bindings.length` should equal 0'
      );
    });

  };

  return {
    test: test
  };

});