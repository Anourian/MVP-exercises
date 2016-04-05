angular.module('testApp')
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('home',{
      url:'/',
      templateUrl:'client/main/main.template.html',
      controller:'mainController',
      abstract: true,
    })
    .state('home.default', {
      parent:'home',
      url:'',
      templateUrl:'client/default.html'
    })
    .state('home.gomoku', {
      parent:'home',
      url:'gomoku/grid/:amount',
      templateUrl:'client/gomoku/gomoku.html',
      controller:'gomokuController',      
      resolve: {
        setInitial:function(gomokuService, $stateParams){
          return gomokuService.setGrid($stateParams.amount);
        }
      }
    })

}]);