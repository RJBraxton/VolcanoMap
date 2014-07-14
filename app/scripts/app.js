'use strict';

/**
 * @ngdoc overview
 * @name volcanoMapApp
 * @description
 * # volcanoMapApp
 *
 * Main module of the application.
 */
angular
  .module('volcanoMapApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run([function () {
    
  }]);
