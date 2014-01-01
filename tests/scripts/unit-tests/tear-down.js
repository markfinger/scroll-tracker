define([
  'QUnit',
  'viewport',
  'lodash'
], function(QUnit, viewport, _) {

  var defaultSettings = _.clone(viewport.settings);
  var defaultPositions = _.clone(viewport.positions);

  QUnit.testDone(function tearDown() {
    // Reset bindings
    viewport.bindings.length = 0;
    // Reset settings
    viewport.settings = _.assign(viewport.settings, defaultSettings);
    // Prevent listeners from carrying across
    viewport.stop();
    // Reset positions
    _.each(viewport.positions, function(value, key) {
      if (!defaultPositions[key]) {
        delete viewport.positions[key];
      } else {
        viewport.positions[key] = defaultPositions[key];
      }
    });
  });

  var test = function() {
    QUnit.module('tearDown method');

    QUnit.test('Initial test and populate', function() {
      equal(viewport.bindings.length, 0, 'viewport.bindings length should be 0.');
      // Insert some bindings
      viewport.on(document.body, 'enter', function(){});
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