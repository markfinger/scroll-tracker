define([
  'QUnit',
  'viewport'
], function(QUnit, viewport) {

  var test = function() {
    QUnit.module('viewport.bindings');

    QUnit.test('Sanity checks', function() {
      equal(viewport.bindings.length, 0, 'Viewport bindings length should be 0.');
      deepEqual(viewport.bindings, [], 'Viewport bindings should be an empty array.');
    });

    QUnit.test('set binding', function() {
      viewport.bindings.set(document.body, 'test', function() {});
      equal(viewport.bindings.length, 1, 'Viewport bindings should contain 1 entry');
      deepEqual(viewport.bindings[0].element, document.body, 'Viewport binding should point to the body');
      equal(viewport.bindings[0].bindings['test'].length, 1, 'Viewport binding should contain one `test` binding');

      viewport.bindings.set(document.body, 'test', function() {}, {fakeOptions: true});
      deepEqual(
        viewport.bindings[0].bindings['test'][1].options.fakeOptions,
        true,
        'Viewport binding should contain one `test` binding'
      );
    });

    QUnit.test('get binding', function() {
      var testFunction = function() {};
      viewport.bindings.set(document.body, 'test', testFunction);
      var binding = viewport.bindings.get(document.body);

      ok(binding !== undefined, 'Viewport binding found');
      deepEqual(binding.element, document.body, 'Viewport binding should point to the body');
      equal(binding.bindings['test'].length, 1, 'Viewport binding should contain one `test` binding');
      deepEqual(
        binding.bindings['test'][0].binding,
        testFunction,
        'Viewport binding\'s first binding should point to the `testFunction`'
      );
    });

    QUnit.test('remove binding', function() {
      viewport.bindings.set(document.body, 'test', function() {});
      viewport.bindings.remove(document.body);
      equal(viewport.bindings.length, 0, 'Viewport bindings for the body should have been removed');

      viewport.bindings.set(document.body, 'test', function() {});
      viewport.bindings.remove(document.body, 'test');
      equal(viewport.bindings.length, 0, 'Viewport bindings for the body and `test` position should have been removed');

      viewport.bindings.set(document.body, 'test', function() {});
      viewport.bindings.set(document.body, 'test2', function() {});
      viewport.bindings.remove(document.body, 'test');
      deepEqual(
        viewport.bindings[0].bindings['test'],
        undefined,
        'Viewport bindings for the body\'s `test` position should have been removed'
      );
      ok(
        viewport.bindings[0].bindings['test2'] !== undefined,
        'Viewport bindings for the body\'s `test` position should have been removed, leaving `test2` intact'
      );

      viewport.bindings.length = 0;

      var testFunc1 = function() { var one = 1; };
      var testFunc2 = function() { var two = 2; };
      viewport.bindings.set(document.body, 'test', testFunc1);
      viewport.bindings.set(document.body, 'test', testFunc2);
      viewport.bindings.remove(document.body, 'test', testFunc1);
      equal(
        viewport.bindings[0].bindings['test'].length,
        1,
        'Unbinding a specific function for a specific position should not have removed other bindings'
      );
      deepEqual(
        viewport.bindings[0].bindings['test'][0].binding,
        testFunc2,
        'Unbinding via a function will leave other functions intact'
      );
    });

    QUnit.test('clean binding', function() {
      viewport.bindings.set(document.body, 'test', function() {});
      viewport.bindings[0].bindings = [];
      viewport.bindings.clean();
      equal(viewport.bindings.length, 0, 'Bindings without any bindings should have been removed during the cleaning');

      viewport.bindings.set(document.body, 'test', function() {});
      viewport.bindings.set(document.body, 'test2', function() {});
      viewport.bindings[0].bindings['test'] = [];
      viewport.bindings.clean();
      deepEqual(
        viewport.bindings[0].bindings['test'],
        undefined,
        'Named bindings without any bindings should have been removed during the cleaning'
      );
      viewport.bindings[0].bindings['test2'] = [];
      viewport.bindings.clean();
      equal(
        viewport.bindings.length,
        0,
        'A lack of bindings should cause the body bindings to be removed during the cleaning'
      );
    });
  };

  return {
    test: test
  };

});