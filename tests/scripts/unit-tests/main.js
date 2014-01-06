define([
  'QUnit',
  'unit-tests/setup',
  'unit-tests/test-bindings',
  'unit-tests/test-bindings-trigger',
  'unit-tests/test-check',
  'unit-tests/test-height',
  'unit-tests/test-off',
  'unit-tests/test-offsetOf',
  'unit-tests/test-on',
  'unit-tests/test-once',
  'unit-tests/test-conditions',
  'unit-tests/test-scroll-y',
  'unit-tests/test-settings',
  'unit-tests/test-start',
  'unit-tests/test-stop',
  'unit-tests/test-update'
], function(QUnit, setup, bindings, bindingsTrigger, check, height, off, offsetOf, on, once, conditions, scrollY, settings, start, stop, update) {

  // TODO
  // check, maybe rename to tracker..?

  // Test the individual modules
  bindings.test();
  bindingsTrigger.test();
  check.test();
  height.test();
  off.test();
  offsetOf.test();
  on.test();
  once.test();
  conditions.test();
  scrollY.test();
  settings.test();
  start.test();
  stop.test();
  update.test();

  // Sanity checks on the test structure
  setup.test();

  // Start QUnit
  QUnit.load();
  QUnit.start();
});