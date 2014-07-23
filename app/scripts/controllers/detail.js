'use strict';

/*global d3, topojson, moment */

/**
 * @ngdoc function
 * @name volcanoMapApp.controller:DetailCtrl
 * @description
 * # DetailCtrl
 * Controller of the volcanoMapApp
 */
 angular.module('volcanoMapApp')
 .controller('DetailCtrl', function ($rootScope, $scope, $routeParams, $http) {

 	$scope.info = [];
 	$scope.eqinfo = 'nada';

 	//Generating info data and placing text
 	$scope.prep = function(){


 		d3.csv('./volcano_list.csv', function(csv){
 			$scope.$apply(function(){

 				for(var j=0; j < csv.length; j++){
 					if(csv[j]['Volcano Number'] === $routeParams.id)
 					{
 						$scope.info = {
 							name: csv[j]['Volcano Name'],
 							country: csv[j].Country,
 							region: csv[j].Region,
 							coors: csv[j].Latitude + ', ' + csv[j].Longitude,
 							lat: csv[j].Latitude,
 							lon: csv[j].Longitude,
 							subregion: csv[j].Subregion,
 							tectonic: csv[j]['Tectonic Settings'],
 							volcanoNum: csv[j]['Volcano Number'],
 							volcanoType: csv[j]['Primary Volcano Type'],
 							lastEruption: csv[j]['Last Eruption Year'],
 							elevation: csv[j].Elevation,
 							majorRockTypes: [csv[j]['Major Rock 1'], csv[j]['Major Rock 2'], csv[j]['Major Rock 3'], csv[j]['Major Rock 4'], csv[j]['Major Rock 5']],
 							minorRockTypes: [csv[j]['Minor Rock 1'], csv[j]['Minor Rock 2'], csv[j]['Minor Rock 3'], csv[j]['Minor Rock 4'], csv[j]['Minor Rock 5']],
 							populationRanges: [csv[j]['Population within 5 km'], csv[j]['Population within 10 km'], csv[j]['Population within 30 km'], csv[j]['Population within 100 km']]
 						};

 						var width = 960,
 						height = 600;


 						$scope.projection = d3.geo.mercator()
 						.scale((width + 1) / 2 / Math.PI)
 						.translate([width / 2, height / 2])
 						.center([$scope.info.lon,$scope.info.lat])
 						.scale(600)
 						.precision(0.1);

 						var path = d3.geo.path()
 						.projection( $scope.projection);

 						var graticule = d3.geo.graticule()
 						.step([5, 5]);

 						var svg = d3.select('#detailmap').append('svg')
 						.attr('id','world')
 						.attr('viewBox', '0 0 960 500')
 						.attr('preserveAspectRatio', 'xMidyMid slice')
 						.attr('width', '100%')
 						.attr('height', '100%');

 						svg.append('path')
 						.datum(graticule.outline)
 						.attr('class', 'water')
 						.attr('d', path);

 						//The volcano part needs to be inside .json or else it goes between the land and water. Why does it run in this order??
 						d3.json('./world-110m.json', function(error, world) {
 							svg.insert('path', '.graticule')
 							.datum(topojson.feature(world, world.objects.land))
 							.attr('class', 'land')
 							.attr('d', path);
 							svg.insert('path', '.graticule')
 							.datum(topojson.mesh(world, world.objects.countries, function(a, b) { return a.id !== b.id; }))
 							.attr('class', 'borders')
 							.attr('d', path);

 							svg.append('g')
 							.attr('transform', function() {return 'translate(' + $scope.projection([$scope.info.lon, $scope.info.lat])[0] + ',' + $scope.projection([$scope.info.lon, $scope.info.lat])[1] + ')';})
 							.append('circle')
 							.attr('class','volcano')
 							.attr('r', 10)     
 							.style('stroke-width', 1.45);

 							$http.get('http://www.corsproxy.com/comcat.cr.usgs.gov/fdsnws/event/1/query?starttime=' + moment().subtract('days', 7).format('YYYY-MM-DD') + '&latitude=' + $scope.info.lat + '&longitude=' + $scope.info.lon + '&maxradiuskm=1500&minmagnitude=0&format=geojson&endtime=' + moment().format('YYYY-MM-DD') + '&orderby=time')
 							.success(function(data){
 								d3.json(data, function(){
 									console.log([data.features[0].geometry.coordinates[0], data.features[0].geometry.coordinates[1]]);
 									for(var i=0; i < data.features.length; i++){
 										svg.selectAll('.eq')
 										.data(data.features)
 										.enter().append('g')
 										.attr('transform', function(d) {return 'translate(' + $scope.projection([d.geometry.coordinates[0], d.geometry.coordinates[1]])[0] + ',' + $scope.projection([d.geometry.coordinates[0], d.geometry.coordinates[1]])[1] + ')';})
 										.append('circle')
 										.attr('class', 'earthquake')
 										.on('mouseover', function(d){ $scope.$apply(function(){ $scope.eqinfo = d.properties.mag;});})
 										.attr('r', 10)     
 										.style('stroke-width', 1.45);
 									}
 								});
 							});
      }); //d3.json

 						

 						$rootScope.name = 'Detail - ' + csv[j]['Volcano Name'] + ', ' + csv[j].Country;
 						break;
            } //if loop
          } //for loop j
      }); //$scope apply
}); //csv
};

$scope.prep();
});
