app.directive('ngMultiSelect', function($sce) {
  return {
    restrict: 'AE',
    templateUrl: 'widget/multi-select.tpl.html',
    replace: true,
    scope: {
      options: '=',
      words: '=model'
    },
    link: function(scope, element, attrs) {

      scope.word = '';
      scope.words = [];
      scope.showOptions = false;

      /**
       * Remove word from words list
       */
      scope.removeWord = function(index) {
        scope.words.splice(index, 1);
        //scope.$emit('MS_EVENT-change', scope.words);
      };

      /**
       * Focus option in drop down list
       */
      scope.focusOption = function(option) {
        scope.focused = option;
      };

      /**
       * Check if option is focused
       */
      scope.isFocused = function(option) {
        return scope.focused === option;
      };

      /**
       * Add option in words list
       */
      scope.addOption = function(option) {
        if (scope.filteredOptions.length > 0 && scope.words.indexOf(option) === -1) {
          scope.words.push(option);
          //scope.$emit('MS_EVENT-change', scope.words);
          scope.showOptions = false;
          scope.word = '';
        }
      };

      /**
       * Filter to check if option has been already added in words list
       */
      scope.filterAlreadyAdded = function() {
        return function(item) {
          return scope.words.indexOf(item) === -1;
        };
      };

      /**
       * Highlight the searched part
       */
      scope.highlight = function(text, search) {
        if (!search) {
          return $sce.trustAsHtml(text);
        }
        return $sce.trustAsHtml(text.replace(new RegExp(search, 'gi'), '<span class="MS_highlight">$&</span>'));
      };

      /**
       * Get width of the words list to set dynamically the width of the HTML element
       */
      scope.getWordsWidth = function() {
        return angular.element(document.querySelector('#MS_words-width'))[0].offsetWidth;
      };

      /**
       * Manage keydown events
       */
      scope.keydown = function(event) {
        if (scope.word.length === 0 && scope.words.length > 0 && event.keyCode === 8) { // back space
          removeLastWord();
        }
      };

      /**
       * Manage keyup events
       */
      scope.keyup = function(event) {
        if (scope.word.length === 0) {
          if (event.keyCode === 40 || event.keyCode === 38) {
            scope.showOptions = true;
          } else {
            scope.showOptions = false;
            scope.focused = undefined;
          }
        }
        if (scope.word.length > 0 || scope.showOptions) {
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
       * Manage blur event
       */
      scope.blur = function() {
        scope.showOptions = false;
        scope.focused = undefined;
      };

      /**
       * Remove the last word from words list
       */
      var removeLastWord = function() {
        scope.words.pop();
        //scope.$emit('MS_EVENT-change', scope.words);
      };

      /**
       * Get next option in filtered options list
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
       * Get previous option in filtered options list
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
