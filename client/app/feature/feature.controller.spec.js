'use strict';

describe('Controller: FeatureCtrl', function () {

  // load the controller's module
  beforeEach(module('doorstepApp'));

  var FeatureCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FeatureCtrl = $controller('FeatureCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
