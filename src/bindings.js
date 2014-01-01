define([
  'lodash',
  'viewport/src/utils'
], function(_, utils) {

  // bindings = [
  //   {
  //     element: <element>,
  //     bindings: {
  //       enter: [
  //         {
  //           binding: <function>,
  //           options: {
  //             trackDelay: <number>,
  //             once: <boolean>
  //           }
  //         }
  //         ...
  //       ],
  //       ...
  //      },
  //     position: {
  //       top: <number>,
  //       bottom: <number>
  //     }
  //   },
  //   ...
  // ];

  var bindings = [];

  bindings.get = function(element) {
    return _.find(bindings, function(obj) {
      return obj.element === element;
    });
  };

  bindings.set = function(element, name, binding, options) {
    var obj = bindings.get(element);

    if (!obj) {
      obj = {
        element: element,
        bindings: {},
        position: utils.getOffset(element)
      };
      bindings.push(obj);
    }

    if (!obj.bindings[name]) {
      obj.bindings[name] = [];
    }

    obj.bindings[name].push({
      binding: binding,
      options: options || {}
    });

    return obj;
  };

  bindings.clean = function() {
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

  bindings.remove = function(element, name, binding) {
    var obj = bindings.get(element);
    var match = false;

    if (obj) {
      if (binding) {
        if (_.has(obj.bindings, name)) {
          var removed = _.remove(obj.bindings[name], function(obj) {
            return obj.binding === binding;
          });
          if (removed.length) {
            match = true;
          }
        }
      } else if (name) {
        if (_.has(obj.bindings, name)) {
          delete obj.bindings[name];
          match = true;
        }
      } else {
        _.remove(bindings, obj);
        match = true;
      }

      bindings.clean();
    }

    return match;
  };

  return bindings;
});