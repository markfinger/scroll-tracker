(function() {

  QUnit.module('scroll.stop');

  QUnit.test('stop removes listeners', function() {
    scroll.start();
    scroll.stop();
    ok(!scroll.settings.hasBoundEvents, 'settings have been updated to reflect that events have been unbound');
  });

})();
