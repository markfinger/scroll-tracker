define([
  './check',
  './settings',
  './start',
  './update'
], function(check, settings, start, update) {

  return function init() {
    // Initialises all the position tracking and checking magic

    update();
    check();
    start();

    settings.hasInitialised = true;
  };

});
