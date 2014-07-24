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
 .controller('MainCtrl', function ($rootScope, $scope, xmlParse) {
 	$scope.awesomeThings = [
 	'HTML5 Boilerplate',
 	'AngularJS',
 	'Karma'
 	];

  $rootScope.name = 'Home';


    $scope.volcanoPrep = function(){
      $scope.volcanoesReported = [];
      d3.csv('./volcano_list.csv', function(csv){
        d3.xml('http://www.corsproxy.com/volcano.si.edu/news/WeeklyVolcanoCAP.xml', function(xml){
          for (var i=0; i < (xmlParse.getVolcanoCount(xml)); i++){

            for(var j=0; j < csv.length; j++){
              if(csv[j]['Volcano Name'] === xmlParse.getVolcanoName(xml, i))
              {
                $scope.volcanoesReported.push({
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
                  coors: [xmlParse.getLocation(xml, i)[2], xmlParse.getLocation(xml, i)[1]],
                  volcanoNum: csv[j]['Volcano Number'],
                  volcanoType: csv[j]['Primary Volcano Type'],
                  lastEruption: csv[j]['Last Eruption Year'],
                  elevation: csv[j].Elevation,
                  majorRockTypes: [csv[j]['Major Rock 1'], csv[j]['Major Rock 2'], csv[j]['Major Rock 3'], csv[j]['Major Rock 4'], csv[j]['Major Rock 5']],
                  minorRockTypes: [csv[j]['Minor Rock 1'], csv[j]['Minor Rock 2'], csv[j]['Minor Rock 3'], csv[j]['Minor Rock 4'], csv[j]['Minor Rock 5']],
                  populationRanges: [csv[j]['Population within 5 km'], csv[j]['Population within 10 km'], csv[j]['Population within 30 km'], csv[j]['Population within 100 km']]
                }); 
              break;
            } //if loop
          } //for loop j
          
      } //for loop i

      $scope.$apply();
      }); //d3.xml




     }); //d3.csv
  }; //$scope.volcanoPrep

  $scope.plot = function(){
    d3.select('.cover').remove();


    var quakes = d3.select('#world').append('g')
    .attr('class', 'volcanoes')
    .selectAll('.volcano')
    .data($scope.volcanoesReported)
    .enter().append('g')
    .attr('transform', function(d) {return 'translate(' + $scope.projection(d.coors)[0] + ',' + $scope.projection(d.coors)[1] + ')';});

    quakes.append('circle')
    .attr('class','volcano')
    .attr('r', 10)     
    .style('stroke-width', 1.45)
    .on('click', function(d){ $scope.display(d,d3.select(this));});

  }; //$scope.plot

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
     .step([5, 5]);

     var svg = d3.select('#map').append('svg')
     .attr('id','world')
     .attr('viewBox', '0 0 960 500')
     .attr('preserveAspectRatio', 'xMidyMid slice')
     .attr('width', '100%')
     .attr('height', '100%');

     svg.append('path')
      .datum(graticule.outline)
      .attr('class', 'water')
      .attr('d', path);

     d3.json('./world-110m.json', function(error, world) {
      svg.insert('path', '.graticule')
      .datum(topojson.feature(world, world.objects.land))
      .attr('class', 'land')
      .attr('d', path);
      svg.insert('path', '.graticule')
      .datum(topojson.mesh(world, world.objects.countries, function(a, b) { return a.id !== b.id; }))
      .attr('class', 'borders')
      .attr('d', path);

      var cover = svg.append('g').attr('class','cover');

      cover.append('rect')
      .attr('width', '100%')
      .attr('height', '100%')
      .style('fill', 'gray')
      .style('opacity', 0.2)
      .on('click', function(){ $scope.plot(); });

      cover.append('text')
      .attr('dx', '50%')
      .attr('dy', '50%')
      .attr('text-anchor', 'middle')
      .text("Click to load volcano data");
      }); //d3.json


    }; //$scope.map

  $scope.display = function(d,circle){
    $scope.$apply(function(){
      $scope.current = d;
      $scope.current.active = false;
    });
    d3.select('.volcanoCurrent').classed('volcanoCurrent', false);
    circle.classed('volcanoCurrent', true);
  };

  $scope.current = {
    name: '-',
    urgency: '-',
    certainty: '-',
    activity: '-',
    obervatoryPrimary: '-',
    oberrvatorySecondary: '-',
    headline: '-',
    description: '-',
    sources: '-',
    country: '-',
    coors: '-',
    volcanoNum: '-',
    volcanoType: '-',
    lastEruption: '-',
    elevation: '-',
    majorRockTypes: '-',
    minorRockTypes: '-',
    populationRanges: '-',
    active: true
  };


  $scope.map();
  $scope.volcanoPrep();


});
