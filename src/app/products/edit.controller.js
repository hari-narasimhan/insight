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
      $scope.product.businessUnitId = businessUnit._id;
      $scope.product.businessUnit = businessUnit.name;
    };

      $scope.save = function() {
        Products.update(id, $scope.product)
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
