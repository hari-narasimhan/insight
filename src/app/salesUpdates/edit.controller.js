(function() {
  'use strict';

  angular
    .module('insight')
    .controller('EditSalesUpdateController', EditSalesUpdateController);

  /** @ngInject */
  function EditSalesUpdateController ( $scope, $state, $controller, $stateParams, $modal, $translate, $confirm, toastr, SalesUpdates ) {

    var baseEditCtrl = $controller('BaseEditController', 
        { $scope:$scope, 
          $state: $state,
          $translate: $translate, 
          service: SalesUpdates, 
          listRoute: 'salesUpdates'
        }
    );

    // Mixin BaseController
    angular.extend(this, baseEditCtrl);

    $scope.openActivityModal = function (size) {
      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'app/components/modals/activity.modal.html',
        controller : 'ActivityModalController',
        size: size
      });
      
      modalInstance.result.then(function (engineeringActivity) {
        $scope.update.activities.push(engineeringActivity);
      }, function () {
          // DO NOTHING
      });
    };
    
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
      // DO NOTHING
    };

    var id = $stateParams.id;
    $scope.get(id);
  }
})();
