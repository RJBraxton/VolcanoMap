'use strict';

describe('Service: xmlParse', function () {

  // load the service's module
  beforeEach(module('volcanoMapApp'));

  // instantiate service
  var xmlParse;
  beforeEach(inject(function (_xmlParse_) {
    xmlParse = _xmlParse_;
  }));

  it('should do something', function () {
    expect(!!xmlParse).toBe(true);
  });

});
