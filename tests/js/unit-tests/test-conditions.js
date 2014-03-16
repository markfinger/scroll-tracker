(function() {

  QUnit.module('scroll.conditions');

  QUnit.test('default conditions are bound', function() {
    var keys = _.keys(scroll.conditions);
    ok(keys.length > 0, 'more than one condition has been bound');
    ok(_.contains(keys, 'above'), 'above has been bound');
    ok(_.contains(keys, 'below'), 'below has been bound');
    ok(_.contains(keys, 'inside'), 'inside has been bound');
    ok(_.contains(keys, 'intersectingTop'), 'intersectingTop has been bound');
    ok(_.contains(keys, 'intersectingMiddle'), 'intersectingMiddle has been bound');
    ok(_.contains(keys, 'intersectingBottom'), 'intersectingBottom has been bound');
    ok(_.contains(keys, 'contained'), 'contained has been bound');
    ok(_.contains(keys, 'enter'), 'enter has been bound');
    ok(_.contains(keys, 'exit'), 'exit has been bound');
  });

  QUnit.test('test enter condition only fires once', function() {
    scroll.on(document.body, 'enter', function(){});
    equal(scroll.is(document.body, 'enter'), true, 'Should have an enter state the first time');
    equal(scroll.is(document.body, 'enter'), false, 'Should not have an enter state the first time');
  });


  QUnit.module('scroll.is');

  QUnit.test('Can check a condition', function() {
    ok(scroll.is(document.body, 'inside'), 'is the body in the scroll');
    ok(scroll.is(document.body, 'intersectingMiddle'), 'does the body intersect the middle of the scroll');
    ok(scroll.is(document.body, 'intersectingBottom'), 'does the body intersect the bottom of the scroll');
    ok(!scroll.is(document.body, '!inside'), 'check if the body is not in the scroll and expect false');
  });

  QUnit.test('Respects the `!` (not) operator', function() {
    var inside = scroll.is(document.body, 'inside');
    var notInside = scroll.is(document.body, '!inside');
    notEqual(inside, notInside, 'inside and !inside should not be equal');
    ok(notInside === !inside, '!inside should be the negation of inside');
  });


  QUnit.module('scroll.defineCondition');

  QUnit.test('Can define a condition', 12, function() {

    scroll.defineCondition('testConditionArgs', function(element, data) {
      deepEqual(element, document.body, 'defined condition gets the element');

      ok(_.isObject(data), 'defined condition gets data object');

      ok(_.isObject(data.position), 'defined condition gets data.position object');
      ok(_.isNumber(data.position.top), 'defined condition gets element top offset');
      ok(_.isNumber(data.position.bottom), 'defined condition gets element bottom offset');

      ok(_.isObject(data.viewportPosition), 'defined condition gets data.scroll object');
      ok(_.isNumber(data.viewportPosition.top), 'defined condition gets scroll top');
      ok(_.isNumber(data.viewportPosition.bottom), 'defined condition gets scroll bottom');
      ok(_.isNumber(data.viewportPosition.height), 'defined condition gets scroll height');

      ok(_.isObject(data.state), 'defined condition gets data.state object');
    });

    equal(scroll.is(document.body, 'true'), true, 'Defined condition should return true');
    equal(scroll.is(document.body, 'false'), false, 'Defined condition should return false');

    scroll.is(document.body, 'testConditionArgs');
  });

})();
