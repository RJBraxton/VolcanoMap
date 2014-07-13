'use strict';

/**
 * @ngdoc function
 * @name volcanoMapApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the volcanoMapApp
 */
 angular.module('volcanoMapApp')
 .controller('MainCtrl', function ($scope) {
 	$scope.awesomeThings = [
 	'HTML5 Boilerplate',
 	'AngularJS',
 	'Karma'
 	];
 	$scope.map = function(){

 		var width = 960,
 		height = 600;

 		var projection = d3.geo.albers()
 		.rotate([96, 0])
 		.center([-.6, 38.7])
 		.parallels([29.5, 45.5])
 		.scale(1070)
 		.translate([width / 2, height / 2])
 		.precision(.1);

 		var path = d3.geo.path()
 		.projection(projection);

 		var graticule = d3.geo.graticule()
 		.extent([[-98 - 45, 38 - 45], [-98 + 45, 38 + 45]])
 		.step([5, 5]);

 		var svg = d3.select("#map").append("svg")
 		.attr("viewBox", "0 0 960 500")
 		.attr("preserveAspectRatio", "xMidyMid slice")
 		.attr("width", '100%')
 		.attr("height", '100%');

 		d3.json("world-110m.json", function(error, world) {
      //Mapping the earf
      svg.insert("path", ".graticule")
      .datum(topojson.feature(world, world.objects.land))
      .attr("class", "land")
      .attr("d", path);
      svg.insert("path", ".graticule")
      .datum(topojson.mesh(world, world.objects.countries, function(a, b) { return a.id !== b.id; }))
      .attr("class", "borders")
      .attr("d", path);
  });
 	};

 	$scope.map();
 });
