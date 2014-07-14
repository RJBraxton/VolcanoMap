'use strict';

/**
 * @ngdoc service
 * @name volcanoMapApp.xmlParse
 * @description
 * # xmlParse
 * Factory in the volcanoMapApp.
 */
angular.module('volcanoMapApp')
  .factory('xmlParse', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      },
      getVolcanoName: function(xml, num){
        return xml.documentElement.getElementsByTagName('info')[num].childNodes[13].getElementsByTagName('value')[0].innerHTML;
      }
    };
  });
