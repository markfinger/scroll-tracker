define([
  'QUnit',
  'viewport'
], function(QUnit, viewport) {

  var test = function() {

    QUnit.module('viewport.settings');

    QUnit.test('Settings is an object with properties', function() {
      ok(_.isObject(viewport.settings), 'Settings is an object.');
      ok(_.keys(viewport.settings).length > 0, 'Settings has properties');
    });

  };

  return {
    test: test
  };

});