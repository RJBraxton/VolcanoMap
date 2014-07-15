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
 .controller('MainCtrl', function ($scope, xmlParse) {
 	$scope.awesomeThings = [
 	'HTML5 Boilerplate',
 	'AngularJS',
 	'Karma'
 	];

  $scope.volcanoesReported = [];

 	$scope.map = function(){

     var width = 960,
     height = 600;

     $scope.projection = d3.geo.mercator()
     .scale((width + 1) / 2 / Math.PI)
     .translate([width / 2, height / 2])
     .precision(0.1);


     var path = d3.geo.path()
     .projection( $scope.projection);

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
            svg.insert('path', '.graticule')
            .datum(topojson.feature(world, world.objects.land))
            .attr('class', 'land')
            .attr('d', path);
            svg.insert('path', '.graticule')
            .datum(topojson.mesh(world, world.objects.countries, function(a, b) { return a.id !== b.id; }))
            .attr('class', 'borders')
            .attr('d', path);
      }); //d3.json
    }; //$scope.map

    //$scope.map();

  $scope.volcanoPregame = function(){
    d3.xml('./geodata/WeeklyVolcanoCAP.xml', function(xml){
      for (var i=0; i < xmlParse.getVolcanoCount(xml); i++)
      {
        $scope.$apply(function(){
          $scope.volcanoesReported.push([]);
          $scope.volcanoesReported[i].push({
            name: xmlParse.getVolcanoName(xml, i),
            urgency: xmlParse.getUrgency(xml, i),
            certainty: xmlParse.getCertainty(xml, i),
            activity: xmlParse.getActivityStatus(xml, i),
            obervatoryPrimary: xmlParse.getPrimaryObservatory(xml, i),
            oberrvatorySecondary: xmlParse.getSecondaryObservatory(xml, i),
            headline: xmlParse.getHeadline(xml, i),
            description: xmlParse.getDescription(xml, i),
            sources: xmlParse.getSources(xml, i),
            country: xmlParse.getLocation(xml, i)[0],
            coors: [xmlParse.getLocation(xml, i)[1], xmlParse.getLocation(xml, i)[2]]
          });
        }); //Scope apply
      } //for loop
      }); //d3.xml

      d3.csv('./geodata/volcano_list.csv', function(d){

       var quakes = d3.select('#world').append('g')
      .attr('class', 'quakes') 
      .selectAll('.quake')
      .data(d)
      .enter().append('g')
      .attr('class', 'quake')
      .attr('transform', function() {return 'translate(' +  $scope.projection([d[5].Longitude, d[5].Latitude])[0] + ',' +  $scope.projection([d[5].Longitude, d[5].Latitude])[1] + ')';});



      quakes.append('circle')
      .attr('class','quakeStatic')
      .attr('r', 25)
      .style('color', 'red')          
      .style('stroke', 'red')          
      .style('stroke-width', 1.45);

     }); //d3.csv


  }; //$scope.volcanoWerk

  $scope.volcanoPregame();
    
  });