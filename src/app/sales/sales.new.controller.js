(function() {
  'use strict';

  angular
    .module('insight')
    .controller('NewSalesController', NewSalesController);

  /** @ngInject */
  function NewSalesController ( $scope, $state, $modal, SalesUpdates, BusinessUnits) {
    
    var _this = this;
    
    _this.getCurrentYear = function() {
      return moment().year();
    }

    _this.getCurrentMonth = function() {
      return moment().month();
    }

    _this.getCurrentMonthName = function () {
      return moment.monthsShort(_this.getCurrentMonth());
    }

    _this.createNewRecord = function() {
        // TODO return a proper sales record
        return { 
          businessUnitId: undefined,
          businessUnit : undefined,
          year: _this.getCurrentYear(),
          month: _this.getCurrentMonthName(),
          focusAreas: [],
          newOpportunities: [],
          opportunityUpdates: [],
          pipeline: [],
          engineeringActivities: []
        };
    };
    
    _this.save = function () {
        
    };
    
    _this.cancel = function () {
        $state.go('sales');
    };
    
    _this.openFocusAreaModal = function (size) {
      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'app/sales/focusarea.update.modal.html',
        controller : 'FocusAreaController',
        size: size
      });
      
      modalInstance.result.then(function (focusArea) {
        $scope.salesUpdate.focusAreas.push(focusArea);
      }, function () {
          // DO NOTHING
      });
    };

    _this.openNewOpportunityModal = function (size) {
      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'app/sales/newOpportunity.modal.html',
        controller : 'NewOpportunityController',
        size: size
      });
      
      modalInstance.result.then(function (newOpportunity) {
        $scope.salesUpdate.newOpportunities.push(newOpportunity);
      }, function () {
          // DO NOTHING
      });
    };
    
    _this.openOpportunityModal = function (size) {
      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'app/sales/opportunity.modal.html',
        controller : 'OpportunityController',
        size: size
      });
      
      modalInstance.result.then(function (opportunity) {
        $scope.salesUpdate.opportunityUpdates.push(opportunity);
      }, function () {
          // DO NOTHING
      });
    };
    

    _this.openPipelineModal = function (size) {
      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'app/sales/pipeline.modal.html',
        controller : 'PipelineController',
        size: size
      });
      
      modalInstance.result.then(function (pipeline) {
        $scope.salesUpdate.pipeline.push(pipeline);
      }, function () {
          // DO NOTHING
      });
    };


    _this.openEngineeringActivityModal = function (size) {
      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'app/sales/engineeringActivity.modal.html',
        controller : 'EngineeringActivityController',
        size: size
      });
      
      modalInstance.result.then(function (engineeringActivity) {
        $scope.salesUpdate.engineeringActivities.push(engineeringActivity);
      }, function () {
          // DO NOTHING
      });
    };
    // Seed a new record

    $scope.salesUpdate = _this.createNewRecord();

    // Get current year and month from moment
    var year = _this.getCurrentYear();
    var month = _this.getCurrentMonth();
    
    // Select Year
    $scope.years = [year - 1, year, year + 1];
    
    // Month
    $scope.months = moment.monthsShort();    


    $scope.cancel = _this.cancel;

    // Wire modal open methods to scope
    $scope.openFocusAreaModal           = _this.openFocusAreaModal;
    $scope.openNewOpportunityModal      = _this.openNewOpportunityModal;
    $scope.openOpportunityModal         = _this.openOpportunityModal;
    $scope.openPipelineModal            = _this.openPipelineModal;
    $scope.openEngineeringActivityModal = _this.openEngineeringActivityModal;
    
  }
})();
