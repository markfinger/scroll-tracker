(function() {

  QUnit.module('scroll.width');

  QUnit.test('Provides the correct value', function() {
    equal(scroll.width(), window.innerWidth, 'Returns the window\'s width.');
  });

})();
