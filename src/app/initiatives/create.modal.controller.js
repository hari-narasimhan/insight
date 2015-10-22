(function() {
  'use strict';

  angular
    .module('insight')
    .controller('NewInitiativeModalController', NewInitiativeModalController);

  /** @ngInject */
  function NewInitiativeModalController ( $scope, $modalInstance, APP_CONSTANTS, Common, BusinessUnits, Initiatives, Users) {
    
    var _this = this;
    
    _this.ok = function () {
        // Check if we have a valid business id
        if(!Common.hasValidBusinessUnit($scope.newInitiative)) {
            $scope.newInitiativeForm.businessUnit.$setValidity('validity', false);
            return;
        }

        Initiatives.create($scope.newInitiative).then(
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
      $scope.newInitiative.businessUnitId = businessUnit._id;
      $scope.newInitiative.businessUnit = businessUnit.name;
    };

    $scope.ok = _this.ok;
    $scope.cancel = _this.cancel;
    
    $scope.newInitiative = {
        businessUnit: undefined,
        businessUnitId: undefined,
        year: year,
        month : month,
        initiatives: new Array(10)
    };
  }
})();
