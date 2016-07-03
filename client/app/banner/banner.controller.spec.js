'use strict';

describe('Controller: BannerCtrl', function () {

  // load the controller's module
  beforeEach(module('doorstepApp'));

  var BannerCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BannerCtrl = $controller('BannerCtrl', {
      $scope: scope
    });
  }));
  // 
  // it('should ...', function () {
  //   expect(true).toBe(true);
  // });
});
