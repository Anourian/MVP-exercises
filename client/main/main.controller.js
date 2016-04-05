angular.module('testApp')
.controller('mainController', function($scope,gomokuService, $state ){
  $scope.grid = 10;
  $scope.$state = $state;
});