(function() {

  'use strict';

  angular.module('ColorApp', ['ngRoute', 'ngAnimate'])
  .config([
    '$locationProvider',
    '$routeProvider',
    function($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      //routes
      $routeProvider
        .when('/', {
          templateUrl: './views/home.html',
          controller: 'MainController'
        })
        .otherwise({
          redirectTo: '/'
        });

    }
  ]);

  //load
  angular.module('ColorApp')
  .controller('MainController', [
    '$scope',
    function($scope) {
      $scope.title = "Titulo teste";
    }
  ]);
}());