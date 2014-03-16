(function() {

  QUnit.module('scroll.offsetOf');

  QUnit.test('Provides the correct values', function() {
    var qunit = $('#qunit');
    var offset = scroll.offsetOf(qunit);
    equal(offset.top, qunit.offset().top, 'contains a top property with the correct value.');
    equal(offset.right, qunit.offset().left + qunit.outerWidth(), 'contains a right property with the correct value.');
    equal(offset.bottom, qunit.offset().top + qunit.outerHeight(), 'contains a bottom property with the correct value.');
    equal(offset.left, qunit.offset().left, 'contains a left property with the correct value.');
  });

})();
