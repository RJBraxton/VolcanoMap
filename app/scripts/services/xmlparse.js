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
      getVolcanoCount: function(xml){
        return xml.documentElement.getElementsByTagName('info').length;
      },
      getVolcanoName: function(xml, num){
        return xml.documentElement.getElementsByTagName('info')[num].childNodes[13].getElementsByTagName('value')[0].innerHTML;
      },
      getResponseType: function(xml, num){
        return xml.documentElement.getElementsByTagName('info')[num].childNodes[5].innerHTML;
      },
      getUrgency: function(xml, num){
        return xml.documentElement.getElementsByTagName('info')[num].childNodes[7].innerHTML;
      },
      getCertainty: function(xml, num){
        return xml.documentElement.getElementsByTagName('info')[num].childNodes[11].innerHTML;
      },
      getActivityStatus: function(xml, num){
        //Yes = new activity, no = no
        return xml.documentElement.getElementsByTagName('info')[num].childNodes[15].getElementsByTagName('value')[0].innerHTML;
      },
      getPrimaryObservatory: function(xml, num){
        //Return [name, URL]
        return [xml.documentElement.getElementsByTagName('info')[num].childNodes[17].getElementsByTagName('value')[0].innerHTML, xml.documentElement.getElementsByTagName('info')[num].childNodes[19].getElementsByTagName('value')[0].innerHTML];
      },
      getSecondaryObservatory: function(xml, num){
        //Return [name, URL]
        return [xml.documentElement.getElementsByTagName('info')[num].childNodes[21].getElementsByTagName('value')[0].innerHTML, xml.documentElement.getElementsByTagName('info')[num].childNodes[23].getElementsByTagName('value')[0].innerHTML];
      },
      getHeadline: function(xml, num){
        return xml.documentElement.getElementsByTagName('info')[num].childNodes[27].innerHTML;
      },
      getDescription: function(xml, num){
        return xml.documentElement.getElementsByTagName('info')[num].childNodes[29].innerHTML;
      },
      getSources: function(xml, num){
        return xml.documentElement.getElementsByTagName('info')[num].childNodes[33].innerHTML;
      },
      getLocation: function(xml, num){
        //Return [Country, Lat, Long]
        var coors = xml.documentElement.getElementsByTagName('info')[num].childNodes[35].getElementsByTagName('circle')[0].innerHTML.split(/,| /) ;
        return  [xml.documentElement.getElementsByTagName('info')[num].childNodes[35].getElementsByTagName('areaDesc')[0].innerHTML, coors[0], coors[1]];
      }
    };
  });
