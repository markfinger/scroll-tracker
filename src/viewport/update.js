define([
  'lodash',
  './bindings',
  './utils'
], function(_, bindings, utils) {

  var _update = function(obj) {
    obj.position = utils.offsetOf(obj.element);
  };

  return function update(element) {
    // Updates viewport's internal representation of every bound element's
    // location on the page. Viewport caches the location of each element to
    // reduce DOM load, so this is best run after the location of an element
    // has changed.
    //
    // Accepts one optional argument, an Element, which will restrict the
    // update to that element only.

    if (element) {
      _update(bindings.get(element));
    } else {
      _.each(bindings, _update);
    }
  };

});