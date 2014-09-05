app.directive('ngMultiSelect', function() {
  return {
    restrict: 'AE',
    templateUrl: 'widget/multi-select.tpl.html',
    replace: true,
    scope: {
      options: '='
    },
    link: function(scope, element, attrs) {

      scope.word = '';
      scope.words = [];
      scope.showOptions = false;

      /**
       * Remove the word from the words list
       */
      scope.removeWord = function(index) {
        scope.words.splice(index, 1);
        scope.$emit('MS_EVENT-change', scope.words);
      };

      /**
       * Focus the option in the drop down list
       */
      scope.focusOption = function(option) {
        scope.focused = option;
      };

      /**
       * Check if the option is focused
       */
      scope.isFocused = function(option) {
        return scope.focused === option;
      };

      /**
       * Add the option in the words list
       */
      scope.addOption = function(option) {
        if (scope.options.length > 0 && scope.words.indexOf(option) === -1) {
          scope.words.push(option);
          scope.$emit('MS_EVENT-change', scope.words);
          scope.showOptions = false;
          scope.word = '';
        }
      };

      /**
       * Check if the option has already been added in the words list
       */
      scope.filterAlreadyAdded = function() {
        return function(item) {
          return scope.words.indexOf(item) === -1;
        };
      };

      /**
       * Get width of the words list to set dynamically the width of the HTML element
       */
      scope.getWordsWidth = function() {
        return angular.element(document.querySelector('#MS_words-width'))[0].offsetWidth;
      };

      /**
       * Manage the keyup events
       */
      scope.keyup = function(event) {
        scope.showError = false;
        if (scope.word === '') {
          scope.showOptions = false;
          if (scope.words.length > 0 && event.keyCode === 8) { // back space
            removeLastWord();
          }
        } else {
          if (scope.filteredOptions.length > 1 && event.keyCode === 40) { // down arrow
            scope.focused = getNextOption();
          } else if (scope.filteredOptions.length > 1 && event.keyCode === 38) { // up arrow
            scope.focused = getPreviousOption();
          } else {
            scope.showOptions = true;
            if (scope.filteredOptions.length > 0) {
              scope.focused = scope.filteredOptions[0];
            }
          }
        }
      };

      /**
       * Remove the last word from the words list
       */
      var removeLastWord = function() {
        scope.words.pop();
        scope.$emit('MS_EVENT-change', scope.words);
      };

      /**
       * Get the next option in the filtered options list
       */
      var getNextOption = function() {
        var currentIndex = scope.filteredOptions.indexOf(scope.focused);
        if (currentIndex < scope.filteredOptions.length - 1) {
          return scope.filteredOptions[currentIndex + 1];
        } else { // if last return first
          return scope.filteredOptions[0];
        }
      };

      /**
       * Get the previous option in the filtered options list
       */
      var getPreviousOption = function() {
        var currentIndex = scope.filteredOptions.indexOf(scope.focused);
        if (currentIndex > 0) {
          return scope.filteredOptions[currentIndex - 1];
        } else { // if first return last
          return scope.filteredOptions[scope.filteredOptions.length - 1];
        }
      };
    }
  };
});
