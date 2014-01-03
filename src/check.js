define([
  'lodash',
  'viewport/src/bindings',
  'viewport/src/conditions',
  'viewport/src/settings',
  'viewport/src/utils'
], function(_, bindings, conditions, settings, utils) {

  return function check(element) {

    var bindingsToCheck;

    if (_.isElement(element)) {
      var binding = bindings.get(element);
      if (!binding) {
        return;
      }
      bindingsToCheck = [binding];
    } else {
      bindingsToCheck = bindings;
    }

    var currentTime = _.now();
    var viewportPosition = utils.viewportPosition();

    _(bindingsToCheck)
      .filter(function(obj) {
        return (obj.lastCheckedAt + obj.checkTimeout) <= currentTime;
      })
      .each(function(obj) {
        obj.lastCheckedAt = currentTime;

        var bindingNames = _.keys(obj.bindings);

        var element = obj.element;

        var data = {
          position: obj.position,
          viewport: viewportPosition,
          state: obj.state
        };

        _.each(bindingNames, function(name) {
          if (conditions.is(element, name, data)) {
            bindings.trigger(element, name);
          }
        });
    });
  };

});