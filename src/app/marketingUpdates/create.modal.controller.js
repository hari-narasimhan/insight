(function() {
  'use strict';

  angular
    .module('insight')
    .controller('NewMarketingUpdateModalController', NewMarketingUpdateModalController);

  /** @ngInject */
  function NewMarketingUpdateModalController ( $scope, $modalInstance, APP_CONSTANTS, Common, BusinessUnits, MarketingUpdates) {
    
    var _this = this;
    
    _this.ok = function () {
        
        // Check if we have a valid business id
        if(!Common.hasValidBusinessUnit($scope.newMarketingUpdate)) {
            $scope.newMarketingUpdateForm.businessUnit.$setValidity('validity', false);
            return;
        }

        MarketingUpdates.create($scope.newMarketingUpdate).then(
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

    // Business Unit picker
    $scope.selectedBusinessUnit = undefined;

    $scope.refreshBusinessUnits = Common.refreshBusinessUnits;
    // Handle typeahead selection
    $scope.setSelectedBusinessUnit = function (businessUnit) {
      $scope.newMarketingUpdate.businessUnitId = businessUnit._id;
      $scope.newMarketingUpdate.businessUnit = businessUnit.name;
    };

    $scope.ok = _this.ok;
    $scope.cancel = _this.cancel;
    
    $scope.newMarketingUpdate = {
        businessUnit: undefined,
        businessUnitId: undefined,
        year: year,
        month : month
    };
  }
})();
