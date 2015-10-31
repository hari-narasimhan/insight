(function() {
  'use strict';

  angular
    .module('insight')
    .controller('EditEngineeringUpdateController', EditEngineeringUpdateController);

  /** @ngInject */
  function EditEngineeringUpdateController ( $scope, $state, $controller, $stateParams, 
  $modal, $translate, $confirm, toastr, EngineeringUpdates ) {

    var baseEditCtrl = $controller('BaseEditController', 
        { $scope:$scope, 
          $state: $state,
          $translate: $translate, 
          service: EngineeringUpdates, 
          listRoute: 'engineeringUpdates'
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

    $scope.onDeleteRelease = function (index) {
      $confirm({text: $scope.confirmDelete})
        .then(function(){
          $scope.update.releases.splice(index, 1);
      });
    };

    $scope.onAddRelease = function (release) {
      $scope.update.releases.push(release);
    };

    $scope.onEditRelease = function(index, release) {
      $scope.update.releases[index] = release;
    };

    $scope.onDeleteReport = function (index) {
      $confirm({text: $scope.confirmDelete})
        .then(function(){
          $scope.update.completionReports.splice(index, 1);
      });
    };

    $scope.onAddReport = function (report) {
      $scope.update.completionReports.push(report);
    };

    $scope.onEditReport = function(index, report) {
      $scope.update.completionReports[index] = report;
    };

    $scope.id = $stateParams.id;
    $scope.get($scope.id);
    $scope.title = 'ENGINEERING_UPDATES';
  }
})();
