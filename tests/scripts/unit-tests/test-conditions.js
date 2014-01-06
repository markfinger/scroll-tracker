define([
  'QUnit',
  'viewport'
], function(QUnit, viewport) {

  var test = function() {
    QUnit.module('viewport.conditions');

    QUnit.test('default conditions are bound', function() {
      var keys = _.keys(viewport.conditions);
      ok(keys.length > 0, 'more than one condition has been bound');
      ok(_.contains(keys, 'above'), 'above has been bound');
      ok(_.contains(keys, 'below'), 'below has been bound');
      ok(_.contains(keys, 'inside'), 'inside has been bound');
      ok(_.contains(keys, 'outside'), 'outside has been bound');
      ok(_.contains(keys, 'intersectingTop'), 'intersectingTop has been bound');
      ok(_.contains(keys, 'intersectingMiddle'), 'intersectingMiddle has been bound');
      ok(_.contains(keys, 'intersectingBottom'), 'intersectingBottom has been bound');
      ok(_.contains(keys, 'notContained'), 'notContained has been bound');
      ok(_.contains(keys, 'contained'), 'contained has been bound');
      ok(_.contains(keys, 'enter'), 'enter has been bound');
      ok(_.contains(keys, 'exit'), 'exit has been bound');
    });

    QUnit.test('test enter condition only fires once', function() {
      viewport.on(document.body, 'enter', function(){});
      equal(viewport.is(document.body, 'enter'), true, 'Should have an enter state the first time');
      equal(viewport.is(document.body, 'enter'), false, 'Should not have an enter state the first time');
    });


    QUnit.module('viewport.is');

    QUnit.test('Can check a condition', function() {
      ok(viewport.is(document.body, 'inside'), 'is the body in the viewport');
      ok(viewport.is(document.body, 'intersectingMiddle'), 'does the body intersect the middle of the viewport');
      ok(viewport.is(document.body, 'intersectingBottom'), 'does the body intersect the bottom of the viewport');
      ok(!viewport.is(document.body, 'outside'), 'check if the body is not in the viewport and expect false');
    });

    QUnit.test('Respects the `!` (not) operator', function() {
      var inside = viewport.is(document.body, 'inside');
      var notInside = viewport.is(document.body, '!inside');
      notEqual(inside, notInside, 'inside and !inside should not be equal');
      ok(notInside === !inside, '!inside should be the negation of inside');
    });


    QUnit.module('viewport.define');

    QUnit.test('Can define a condition', 12, function() {

      viewport.defineCondition('testConditionArgs', function(element, data) {
        deepEqual(element, document.body, 'defined condition gets the element');

        ok(_.isObject(data), 'defined condition gets data object');

        ok(_.isObject(data.position), 'defined condition gets data.position object');
        ok(_.isNumber(data.position.top), 'defined condition gets element top offset');
        ok(_.isNumber(data.position.bottom), 'defined condition gets element bottom offset');

        ok(_.isObject(data.viewport), 'defined condition gets data.viewport object');
        ok(_.isNumber(data.viewport.top), 'defined condition gets viewport top');
        ok(_.isNumber(data.viewport.bottom), 'defined condition gets viewport bottom');
        ok(_.isNumber(data.viewport.height), 'defined condition gets viewport height');

        ok(_.isObject(data.state), 'defined condition gets data.state object');
      });

      equal(viewport.is(document.body, 'true'), true, 'Defined condition should return true');
      equal(viewport.is(document.body, 'false'), false, 'Defined condition should return false');

      viewport.is(document.body, 'testConditionArgs');
    });
  };

  return {
    test: test
  };

});