(function() {
  'use strict';

  angular
    .module('insight')
    .controller('EditOpportunityController', EditOpportunityController);

  /** @ngInject */
  function EditOpportunityController ( $scope, $state, $stateParams, toastr, PROSPECT_STATUS, $controller, $translate, Opportunities ) {
      var _this = this;
      
    var baseEditCtrl = $controller('BaseEditController', 
        { $scope:$scope, 
          $state: $state,
          $translate: $translate, 
          service: Opportunities, 
          listRoute: 'opportunities'
        }
    );

    // Mixin BaseController
    angular.extend(this, baseEditCtrl);
    
      
      $scope.statuses = PROSPECT_STATUS;
      $scope.newStatus = undefined;
      $scope.remarks = undefined;
      $scope.opportunity = undefined;  
      
      $scope.id = $stateParams.id;
      $scope.get($scope.id);
      $scope.title = 'OPPORTUNITIES';
      
      $scope.save = function(id) {
        
        if(!$scope.update.statusUpdates) {
          $scope.update.statusUpdates = [];
        }

        $scope.update.statusUpdates.push({updatedAt: new Date(), status: $scope.newStatus, remarks: $scope.remarks});
        Opportunities.update(id, $scope.update)
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
  }
})();
