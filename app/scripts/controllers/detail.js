'use strict';

/*global d3*/

/**
 * @ngdoc function
 * @name volcanoMapApp.controller:DetailCtrl
 * @description
 * # DetailCtrl
 * Controller of the volcanoMapApp
 */
 angular.module('volcanoMapApp')
 .controller('DetailCtrl', function ($scope, $routeParams) {


 	d3.csv('./geodata/volcano_list.csv', function(csv){

 		for(var j=0; j < csv.length; j++){
 			if(csv[j]['Volcano Number'] === $routeParams.id)
 			{
 				$scope.info = {
 					name: csv[j]['Volcano Name'],
 					volcanoNum: csv[j]['Volcano Number'],
 					volcanoType: csv[j]['Primary Volcano Type'],
 					lastEruption: csv[j]['Last Eruption Year'],
 					elevation: csv[j].Elevation,
 					majorRockTypes: [csv[j]['Major Rock 1'], csv[j]['Major Rock 2'], csv[j]['Major Rock 3'], csv[j]['Major Rock 4'], csv[j]['Major Rock 5']],
 					minorRockTypes: [csv[j]['Minor Rock 1'], csv[j]['Minor Rock 2'], csv[j]['Minor Rock 3'], csv[j]['Minor Rock 4'], csv[j]['Minor Rock 5']],
 					populationRanges: [csv[j]['Population within 5 km'], csv[j]['Population within 10 km'], csv[j]['Population within 30 km'], csv[j]['Population within 100 km']]
 				}; 
 				break;
            } //if loop
          } //for loop j
          $scope.$apply();
      });

 });
