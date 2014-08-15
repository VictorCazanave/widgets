var app = angular.module('app', []);

app.controller('MainCtrl', ['$scope',
  function($scope) {
    $scope.isVisible = true;
  }
]);
