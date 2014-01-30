define([
  './bindings',
  './init',
  './settings'
], function(bindings, init, settings) {

  /*

   viewport.on(element, condition, binding[, options])

   Binds specific functions to events that relate to an
   element's position in the viewport.

   Accepts four arguments:
   element: the Element which viewport will track
   condition: a string representing the condition that viewport
   will check for
   binding: a function that will be called when the condition
   is true
   options: on optional Object that contains specific options
   for the binding
   */

  return function on(element, condition, binding, options) {

    if (_.contains([element, condition, binding], undefined)) {
      throw new Error('Missing argument(s) supplied.');
    }

    var obj = bindings.set(element, condition, binding, options);

    // Defer initialisation until the first element has been bound
    if (settings.initialiseOnBinding && !settings.hasInitialised) {
      init();
    }

    return obj;
  };

});