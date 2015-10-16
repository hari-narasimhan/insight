(function() {
  'use strict';

  angular
    .module('insight')
    .controller('EditEngineeringUpdateController', EditEngineeringUpdateController);

  /** @ngInject */
  function EditEngineeringUpdateController ( $scope, $state, $stateParams, $modal, EngineeringUpdates ) {

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
    
    $scope.save = function() {
      // TODO Save the marketing update here
    };

    $scope.cancel = function() {
      $state.go('marketingUpdates');
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
