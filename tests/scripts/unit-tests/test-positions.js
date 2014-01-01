define([
  'QUnit',
  'viewport'
], function(QUnit, viewport) {

  var test = function() {
    QUnit.module('viewport.positions');

    QUnit.test('default positions are bound', function() {
      var keys = _.keys(viewport.positions);
      ok(keys.length > 0, 'more than one position has been bound');
      ok(_.contains(keys, 'above'), 'above has been bound');
      ok(_.contains(keys, 'below'), 'below has been bound');
      ok(_.contains(keys, 'inside'), 'inside has been bound');
      ok(_.contains(keys, 'outside'), 'outside has been bound');
      ok(_.contains(keys, 'intersectsTop'), 'intersectsTop has been bound');
      ok(_.contains(keys, 'intersectsMiddle'), 'intersectsMiddle has been bound');
      ok(_.contains(keys, 'intersectsBottom'), 'intersectsBottom has been bound');
    });

    QUnit.module('viewport.is');

    QUnit.test('Can check a position', function() {
      ok(viewport.is(document.body, 'inside'), 'is the body in the viewport');
      ok(viewport.is(document.body, 'intersectsMiddle'), 'does the body intersect the middle of the viewport');
      ok(viewport.is(document.body, 'intersectsBottom'), 'does the body intersect the bottom of the viewport');
      ok(!viewport.is(document.body, 'outside'), 'check if the body is not in the viewport and expect false');
    });

    QUnit.module('viewport.define');

    QUnit.test('Can define a position', 9, function() {

      viewport.definePosition('true', function() {
        return true;
      });

      viewport.definePosition('false', function() {
        return false;
      });

      viewport.definePosition('testPositionArgs', function(element, position) {
        deepEqual(element, document.body, 'defined position gets the element');
        ok(_.isObject(position), 'defined position gets position object');
        ok(_.isNumber(position.top), 'defined position gets element top offset');
        ok(_.isNumber(position.bottom), 'defined position gets element bottom offset');
        ok(_.isNumber(position.viewportTop), 'defined position gets viewport top');
        ok(_.isNumber(position.viewportBottom), 'defined position gets viewport bottom');
        ok(_.isNumber(position.viewportHeight), 'defined position gets viewport height');
      });

      equal(viewport.is(document.body, 'true'), true, 'Defined position should return true');
      equal(viewport.is(document.body, 'false'), false, 'Defined position should return false');

      viewport.is(document.body, 'testPositionArgs');
    });
  };

  return {
    test: test
  };

});