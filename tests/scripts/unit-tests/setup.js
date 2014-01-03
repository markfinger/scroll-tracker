define([
  'QUnit',
  'viewport',
  'lodash'
], function(QUnit, viewport, _) {

  var defaultSettings = _.clone(viewport.settings);
  // Prevent premature checking of positions
  viewport.settings.initialiseOnBinding = defaultSettings.initialiseOnBinding = false;

  var defaultConditions = _.clone(viewport.conditions);

  QUnit.testStart(function testStart() {
    // Helper conditions for the unit tests
    if (!viewport.conditions.test) {
      viewport.defineCondition('test', function() { return true; });
    }
    if (!viewport.conditions.true) {
      viewport.defineCondition('true', function() { return true; });
    }
    if (!viewport.conditions.false) {
      viewport.defineCondition('false', function() { return false; });
    }
  });

  QUnit.testDone(function testDone() {
    // Reset bindings
    viewport.bindings.length = 0;
    // Reset settings
    viewport.settings = _.assign(viewport.settings, defaultSettings);
    // Prevent listeners from carrying across
    viewport.stop();
    // Reset the conditions
    _.each(viewport.conditions, function(value, key) {
      if (!_.contains(['test', 'true', 'false'], key) && !defaultConditions[key]) {
        delete viewport.conditions[key];
      } else if (defaultConditions[key]) {
        viewport.conditions[key] = defaultConditions[key];
      }
    });
  });

  var test = function() {
    QUnit.module('testDone method');

    QUnit.test('Initial test and populate', function() {
      equal(viewport.bindings.length, 0, 'viewport.bindings length should be 0.');
      // Insert some bindings
      viewport.on(document.body, 'enter', function(){});
      equal(viewport.bindings.length, 1, 'viewport.bindings length should be 1.');
    });

    QUnit.test('Test that the testDone occured', function() {
      equal(viewport.bindings.length, 0, 'viewport.bindings length should be 0.');
    });
  };

  return {
    test: test
  };
});