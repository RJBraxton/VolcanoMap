'use strict';

/**
 * @ngdoc function
 * @name volcanoMapApp.controller:DetailCtrl
 * @description
 * # DetailCtrl
 * Controller of the volcanoMapApp
 */
angular.module('volcanoMapApp')
	.controller('DetailCtrl', ['$scope', '$routeParams', function ($scope, rp) {
		 $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.test = rp.id;
	}]);