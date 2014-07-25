'use strict';

describe('Controller: ContactctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('volcanoMapApp'));

  var ContactctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ContactctrlCtrl = $controller('ContactctrlCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
