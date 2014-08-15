app.directive('ngVisible', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      attrs.$observe('ngVisible', function(newValue, oldValue) {
        if (newValue === "true") {
          element.css('visibility', 'visible');
        } else {
          element.css('visibility', 'hidden');
        }
      });
    }
  };
});
