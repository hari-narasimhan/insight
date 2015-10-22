(function() {
  'use strict';

  angular
    .module('insight')
    .controller('NewOpportunityModalController', NewOpportunityModalController);

  /** @ngInject */
  function NewOpportunityModalController ( $scope, $modalInstance, PROSPECT_STATUS, APP_CONSTANTS, Common, BusinessUnits, Products, Opportunities, Users) {
    
    var _this = this;
    
    _this.ok = function () {
        // Check if we have a valid business id
        if(!Common.hasValidBusinessUnit($scope.newOpportunity)) {
            $scope.newOpportunityForm.businessUnit.$setValidity('validity', false);
            return;
        }

        Opportunities.create($scope.newOpportunity).then(
            function(response) {
                $modalInstance.close(response._id);
            },
            function (error) {
                // TODO Handle the error gracefully
            }
        );

    };

    _this.cancel = function () {
      $modalInstance.dismiss('cancel');
    };


    // Get current year and month from moment
    var year = Common.getCurrentYear();
    var month = Common.getCurrentMonth();
    
    // Select Year
    $scope.years = [year - 1, year, year + 1];
    
    // Month
    $scope.months = APP_CONSTANTS.MONTHS;    

    // DATE CONTROL RELATED
    $scope.targetDateCtrl = {
        status: {opened:false}
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    $scope.toggleMin = function() {
        $scope.minDate = $scope.minDate ? null : new Date();
    };
  
    $scope.toggleMin();
    $scope.maxDate = new Date(2020, 31, 12);

    $scope.targetDateOpen = function($event) {
        $scope.targetDateCtrl.status.opened = true;
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[1];

  
    // END DATE CONTROL RELATED

    // Business Unit picker
    //$scope.selectedBusinessUnit = undefined;  
    $scope.refreshBusinessUnits = Common.refreshBusinessUnits;
    $scope.refreshStaff = Common.refreshStaff;
    $scope.refreshProduct = Common.refreshProduct;

    // Handle typeahead selection
    $scope.setSelectedBusinessUnit = function (businessUnit) {
      $scope.newOpportunity.businessUnitId = businessUnit._id;
      $scope.newOpportunity.businessUnit = businessUnit.name;
    };

    $scope.ok = _this.ok;
    $scope.cancel = _this.cancel;
    $scope.statuses = PROSPECT_STATUS;
    
    $scope.newOpportunity = {
        businessUnit: undefined,
        businessUnitId: undefined,
        year: year,
        month : month,
        status : $scope.statuses[0],
        staff: undefined
    };
  }
})();
