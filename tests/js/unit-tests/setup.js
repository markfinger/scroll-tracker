(function() {

  var defaultSettings = _.clone(scroll.settings);
  // Prevent premature checking of positions
  scroll.settings.initialiseOnFirstBinding = defaultSettings.initialiseOnFirstBinding = false;

  var defaultConditions = _.clone(scroll.conditions);

  QUnit.testStart(function testStart() {
    // Helper conditions for the unit tests
    if (!scroll.conditions.test) {
      scroll.defineCondition('test', function() { return true; });
    }
    if (!scroll.conditions.true) {
      scroll.defineCondition('true', function() { return true; });
    }
    if (!scroll.conditions.false) {
      scroll.defineCondition('false', function() { return false; });
    }
  });

  QUnit.testDone(function testDone() {
    // Reset bindings
    scroll.bindings.length = 0;
    // Reset settings
    scroll.settings = _.extend(scroll.settings, defaultSettings);
    // Prevent listeners from carrying across
    scroll.stop();
    // Reset the conditions
    _.forEach(scroll.conditions, function(value, key) {
      if (!_.contains(['test', 'true', 'false'], key) && !defaultConditions[key]) {
        delete scroll.conditions[key];
      } else if (defaultConditions[key]) {
        scroll.conditions[key] = defaultConditions[key];
      }
    });
  });

  QUnit.module('QUnit testDone handler');

  QUnit.test('Initial test and populate', function() {
    equal(scroll.bindings.length, 0, 'scroll.bindings length should be 0.');
    // Insert some bindings
    scroll.on(document.body, 'enter', function(){});
    equal(scroll.bindings.length, 1, 'scroll.bindings length should be 1.');
  });

  QUnit.test('Confirm that testDone completed', function() {
    equal(scroll.bindings.length, 0, 'scroll.bindings length should be 0.');
  });

})();
