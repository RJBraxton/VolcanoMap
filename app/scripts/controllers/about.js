'use strict';

/**
 * @ngdoc function
 * @name volcanoMapApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the volcanoMapApp
 */
angular.module('volcanoMapApp')
  .controller('AboutCtrl', function ($rootScope, $scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $rootScope.name = 'About';

  });
