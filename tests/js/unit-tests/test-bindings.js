(function() {

  QUnit.module('scroll.bindings');

  QUnit.test('Sanity checks', function() {
    equal(scroll.bindings.length, 0, 'scroll bindings length should be 0.');
    deepEqual(scroll.bindings, [], 'scroll bindings should be an empty array.');
  });

  QUnit.module('scroll.bindings.set');

  QUnit.test('set binding', function() {
    scroll.bindings.set(document.body, 'test', function() {});
    equal(scroll.bindings.length, 1, 'scroll bindings should contain 1 entry');
    deepEqual(scroll.bindings[0].element, document.body, 'scroll binding should point to the body');
    equal(scroll.bindings[0].bindings['test'].length, 1, 'scroll binding should contain one `test` binding');

    scroll.bindings.set(document.body, 'test', function() {}, {checkTimeout: 50});
    deepEqual(
      scroll.bindings[0].checkTimeout === 50,
      true,
      'scroll binding should contain one `test` binding with a defined `checkTimeout`'
    );
  });

  QUnit.module('scroll.bindings.get');

  QUnit.test('get binding', function() {
    var testFunction = function() {};
    scroll.bindings.set(document.body, 'test', testFunction);
    var binding = scroll.bindings.get(document.body);

    ok(binding !== undefined, 'scroll binding found');
    deepEqual(binding.element, document.body, 'scroll binding should point to the body');
    equal(binding.bindings['test'].length, 1, 'scroll binding should contain one `test` binding');
    deepEqual(
      binding.bindings['test'][0].binding,
      testFunction,
      'scroll binding\'s first binding should point to the `testFunction`'
    );
  });

  QUnit.module('scroll.bindings.remove');

  QUnit.test('remove binding', function() {
    scroll.bindings.set(document.body, 'test', function() {});
    scroll.bindings.remove(document.body);
    equal(scroll.bindings.length, 0, 'scroll bindings for the body should have been removed');

    scroll.bindings.set(document.body, 'test', function() {});
    scroll.bindings.remove(document.body, 'test');
    equal(scroll.bindings.length, 0, 'scroll bindings for the body and `test` position should have been removed');

    scroll.bindings.set(document.body, 'test', function() {});
    scroll.bindings.set(document.body, 'test2', function() {});
    scroll.bindings.remove(document.body, 'test');
    deepEqual(
      scroll.bindings[0].bindings['test'],
      undefined,
      'scroll bindings for the body\'s `test` position should have been removed'
    );
    ok(
      scroll.bindings[0].bindings['test2'] !== undefined,
      'scroll bindings for the body\'s `test` position should have been removed, leaving `test2` intact'
    );

    scroll.bindings.length = 0;

    var testFunc1 = function() { var one = 1; };
    var testFunc2 = function() { var two = 2; };
    scroll.bindings.set(document.body, 'test', testFunc1);
    scroll.bindings.set(document.body, 'test', testFunc2);
    scroll.bindings.remove(document.body, 'test', testFunc1);
    equal(
      scroll.bindings[0].bindings['test'].length,
      1,
      'Unbinding a specific function for a specific position should not have removed other bindings'
    );
    deepEqual(
      scroll.bindings[0].bindings['test'][0].binding,
      testFunc2,
      'Unbinding via a function will leave other functions intact'
    );
  });

  QUnit.module('scroll.bindings.clean');

  QUnit.test('clean binding', function() {
    scroll.bindings.set(document.body, 'test', function() {});
    scroll.bindings[0].bindings = [];
    scroll.bindings.clean();
    equal(scroll.bindings.length, 0, 'Bindings without any bindings should have been removed during the cleaning');

    scroll.bindings.set(document.body, 'test', function() {});
    scroll.bindings.set(document.body, 'test2', function() {});
    scroll.bindings[0].bindings['test'] = [];
    scroll.bindings.clean();
    deepEqual(
      scroll.bindings[0].bindings['test'],
      undefined,
      'Named bindings without any bindings should have been removed during the cleaning'
    );
    scroll.bindings[0].bindings['test2'] = [];
    scroll.bindings.clean();
    equal(
      scroll.bindings.length,
      0,
      'A lack of bindings should cause the body bindings to be removed during the cleaning'
    );
  });

})();
