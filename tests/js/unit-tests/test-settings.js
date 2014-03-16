(function() {

  QUnit.module('scroll.settings');

  QUnit.test('Settings is an object with properties', function() {
    ok(_.isObject(scroll.settings), 'Settings is an object.');
    ok(_.keys(scroll.settings).length > 0, 'Settings has properties');
  });

})();
