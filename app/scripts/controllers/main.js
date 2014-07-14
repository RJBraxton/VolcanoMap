'use strict';
/* global d3, topojson */

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

           var projection = d3.geo.mercator()
           .scale((width + 1) / 2 / Math.PI)
           .translate([width / 2, height / 2])
           .precision(0.1);


           var path = d3.geo.path()
           .projection(projection);

           var graticule = d3.geo.graticule()
           .extent([[-98 - 45, 38 - 45], [-98 + 45, 38 + 45]])
           .step([5, 5]);

           var svg = d3.select('#map').append('svg')
           .attr('id','world')
           .attr('viewBox', '0 0 960 500')
           .attr('preserveAspectRatio', 'xMidyMid slice')
           .attr('width', '100%')
           .attr('height', '100%');

           d3.json('./geodata/world-110m.json', function(error, world) {
                  //Mapping the earf
                  svg.insert('path', '.graticule')
                  .datum(topojson.feature(world, world.objects.land))
                  .attr('class', 'land')
                  .attr('d', path);
                  svg.insert('path', '.graticule')
                  .datum(topojson.mesh(world, world.objects.countries, function(a, b) { return a.id !== b.id; }))
                  .attr('class', 'borders')
                  .attr('d', path);
            });

           d3.csv('./geodata/volcano_list.csv', function(d){


                   var quakes = d3.select('#world').append('g')
                  .attr('class', 'quakes') 
                  .selectAll('.quake')
                  .data(d)
                  .enter().append('g')
                  .attr('class', 'quake')
                  .attr('transform', function() {return 'translate(' + projection([d[5]['Longitude'], d[5]['Latitude']])[0] + ',' + projection([d[5]['Longitude'], d[5]['Latitude']])[1] + ')';});



                  quakes.append('circle')
                  .attr('class','quakeStatic')
                  .attr('r', 25)
                  .style('color', 'red')          
                  .style('stroke', 'red')          
                  .style('stroke-width', 1.45);

           }); //d3.csv

            }; //$scope.map

      $scope.map();
});