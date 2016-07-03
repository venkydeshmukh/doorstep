'use strict';

describe('Controller: ProductInformationCtrl', function () {

  // load the controller's module
  beforeEach(module('doorstepApp'));

  var ProductInformationCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProductInformationCtrl = $controller('ProductInformationCtrl', {
      $scope: scope
    });
  }));
  // 
  // it('should ...', function () {
  //   expect(true).toBe(true);
  // });
});
