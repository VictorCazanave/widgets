app.directive('ngMultiSearch', function() {
  return {
    restrict: 'AE',
    templateUrl: 'widget/multi-search.tpl.html',
    replace: true,
    scope: {
      words: '=model'
    },
    link: function(scope, element, attrs) {

      scope.word = '';
      scope.words = scope.words || [];
      scope.showError = false;
      scope.error = 'Already added !';

      /**
       * Add word in words list
       */
      scope.addWord = function() {
        scope.showError = false;
        if (scope.word !== '') {
          if (scope.words.indexOf(scope.word) === -1) {
            scope.words.push(scope.word);
            //scope.$emit('MS_EVENT-change', scope.words);
            scope.word = '';
          } else {
            scope.showError = true;
          }
        }
      };

      /**
       * Remove word from words list
       */
      scope.removeWord = function(index) {
        scope.words.splice(index, 1);
        //scope.$emit('MS_EVENT-change', scope.words);
      };

      /**
       * Get width of words list to set dynamically width of HTML element
       */
      scope.getWordsWidth = function() {
        return angular.element(document.querySelector('#MS_words-width'))[0].offsetWidth;
      };

      /**
       * Manage keydown events
       */
      scope.keydown = function(event) {
        scope.showError = false;
        if (scope.word === '' && scope.words.length > 0 && event.keyCode === 8) {
          removeLastWord();
        }
      };

      /**
       * Remove the last word from words list
       */
      var removeLastWord = function() {
        scope.words.pop();
        //scope.$emit('MS_EVENT-change', scope.words);
      };
    }
  };
});
