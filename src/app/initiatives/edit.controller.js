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
                  $scope.update = response;
              }
            );
      };
      
      
      $scope.cancel = function() {
        $state.go('initiatives');
      };
      
      $translate('INITIATIVE_UPDATED_SUCCESSFULLY').then(function(val){
          $scope.successMessage = val || 'SUCCESS';
      });
      
      $translate('ERROR_UPDATING_INITIATIVE').then(function(val){
          $scope.errorMessage = val || 'ERROR';
      });


      $scope.update = undefined;  
      var id = $stateParams.id;      
      $scope.id = id;
      $scope.save = function(id) {
        Initiatives.update(id, $scope.update)
        .then(
                function(response) {
                    toastr.info($scope.successMessage);
                    $state.go('initiatives');
                }        
        );
      };
      
     // Fetch the data from the server
      _this.getData(id);   
  }
})();
