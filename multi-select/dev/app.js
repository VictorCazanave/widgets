var app = angular.module('app', []);

app.controller('MainCtrl', ['$scope',
  function($scope) {

    $scope.words = '';
    $scope.options = ['New York',
      'Los Angeles',
      'Chicago',
      'Houston',
      'Phoenix',
      'Philadelphia',
      'San Antonio',
      'San Diego',
      'Dallas',
      'San Jose',
      'Detroit',
      'Jacksonville',
      'Indianapolis',
      'San Francisco',
      'Columbus',
      'Austin',
      'Memphis',
      'Fort Worth',
      'Baltimore',
      'Charlotte',
      'El Paso',
      'Boston',
      'Seattle',
      'Washington',
      'Milwaukee',
      'Denver',
      'Las Vegas',
      'Nashville-Davidson',
      'Oklahoma City',
      'Portland',
      'Tucson',
      'Albuquerque',
      'Atlanta',
      'Long Beach',
      'Fresno',
      'Sacramento',
      'Mesa',
      'Kansas City',
      'Cleveland',
      'Virginia Beach',
      'Omaha',
      'Miami',
      'Oakland',
      'Tulsa',
      'Honolulu',
      'Minneapolis',
      'Colorado Springs',
      'Arlington',
      'Wichita',
      'Raleigh'
    ];

    $scope.$on('MS_EVENT-change', function(evt, values) {
      $scope.words = values.join(', ');
    });
  }
]);
