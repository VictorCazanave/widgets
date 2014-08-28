app.directive('ngMultiSelect', function() {
  return {
    restrict: 'AE',
    templateUrl: 'widget/multi-select.tpl.html',
    replace: true,
    scope: {},
    link: function(scope, element, attrs) {

      scope.word = '';
      scope.words = [];
      scope.showError = false;
      scope.error = 'Already added !';
      scope.refOptions = ['toto1', 'tata1', 'toto2', 'titi1', 'toto3', 'tata2', 'toto4', 'titi2', 'tata3', 'tata4'];
      scope.options = scope.refOptions;
      scope.showOptions = false;

      scope.removeWord = function(index) {
        scope.words.splice(index, 1);
        scope.$emit('MS_EVENT-change', scope.words);
      };

      scope.removeLastWord = function() {
        scope.words.pop();
        scope.$emit('MS_EVENT-change', scope.words);
      };

      scope.keyup = function(event) {
        scope.showError = false;
        if (scope.word === '') {
          scope.showOptions = false;
          if (scope.words.length > 0 && event.keyCode === 8) {
            scope.removeLastWord();
          }
        } else {
          // if (scope.options.length > 1 && event.keyCode === 40) { // down arrow
          //   //scope.scrollTo(scope.getNextOption());
          //   scope.focused = scope.getNextOption();
          //   scope.scrollTo(scope.focused);
          // } else if (scope.options.length > 1 && event.keyCode === 38) { // up arrow
          //   scope.focused = scope.getPreviousOption();
          //   scope.scrollTo(scope.focused);
          // } else {
            scope.lookup();
          //}
        }
      };

      scope.getWordsWidth = function() {
        return angular.element(document.querySelector('#MS_words-width'))[0].offsetWidth;
      };

      scope.lookup = function() {
        scope.options = [];
        for (var i = 0; i < scope.refOptions.length; i++) {
          if (scope.refOptions[i].indexOf(scope.word) > -1 && scope.words.indexOf(scope.refOptions[i]) === -1) {
            scope.options.push(scope.refOptions[i]);
          }
        }
        if (scope.options.length > 0) {
          scope.focused = scope.options[0];
        }
        scope.showOptions = true;
      };

      scope.focusOption = function(option) {
        scope.focused = option;
      };

      scope.hasFocus = function(option) {
        return scope.focused === option;
      };

      scope.addOption = function(option) {
        if (scope.options.length > 0 && scope.words.indexOf(option) === -1) {
          scope.words.push(option);
          scope.$emit('MS_EVENT-change', scope.words);
          scope.showOptions = false;
          scope.word = '';
        }
      };

      scope.getNextOption = function() {
        var currentIndex = scope.options.indexOf(scope.focused);
        if (currentIndex < scope.options.length - 1) {
          return scope.options[currentIndex + 1];
        } else {
          return scope.focused;
        }
      };

      scope.getPreviousOption = function() {
        var currentIndex = scope.options.indexOf(scope.focused);
        if (currentIndex > 0) {
          return scope.options[currentIndex - 1];
        } else {
          return scope.focused;
        }
      };

      // scope.scrollTo = function(option) {
      //   //console.log(option[0]);
      //   //var height = element(document.querySelector('.MS_option'))[0].offsetHeight;
      //   //console.log(height);
      //   var currentIndex = scope.options.indexOf(option);
      //   console.log(currentIndex);
      //   var optionsElt = angular.element(document.querySelector('.MS_options'))[0];
      //   if (currentIndex > 4) {
      //     var scrollHeight = (currentIndex - 4) * 31;
      //     //console.log(scrollHeight);
      //     optionsElt.scrollTop = scrollHeight;
      //     //console.log(optionsElt);
      //     //console.log(optionsElt.scrollHeight);
      //   } else {
      //     optionsElt.scrollTop = 0;
      //   }
      // };

    }
  };
});

// app.directive('msOption', function() {

//   return {
//     link: function(scope, element, attrs) {
//       //console.log(element[0].offsetHeight);
//     }
//   };
// });
