'use strict';

describe('Controller: TaxCtrl', function () {

  // load the controller's module
  beforeEach(module('doorstepApp'));

  var TaxCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TaxCtrl = $controller('TaxCtrl', {
      $scope: scope
    });
  }));
  // 
  // it('should ...', function () {
  //   expect(true).toBe(true);
  // });
});
