var app = angular.module('app', []);

app.controller('MainCtrl', ['$scope',
  function($scope) {

    $scope.words = '';
    $scope.options = ['toto1', 'tata1', 'toto2', 'titi1', 'toto3', 'tata2', 'toto4', 'titi2', 'tata3', 'tata4'];

    $scope.$on('MS_EVENT-change', function(evt, values) {
      $scope.words = values.join(', ');
    });
  }
]);
