app.directive('ngMultiselect', function() {
  return {
    restrict: 'AE',
    templateUrl: 'widget/multiselect.html',
    replace: true,
    scope: {},
    link: function(scope, element, attrs) {
      scope.word = "";
      scope.words = ["val1", "val2"];
      scope.showError = false;
      scope.error = "Already added !";

      scope.addWord = function() {
        scope.showError = false;
        if (scope.word !== "") {
          if (scope.words.indexOf(scope.word) === -1) {
            scope.words.push(scope.word);
            scope.word = "";
          } else {
            scope.showError = true;
          }
        }
      };

      scope.removeWord = function(index) {
        scope.words.splice(index, 1);
      };

      scope.removeLastWord = function() {
        scope.words.pop();
      };

      scope.keydown = function(event) {
        scope.showError = false;
        if (scope.word === "" && scope.words.length > 0 && event.keyCode === 8) {
          scope.removeLastWord();
        }
      };

      scope.getWordsWidth = function() {
        return angular.element(document.querySelector('#MS_words-width'))[0].offsetWidth;
      };
    }
  };
});
