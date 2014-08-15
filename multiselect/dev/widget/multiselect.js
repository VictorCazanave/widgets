app.directive('ngMultiselect', function() {
  return {
    restrict: 'AE',
    templateUrl: 'widget/multiselect.html',
    replace: true,
    scope: {},
    link: function(scope, element, attrs) {
      scope.word = "";
      scope.words = ["val1", "val2"];
      //scope.error = "";

      scope.addWord = function() {
        //scope.error = "";
        if (scope.word !== "") {
          if (scope.words.indexOf(scope.word) === -1) {
            scope.words.push(scope.word);
            scope.word = "";
          } else {
            //scope.error = "Already added";
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
        //scope.error = "";
        if (scope.word === "" && scope.words.length > 0 && event.keyCode === 8) {
          scope.removeLastWord();
        }
      };

      scope.getWordsWidth = function() {
        //console.log(angular.element(document.querySelector('#width'))[0].offsetWidth);
        return angular.element(document.querySelector('#MS_words-width'))[0].offsetWidth;
      };
    }
  };
});
