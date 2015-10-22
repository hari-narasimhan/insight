(function() {
  'use strict';

  angular
    .module('insight')
    .controller('EditSalesUpdateController', EditSalesUpdateController);

  /** @ngInject */
  function EditSalesUpdateController ( $scope, $state, $stateParams, $modal, $translate, toastr, SalesUpdates ) {

    $scope.salesUpdate = undefined;
    
    var id = $stateParams.id;

    $scope.openFocusAreaModal = function (size) {
      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'app/components/modals/focusarea.modal.html',
        controller : 'FocusAreaModalController',
        size: size
      });
      
      modalInstance.result.then(function (focusArea) {
        $scope.salesUpdate.focusAreas.push(focusArea);
      }, function () {
          // DO NOTHING
      });
    };

    $scope.openActivityModal = function (size) {
      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'app/components/modals/activity.modal.html',
        controller : 'ActivityModalController',
        size: size
      });
      
      modalInstance.result.then(function (engineeringActivity) {
        $scope.salesUpdate.activities.push(engineeringActivity);
      }, function () {
          // DO NOTHING
      });
    };
    

    $translate('SALES_UPDATE_UPDATED_SUCCESSFULLY').then(function(val){
      $scope.successMessage = val || 'SUCCESS';
    });
      
      $translate('ERROR_UPDATING_SALES_UPDATE').then(function(val){
          $scope.errorMessage = val || 'ERROR';
      });

    $scope.save = function() {
      SalesUpdates.update(id, $scope.salesUpdate)
        .then (
          function(response) {
              toastr.info($scope.successMessage);
              $state.go('salesUpdates');
          }, function (error) {
              //TODO handle error
              toastr.error($scope.errorMessage);
          }        
        );

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
