define([
  'QUnit',
  'viewport',
  'unit-tests/tear-down',
  'unit-tests/test-bindings',
  'unit-tests/test-height',
  'unit-tests/test-off',
  'unit-tests/test-on',
  'unit-tests/test-scroll-y',
  'unit-tests/test-trigger',
  'unit-tests/test-width'
], function(QUnit, viewport, tearDown, bindings, height, off, on, scrollY, trigger, width) {

  // Test the individual modules
  bindings.test();
  height.test();
  off.test();
  on.test();
  scrollY.test();
  trigger.test();
  width.test();

  // Sanity checks on the tear down after each test
  tearDown.test();

  // Start QUnit
  QUnit.load();
  QUnit.start();
});