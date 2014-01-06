define([
  'QUnit',
  'viewport'
], function(QUnit, viewport) {

  var test = function() {

    QUnit.module('viewport.offsetOf');

    QUnit.test('Provides the correct value', function() {
      var qunit = $('#qunit');
      var offset = viewport.offsetOf(qunit);
      equal(offset.top, qunit.offset().top, 'contains a top property with the correct value.');
      equal(offset.right, qunit.offset().left + qunit.outerWidth(), 'contains a right property with the correct value.');
      equal(offset.bottom, qunit.offset().top + qunit.outerHeight(), 'contains a bottom property with the correct value.');
      equal(offset.left, qunit.offset().left, 'contains a left property with the correct value.');
    });

  };

  return {
    test: test
  };

});