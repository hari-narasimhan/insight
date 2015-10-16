(function() {
  'use strict';

  angular
    .module('insight')
    .controller('EditMarketingUpdateController', EditMarketingUpdateController);

  /** @ngInject */
  function EditMarketingUpdateController ( $scope, $state, $stateParams, $modal, MarketingUpdates ) {

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
    
    $scope.save = function() {
      // TODO Save the marketing update here
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
