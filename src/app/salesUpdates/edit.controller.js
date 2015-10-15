(function() {
  'use strict';

  angular
    .module('insight')
    .controller('EditSalesUpdateController', EditSalesUpdateController);

  /** @ngInject */
  function EditSalesUpdateController ( $scope, $state, $stateParams, $modal, SalesUpdates ) {

    $scope.salesUpdate = undefined;
    
    var id = $stateParams.id;

    $scope.openFocusAreaModal = function (size) {
      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'app/salesUpdates/focusarea.modal.html',
        controller : 'FocusAreaModalController',
        size: size
      });
      
      modalInstance.result.then(function (focusArea) {
        $scope.salesUpdate.focusAreas.push(focusArea);
      }, function () {
          // DO NOTHING
      });
    };

    $scope.openSalesEngineeringActivityModal = function (size) {
      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'app/salesUpdates/salesEngineeringActivity.modal.html',
        controller : 'SalesEngineeringActivityController',
        size: size
      });
      
      modalInstance.result.then(function (engineeringActivity) {
        $scope.salesUpdate.salesEngineeringActivities.push(engineeringActivity);
      }, function () {
          // DO NOTHING
      });
    };
    
    $scope.save = function() {
      // TODO Save the sales update here
    };

    $scope.cancel = function() {
      $state.go('salesUpdates');
    };

    SalesUpdates.get(id)
        .then(
            function(response){
                $scope.salesUpdate = response;
            },
            function(error){
                // TODO handle error
            }
        );
  }
})();
