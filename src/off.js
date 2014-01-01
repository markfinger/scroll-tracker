define([
  'viewport/src/bindings'
], function(bindings) {

  return function off(element, name) {

    return bindings.remove(element, name);

  };

});