(function() {

  QUnit.module('scroll.height');

  QUnit.test('Provides the correct value', function() {
    equal(scroll.height(), window.innerHeight, 'Returns the window\'s height.');
  });

  QUnit.test('Respects scroll.settings.topPadding', function() {
    scroll.settings.topPadding = 100;
    notEqual(scroll.height(), window.innerHeight, 'should not equal window.innerHeight');
    equal(scroll.height(), window.innerHeight - 100, 'should equal window.innerHeight minus scroll.settings.topPadding');
  });

  QUnit.test('Respects scroll.settings.bottomPadding', function() {
    scroll.settings.bottomPadding = 100;
    notEqual(scroll.height(), window.innerHeight, 'should not equal window.innerHeight');
    equal(scroll.height(), window.innerHeight - 100, 'should equal window.innerHeight minus scroll.settings.bottomPadding');
  });

  QUnit.test('Respects both scroll.settings.topPadding and scroll.settings.bottomPadding', function() {
    scroll.settings.topPadding = 100;
    scroll.settings.bottomPadding = 100;
    notEqual(scroll.height(), window.innerHeight, 'should not equal window.innerHeight');
    equal(scroll.height(), window.innerHeight - 200, 'should equal window.innerHeight minus (scroll.settings.topPadding + scroll.settings.bottomPadding)');
  });

})();
