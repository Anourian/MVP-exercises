angular.module('testApp')
.controller('mainController', function($scope,gomokuService, $location ){
  $scope.grid = 15;
});