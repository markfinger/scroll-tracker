(function() {

  QUnit.module('scroll.position');

  QUnit.test('Provides the correct values', function() {
    var position = scroll.position();
    equal(position.top, scroll.scrollY(), 'contains a top property with the correct value.');
    equal(position.bottom, scroll.scrollY() + scroll.height(), 'contains a bottom property with the correct value.');
    equal(position.left, scroll.scrollX(), 'contains a bottom property with the correct value.');
    equal(position.right, scroll.scrollX() + scroll.width(), 'contains a bottom property with the correct value.');
    equal(position.height, scroll.height(), 'contains a height property with the correct value.');
    equal(position.width, scroll.width(), 'contains a height property with the correct value.');
  });

})();
