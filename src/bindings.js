define([
  'lodash',
  'viewport/src/settings',
  'viewport/src/utils'
], function(_, settings, utils) {

  // bindings = [
  //   {
  //     element: <element>,
  //     bindings: {
  //       enter: [
  //         {
  //           binding: <function>,
  //           once: <boolean>
  //           lastCheckedAt: -Infinity
  //         },
  //         ...
  //       ],
  //       ...
  //      },
  //     position: {
  //       top: <number>,
  //       bottom: <number>
  //     },
  //     state: {}
  //   },
  //   ...
  // ];

  var bindings = [];

  bindings.get = function get(element) {
    return _.find(bindings, function(obj) {
      return obj.element === element;
    });
  };

  bindings.set = function set(element, name, binding, options) {
    var obj = bindings.get(element);

    options = options || {};

    if (!obj) {
      obj = {
        element: element,
        bindings: {},
        position: utils.offsetOf(element),
        state: {},
        checkTimeout: settings.checkTimeout,
        lastCheckedAt: -Infinity
      };
      bindings.push(obj);
    }

    if (options.checkTimeout !== undefined) {
      obj.checkTimeout = options.checkTimeout;
    }

    if (!obj.bindings[name]) {
      obj.bindings[name] = [];
    }

    obj.bindings[name].push({
      binding: binding,
      once: options.once || false
    });

    return obj;
  };

  bindings.clean = function clean() {
    // Cleans out the bindings to remove empty bindings and objects

    _.each(bindings, function(binding) {
      // Remove empty binding groups, eg: 'enter' & 'exit'
      _.each(binding.bindings, function(value, key) {
        if (!value.length) {
          delete binding.bindings[key];
        }
      });
      // Remove any objects without any bindings
      if (_.keys(binding.bindings).length === 0) {
        _.remove(bindings, binding);
      }
    });
  };

  bindings.remove = function remove(element, name, binding) {
    var obj = bindings.get(element);
    var removed = false;

    if (obj) {
      if (binding) {
        if (_.has(obj.bindings, name)) {
          var bindingsRemoved = _.remove(obj.bindings[name], function(obj) {
            return obj.binding === binding;
          });
          if (bindingsRemoved.length) {
            removed = true;
          }
        }
      } else if (name) {
        if (_.has(obj.bindings, name)) {
          delete obj.bindings[name];
          removed = true;
        }
      } else {
        _.remove(bindings, obj);
        removed = true;
      }
      bindings.clean();
    }

    return removed;
  };

  bindings.trigger = function trigger(element, name, binding) {
    var obj = bindings.get(element);

    if (obj && _.has(obj.bindings, name)) {

      var matchedBindings = obj.bindings[name];

      if (binding) {
        matchedBindings = _.filter(matchedBindings, function(obj) {
          return obj.binding === binding;
        });
      }

      _.each(matchedBindings, function(binding) {
        var func = binding.binding;
        if (binding.once) {
          bindings.remove(element, name, func);
        }
        func(_.clone(obj.position));
      });

      if (matchedBindings.length) {
        return true;
      }

    }

    return false;
  };

  return bindings;
});