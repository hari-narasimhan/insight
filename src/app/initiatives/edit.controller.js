(function() {
  'use strict';

  angular
    .module('insight')
    .controller('EditInitiativeController', EditInitiativeController);

  /** @ngInject */
  function EditInitiativeController ( $scope, $state, $stateParams, $translate, Initiatives ) {
      var _this = this;
      
      _this.getData = function(id) {
          Initiatives.get(id)
            .then(
                function(response) {
                    $scope.initiative = response;
                }, function (error) {
                    //TODO handle error
                }
            );
      };
      
      $scope.initiative = undefined;  
      var id = $stateParams.id;
      
      $scope.cancel = function() {
        $state.go('initiatives');
      };
      
      $translate('INITIATIVE_UPDATED_SUCCESSFULLY').then(function(val){
          $scope.successMessage = val || 'SUCCESS';
      });
      
      $translate('ERROR_UPDATING_INITIATIVE').then(function(val){
          $scope.errorMessage = val || 'ERROR';
      });
      
      $scope.save = function() {
        Initiatives.update($scope.initiative)
        .then(
                function(response) {
                    toastr.info($scope.successMessage);
                    $state.go('initiatives');
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
