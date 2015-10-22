(function() {
  'use strict';

  angular
    .module('insight')
    .controller('NewProductModalController', NewProductModalController);

  /** @ngInject */
  function NewProductModalController ( $scope, $modalInstance, Products, BusinessUnits) {
    
    var _this = this;
    _this.createdId = undefined;

 
    _this.ok = function () {

        Products.create($scope.newProduct).then(
            function(response) {
                $modalInstance.close(response.id);
            },
            function (error) {
                // TODO Handle the error gracefully
            }
        );

    };

    _this.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

    // Business Unit picker
    $scope.selectedBusinessUnit = undefined;  
    $scope.refreshBusinessUnits = function ( businessUnit ) {
      return BusinessUnits.query({q:{name:businessUnit}})
        .then(function (response) {
          return response.map(function(item){
            return item;
          });
        });
    };

    // Handle typeahead selection
    $scope.setSelectedBusinessUnit = function (businessUnit) {
      $scope.newProduct.businessUnitId = businessUnit._id;
      $scope.newProduct.businessUnit = businessUnit.name;
    };


    $scope.ok = _this.ok;
    $scope.cancel = _this.cancel;
    
    $scope.newProduct = {
        name: undefined,
        businessUnitId: undefined,
        businessUnit: undefined,
        description: undefined
    };
  }
})();
