(function() {
  'use strict';

  angular
    .module('insight')
    .controller('EditMarketingUpdateController', EditMarketingUpdateController);

  /** @ngInject */
  function EditMarketingUpdateController ( $scope, $state, $stateParams, $modal, $translate, MarketingUpdates ) {

    $scope.marketingUpdate = undefined;
    
    var id = $stateParams.id;

    $scope.openFocusAreaModal = function (size) {
      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'app/components/modals/focusarea.modal.html',
        controller : 'FocusAreaModalController',
        size: size
      });
      
      modalInstance.result.then(function (focusArea) {
        $scope.marketingUpdate.focusAreas.push(focusArea);
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
      
      modalInstance.result.then(function (marketingActivity) {
        $scope.marketingUpdate.activities.push(marketingActivity);
      }, function () {
          // DO NOTHING
      });
    };
    
    $translate('MARKETING_UPDATE_UPDATED_SUCCESSFULLY').then(function(val){
      $scope.successMessage = val || 'SUCCESS';
    });
      
    $translate('ERROR_UPDATING_MARKETING_UPDATE').then(function(val){
        $scope.errorMessage = val || 'ERROR';
    });

    $scope.save = function() {
      MarketingUpdates.update(id, $scope.marketingUpdate)
        .then (
          function(response) {
              toastr.info($scope.successMessage);
              $state.go('marketingUpdates');
          }, function (error) {
              //TODO handle error
              toastr.error($scope.errorMessage);
          }        
        );

    };

    $scope.cancel = function() {
      $state.go('marketingUpdates');
    };

    MarketingUpdates.get(id)
        .then(
            function(response){
                $scope.marketingUpdate = response;
            },
            function(error){
                // TODO handle error
            }
        );
  }
})();
