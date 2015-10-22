(function() {
  'use strict';

  angular
    .module('insight')
    .controller('NewSalesUpdateModalController', NewSalesUpdateModalController);

  /** @ngInject */
  function NewSalesUpdateModalController ( $scope, $modalInstance, APP_CONSTANTS, Common, BusinessUnits, SalesUpdates) {
    
    var _this = this;
    
    _this.ok = function () {
        
        // Check if we have a valid business id
        if(!Common.hasValidBusinessUnit($scope.newSalesUpdate)) {
            $scope.newSalesUpdateForm.businessUnit.$setValidity('validity', false);
            return;
        }

        SalesUpdates.create($scope.newSalesUpdate).then(
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
    
    // Business Unit picker
    $scope.refreshBusinessUnits = Common.refreshBusinessUnits;

    // Handle typeahead selection
    $scope.setSelectedBusinessUnit = function (businessUnit) {
      $scope.newSalesUpdate.businessUnitId = businessUnit._id;
      $scope.newSalesUpdate.businessUnit = businessUnit.name;
    };

    $scope.ok = _this.ok;
    $scope.cancel = _this.cancel;
    
    var year = Common.getCurrentYear();
    var month = Common.getCurrentMonth();

    $scope.newSalesUpdate = {
        businessUnit: undefined,
        businessUnitId: undefined,
        year: year,
        month : month
    };

    // Select Year
    $scope.years = [year - 1, year, year + 1];
    $scope.months = APP_CONSTANTS.MONTHS;
  }
})();
