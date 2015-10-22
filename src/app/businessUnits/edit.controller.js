(function() {
  'use strict';

  angular
    .module('insight')
    .controller('EditBusinessUnitController', EditBusinessUnitController);

  /** @ngInject */
  function EditBusinessUnitController ( $scope, $state, $stateParams, $translate, toastr, BusinessUnits ) {
      var _this = this;
      
      _this.getData = function(id) {
          BusinessUnits.get(id)
            .then(
                function(response) {
                    $scope.businessUnit = response;

                    if(!_.has($scope.businessUnit, 'keyParameters')) {
                      $scope.businessUnit.keyParameters = [];
                    }
                    // Cache the data for changes
                    $scope.originalData = JSON.stringify($scope.businessUnit);
                }, function (error) {
                    toastr.error(error.message);
                }
            );
      };
      
      var id = $stateParams.id;
      
      $scope.cancel = function() {
        $state.go('businessUnits');
      };
      
      $translate('BUSINESS_UNIT_UPDATED_SUCCESSFULLY').then(function(val){
          $scope.successMessage = val || 'SUCCESS';
      });
      
      $translate('ERROR_UPDATING_BUSINESS_UNIT').then(function(val){
          $scope.errorMessage = val || 'ERROR';
      });
      
      $scope.addKeyParameter = function (kpp) {
        if(_.find($scope.businessUnit.keyParameters, {name:kpp})) {
          toastr.error("Duplicate");
        } else {
         $scope.businessUnit.keyParameters.push({name:kpp});
         $scope.keyParameter = undefined;
        }
      };

      $scope.removeKeyParameter = function (index) {
        $scope.businessUnit.keyParameters.splice(index,1);
      };

      $scope.save = function() {
        BusinessUnits.update(id, $scope.businessUnit)
        .then(
                function(response) {
                    $scope.originalData = $scope.businessUnit = JSON.stringify(response);
                    toastr.info($scope.successMessage);
                    $state.go('businessUnits');
                }, function (error) {
                    //TODO handle error
                    toastr.error($scope.errorMessage);
                }        
        );
      };
      
      $scope.keyParameter = undefined;

     // Fetch the data from the server
      _this.getData(id);
      
      var $locationChangeStartUnbind = $scope.$on('$stateChangeStart', 
        function (event, toState, toParams, fromState, fromParams) {
        if ($scope.originalData !== JSON.stringify($scope.businessUnit)) {
            toastr.error("Please save changes");
            event.preventDefault();
        } else {
            //DO NOTHING THERE IS NO CHANGES IN THE FORM
        }
      });
  }
})();
