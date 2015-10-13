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
          pipelineStatus: [],
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
    
    // Seed a new record

    $scope.salesUpdate = _this.createNewRecord();

    // Get current year and month from moment
    var year = _this.getCurrentYear();
    var month = _this.getCurrentMonth();
    
    // Select Year
    $scope.years = [year - 1, year, year + 1];
    
    // Month
    $scope.months = moment.monthsShort();    

    // Business Unit picker
    $scope.selectedBusinessUnit = undefined;  
    $scope.refreshBusinessUnits = function ( businessUnit ) {
      return BusinessUnits.query({q:{name:businessUnit}})
        .then(function (response) {
          return response.data.map(function(item){
            return item;
          });
        });
    };
    // Handle typeahead selection
    $scope.setSelectedBusinessUnit = function (businessUnit) {
      $scope.salesUpdate.bueinessUnitId = businessUnit.id;
    }

    $scope.cancel = _this.cancel;

    // Wire modal open methods to scope
    $scope.openFocusAreaModal = _this.openFocusAreaModal;
    $scope.openNewOpportunityModal = _this.openNewOpportunityModal;
    $scope.openOpportunityModal = _this.openOpportunityModal;
    
  }
})();
