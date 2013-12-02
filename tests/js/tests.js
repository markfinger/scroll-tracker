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
      element.appendTo(testContainer);
      testElements.push(element);
    });
  };

  var checkElementsInViewport = function() {
    _.each(testElements, function(testElement) {
      var position = viewport.getPositionOf(testElement);

      var positionFormatter = function(value, className, textValue) {
        var element = testElement.find('.' + className);
        if (!element.length) {
          element = $('<span class="position ' + className + '">');
          element.appendTo(testElement);
        }

        element.addClass('positive');

        var text;

        if (value === true || value === false) {
          text = className;
          if (!value) {
            element.removeClass('positive');
          }
        } else if (typeof value === "object") {
          element.remove();
          _.each(value, function(_value, _key) {
            positionFormatter(_value, className + '-' + _key, className + '.' + _key);
          });
          return;
        } else if (typeof value === "number") {
          text = className + ': ' + value;
        } else {
          text = textValue + ': ' + value;
        }

        element.text(text);

        if (!element.length) {
          element = $('<span class="position ' + className + '">' + className + '</span>');
          element.appendTo(testElement);
        }
      }

      _.each(position, positionFormatter);
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