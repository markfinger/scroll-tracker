define([
  'lodash',
  'viewport/src/bindings',
  'viewport/src/conditions',
  'viewport/src/settings',
  'viewport/src/utils'
], function(_, bindings, conditions, settings, utils) {

  // viewport.on(element, 'enter', function() {});
  // viewport.setCheckThrottle(element, 10);

  return function check(element) {

    if (_.isElement(element)) {
      var binding = bindings.get(element);
      if (!binding) {
        return;
      }
      element = [binding];
    }

    var viewportPosition = utils.viewportPosition();

    _.each(element || bindings, function(obj) {
      // Filter the callbacks by their delay
      // if position is valid, trigger each

      var bindingNames = _.keys(obj.bindings);
      var data = {
        position: obj.position,
        viewport: viewportPosition,
        state: obj.state
      };
      _.each(bindingNames, function(name) {
        // TODO: checkDelay
        if (conditions.is(obj.element, name, data)) {
          bindings.trigger(obj.element, name);
        }
      });
    });
  };

});