define([
  'jquery',
  'lodash',
  'viewport/src/check',
  'viewport/src/settings',
  'viewport/src/start',
  'viewport/src/update'
], function($, _, check, settings, start, update) {

  return function init() {
    update();
    check();

    start();

    settings.hasInitialised = true;
  };

});
