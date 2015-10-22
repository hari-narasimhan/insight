(function() {
  'use strict';

  angular
    .module('insight')
    .controller('EditOpportunityController', EditOpportunityController);

  /** @ngInject */
  function EditOpportunityController ( $scope, $state, $stateParams, toastr, PROSPECT_STATUS, $translate, Opportunities ) {
      var _this = this;
      
      _this.getData = function(id) {
          Opportunities.get(id)
            .then(
                function(response) {
                    $scope.opportunity = response;
                }, function (error) {
                    //TODO handle error
                }
            );
      };
      
      $scope.statuses = PROSPECT_STATUS;
      $scope.newStatus = undefined;
      $scope.remarks = undefined;
      $scope.opportunity = undefined;  
      var id = $stateParams.id;
      
      $scope.cancel = function() {
        $state.go('opportunities');
      };
      
      $translate('OPPORTUNITY_UPDATED_SUCCESSFULLY').then(function(val){
          $scope.successMessage = val || 'SUCCESS';
      });
      
      $translate('ERROR_UPDATING_OPPORTUNITY').then(function(val){
          $scope.errorMessage = val || 'ERROR';
      });
      
      $scope.save = function() {
        
        if(!$scope.opportunity.statusUpdates) {
          $scope.opportunity.statusUpdates = [];
        }

        $scope.opportunity.statusUpdates.push({updatedAt: new Date(), status: $scope.newStatus, remarks: $scope.remarks});
        Opportunities.update(id, $scope.opportunity)
        .then(
                function(response) {
                    toastr.info($scope.successMessage);
                    $state.go('opportunities');
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
