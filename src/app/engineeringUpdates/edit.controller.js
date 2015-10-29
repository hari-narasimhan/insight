(function() {
  'use strict';

  angular
    .module('insight')
    .controller('EditEngineeringUpdateController', EditEngineeringUpdateController);

  /** @ngInject */
  function EditEngineeringUpdateController ( $scope, $state, $stateParams, 
    $modal, $confirm, $translate, EngineeringUpdates ) {

    $scope.engineeringUpdate = undefined;
    var id = $stateParams.id;

    $scope.openFocusAreaModal = function (size) {
      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'app/components/modals/focusarea.modal.html',
        controller : 'FocusAreaModalController',
        size: size
      });
      
      modalInstance.result.then(function (focusArea) {
        $scope.engineeringUpdate.focusAreas.push(focusArea);
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
        $scope.engineeringUpdate.activities.push(engineeringActivity);
      }, function () {
          // DO NOTHING
      });
    };
    
    $scope.openReleaseModal = function (size) {
      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'app/components/modals/release.modal.html',
        controller : 'ReleaseModalController',
        size: size
      });
      
      modalInstance.result.then(function (release) {
        $scope.engineeringUpdate.releases.push(release);
      }, function () {
          // DO NOTHING
      });
    };
    
    $scope.openCompletionReportModal = function (size) {
      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'app/components/modals/completionReport.modal.html',
        controller : 'CompletionReportModalController',
        size: size
      });
      
      modalInstance.result.then(function (report) {
        $scope.engineeringUpdate.completionReports.push(report);
      }, function () {
          // DO NOTHING
      });
    };
    
  

    $translate('ENGINEERING_UPDATE_UPDATED_SUCCESSFULLY').then(function(val){
      $scope.successMessage = val || 'SUCCESS';
    });
      
    $translate('ERROR_UPDATING_ENGINEERING_UPDATE').then(function(val){
        $scope.errorMessage = val || 'ERROR';
    });

    $translate('CONFIRM_DELETE').then(function(val){
      $scope.confirmDelete = val || 'DELETE?';
    });

    $scope.save = function() {
      EngineeringUpdates.update(id, $scope.engineeringUpdate)
        .then (
          function(response) {
              toastr.info($scope.successMessage);
              $state.go('engineeringUpdates');
          }, function (error) {
              //TODO handle error
              toastr.error($scope.errorMessage);
          }        
        );

    };

    $scope.cancel = function() {
      $state.go('engineeringUpdates');
    };

    $scope.onDeleteFocusArea = function (index) {
      $confirm({text: $scope.confirmDelete})
        .then(function(){
          $scope.engineeringUpdate.focusAreas.splice(index, 1);
      });
    };

    EngineeringUpdates.get(id)
        .then(
            function(response){
                $scope.engineeringUpdate = response;
            },
            function(error){
                // TODO handle error
            }
        );
  }
})();
