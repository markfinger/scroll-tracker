(function() {

  QUnit.module('scroll.start');

  QUnit.test('start sets listeners', function() {
    scroll.start();
    ok(scroll.settings.hasBoundEvents, 'settings have been updated to reflect event bindings');
  });

})();
