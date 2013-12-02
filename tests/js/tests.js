define([
  'jquery',
  'lodash',
  'viewport'
], function($, _, viewport) {

  var testContainer;
  var testToggle;
  var testElements = [];

  var initTestElements = function() {
    _.each(_.range(200), function() {
      var element = $('<div class="test-element">');
      requestAnimationFrame(function() {
        element.appendTo(testContainer);
      });
      testElements.push(element);
    });
  };

  var checkElementsInViewport = function() {
    _.each(testElements, function(testElement) {
      var position = viewport.getPositionOf(testElement);
      _.each(position, function(value, key) {
        var element = testElement.find('.' + key);
        if (!element.length) {
          element = $('<span class="position ' + key + '">');
          element.appendTo(testElement);
        }

        var text;

        if (value === true || value === false) {
          text = key;
          if (value) {
            element.addClass('positive');
          } else {
            element.removeClass('positive');
          }
        } else {
          text = key + ': ' + value;
          element.addClass('positive');
        }

        element.text(text);

        if (!element.length) {
          element = $('<span class="position ' + key + '">' + key + '</span>');
          requestAnimationFrame(function() {
            element.appendTo(testElement);
          });
        }
      });
    });
  };



  var setBindings = function() {
    testToggle.on('click', function() {
      testToggle.attr('disabled', true);
      checkElementsInViewport();
      testToggle.attr('disabled', false);
    });
  };

  var init = function() {
    testContainer = $('.test-container');
    testToggle = $('.test-toggle');

    initTestElements();

    setBindings();
  };

  return {
    init: init,
    checkElementsInViewport: checkElementsInViewport
  };
});