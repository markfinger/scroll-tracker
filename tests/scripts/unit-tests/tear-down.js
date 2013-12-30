define([
  'QUnit',
  'viewport',
  'lodash'
], function(QUnit, viewport, _) {

  var defaultSettings = _.clone(viewport.settings);

  QUnit.testDone(function() {
    console.log('----------')
    viewport.bindings.length = 0;
    viewport.settings = _.assign(viewport.settings, defaultSettings);
  });

  var test = function() {
    QUnit.module('tearDown method');

    QUnit.test('Initial test and populate', function() {
      equal(viewport.bindings.length, 0, 'viewport.bindings length should be 0.');
      // Insert some bindings
      viewport.on(document.body, { enter: function(){} });
      equal(viewport.bindings.length, 1, 'viewport.bindings length should be 1.');
    });

    QUnit.test('Test that the teardown occured', function() {
      equal(viewport.bindings.length, 0, 'viewport.bindings length should be 0.');
    });
  };

  return {
    test: test
  };
});