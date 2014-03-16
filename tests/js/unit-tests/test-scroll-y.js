(function() {

  QUnit.module('scroll.scrollY');

  QUnit.test('Provides the correct value', function() {
    equal(scroll.scrollY(), window.pageYOffset, 'Returns the scroll\'s offset from the document\'s top.');
  });

})();
