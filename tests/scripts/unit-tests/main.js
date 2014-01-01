define([
  'QUnit',
  'unit-tests/tear-down',
  'unit-tests/test-bindings',
  'unit-tests/test-height',
  'unit-tests/test-off',
  'unit-tests/test-on',
  'unit-tests/test-once',
  'unit-tests/test-positions',
  'unit-tests/test-scroll-y',
  'unit-tests/test-settings',
  'unit-tests/test-start',
  'unit-tests/test-stop',
  'unit-tests/test-trigger',
  'unit-tests/test-update'
], function(QUnit, tearDown, bindings, height, off, on, once, positions, scrollY, settings, start, stop, trigger, update) {

  // Test the individual modules
  bindings.test();
  height.test();
  off.test();
  on.test();
  once.test();
  positions.test();
  scrollY.test();
  settings.test();
  start.test();
  stop.test();
  trigger.test();
  update.test();

  // TODO
  // check
  // positions
  // update

  // Sanity checks on the tear down after each test
  tearDown.test();

  // Start QUnit
  QUnit.load();
  QUnit.start();
});