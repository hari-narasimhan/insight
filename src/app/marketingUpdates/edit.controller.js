(function() {
  'use strict';

  angular
    .module('insight')
    .controller('EditMarketingUpdateController', EditMarketingUpdateController);

  /** @ngInject */
  function EditMarketingUpdateController ( $scope, 
    $state, $controller, $stateParams, $modal, $translate, $confirm, toastr, MarketingUpdates ) {

    var baseEditCtrl = $controller('BaseEditController', 
        { $scope:$scope, 
          $state: $state,
          $translate: $translate, 
          service: MarketingUpdates, 
          listRoute: 'marketingUpdates'
        }
    );

    // Mixin BaseController
    angular.extend(this, baseEditCtrl);
    
    $scope.onDeleteFocusArea = function (index) {
      $confirm({text: $scope.confirmDelete})
        .then(function(){
          $scope.update.focusAreas.splice(index, 1);
      });
    };

    $scope.onAddFocusArea = function (focusArea) {
      $scope.update.focusAreas.push(focusArea);
    };

    $scope.onEditFocusArea = function(index, focusArea) {
      $scope.update.focusAreas[index] = focusArea;
    };


    $scope.onDeleteActivity = function (index) {
      $confirm({text: $scope.confirmDelete})
        .then(function(){
          $scope.update.activities.splice(index, 1);
      });
    };

    $scope.onAddActivity = function (activity) {
      $scope.update.activities.push(activity);
    };

    $scope.onEditActivity = function(index, activity) {
      $scope.update.activities[index] = activity;
    };

    $scope.id = $stateParams.id;
    $scope.get($scope.id);
    $scope.title = 'MARKETING_UPDATES';
  }
})();
