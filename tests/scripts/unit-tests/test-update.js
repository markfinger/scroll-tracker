define([
  'QUnit',
  'viewport'
], function(QUnit, viewport) {

  var test = function() {
    QUnit.module('viewport.update');

    QUnit.test('Updates all elements', function() {
      viewport.bindings.set(document.body, 'test', function(){});
      viewport.bindings.set(document.head, 'test', function(){});

      viewport.bindings[0].position = undefined;
      viewport.bindings[1].position = undefined;
      viewport.update();
      ok(viewport.bindings[0].position !== undefined, 'Updated first element.');
      ok(viewport.bindings[1].position !== undefined, 'Updated second element.');

      ok(viewport.bindings[0].position.top !== undefined, 'Element position has `top` property.');
      ok(viewport.bindings[0].position.bottom !== undefined, 'Element position has `bottom` property.');
    });

    QUnit.test('Updates a specific element', function() {
      viewport.bindings.set(document.body, 'test', function(){});
      viewport.bindings.set(document.head, 'test', function(){});

      viewport.bindings[0].position = undefined;
      viewport.bindings[1].position = undefined;

      viewport.update(document.body);

      ok(viewport.bindings[0].position !== undefined, 'Updated first element.');
      ok(viewport.bindings[1].position === undefined, 'Did not update second element.');
    });
  };

  return {
    test: test
  };

});