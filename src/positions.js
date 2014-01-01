define([
  'viewport/src/utils'
], function(utils) {

  var positions = {};

  var is = function is(element, name, position) {
    if (positions[name] === undefined) {
      throw new Error('Undefined position: ' + name);
    }

    if (position === undefined) {
      position = utils.positionOf(element);
    }

    return positions[name](element, position);
  };

  var definePosition = function definePosition(name, test) {
    positions[name] = test;
  };

  definePosition('above', function(element, position) {
    return position.bottom < position.viewportTop;
  });

  definePosition('below', function(element, position) {
    return position.top > position.viewportBottom;
  });

  definePosition('outside', function(element, position) {
    return (
      is(element, 'above', position) ||
      is(element, 'below', position)
    );
  });

  definePosition('inside', function(element, position) {
    return !(is(element, 'outside', position));
  });

  definePosition('intersectsTop', function(element, position) {
    return (
      position.top <= position.viewportTop &&
      position.bottom >= position.viewportTop
    );
  });

  definePosition('intersectsMiddle', function(element, position) {
    var viewportMiddle = position.viewportHeight / 2;
    return (
      position.top <= viewportMiddle &&
      position.bottom >= viewportMiddle
    );
  });

  definePosition('intersectsBottom', function(element, position) {
    return (
      position.top <= position.viewportBottom &&
      position.bottom >= position.viewportBottom
    );
  });

  definePosition('contained', function(element, position) {
    return (
      is(element, 'inside', position) &&
      !(
        is(element, 'intersectsTop', position) ||
        is(element, 'intersectsBottom', position)
      )
    );
  });

  return {
    positions: positions,
    is: is,
    definePosition: definePosition
  };

});