define([
  'viewport/src/bindings'
], function(bindings) {

  return function off(element, condition) {
    // Removes bindings from an element.
    //
    // Accepts two arguments:
    //   element: the Element which viewport will no longer track
    //   condition: an optional string which identifies the specific condition
    //     to remove bindings for
    return bindings.remove(element, condition);

  };

});