(function() {
  'use strict';

  angular
    .module('insight')
    .controller('NewProductModalController', NewProductModalController);

  /** @ngInject */
  function NewProductModalController ( $scope, $modalInstance, Products, BusinessUnits) {
    
    var _this = this;
    _this.createdId = undefined;

 
    _this.getProduct = function () {
      return {
        name : $scope.newProduct.name,
        description : $scope.newProduct.description,
        businessUnitId : $scope.businessUnit.selected._id,
        businessUnit :  $scope.businessUnit.selected.name
      };
    };

    _this.ok = function () {
      $modalInstance.close(_this.getProduct());
    };

    _this.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

    _this.refreshBusinessUnits = function (businessUnit) {

      return BusinessUnits.query({query:{name: '~' + businessUnit}})
      .then(function (response) {
        $scope.businessUnits = response;
      });
    };   

    // Business Unit picker
    $scope.businessUnit = {};
    $scope.refreshBusinessUnits = _this.refreshBusinessUnits;

    $scope.ok = _this.ok;
    $scope.cancel = _this.cancel;
    
    $scope.newProduct = {
        name: undefined,
        description: undefined
    };
  }
})();
