(function() {
  'use strict';

  angular
    .module('insight')
    .controller('EditProductController', EditProductController);

  /** @ngInject */
  function EditProductController ( $scope, $state, $stateParams, $translate, Products, BusinessUnits ) {
      var _this = this;
      
      _this.getData = function(id) {
          Products.get(id)
            .then(
                function(response) {
                    $scope.product = response;
                    $scope.businessUnit.selected = {name: response.businessUnit, _id:response.businessUnitId};
                }, function (error) {
                    //TODO handle error
                }
            );
      };
      
      var id = $stateParams.id;
      
      $scope.cancel = function() {
        $state.go('products');
      };
      
      $translate('PRODUCT_UPDATED_SUCCESSFULLY').then(function(val){
          $scope.successMessage = val || 'SUCCESS';
      });
      
      $translate('ERROR_UPDATING_PRODUCT').then(function(val){
          $scope.errorMessage = val || 'ERROR';
      });
      
      // Business Unit picker
    _this.refreshBusinessUnits = function (businessUnit) {

      return BusinessUnits.query({query:{name: '~' + businessUnit}})
      .then(function (response) {
        $scope.businessUnits = response;
      });
    }      

    _this.getProduct = function () {
      return {
        name: $scope.product.name,
        description: $scope.product.description,
        businessUnit: $scope.businessUnit.selected.name,
        businessUnitId : $scope.businessUnit.selected.id,
      };
    };
    // Business Unit picker
    $scope.businessUnit = {};
    $scope.refreshBusinessUnits = _this.refreshBusinessUnits;


      $scope.save = function() {
        Products.update(id, _this.getProduct())
        .then(
                function(response) {
                    toastr.info($scope.successMessage);
                    $state.go('products');
                }, function (error) {
                    //TODO handle error
                    toastr.error($scope.errorMessage);
                }        
        );
      };
      
     // Fetch the data from the server
      _this.getData(id);
      
  }
})();
