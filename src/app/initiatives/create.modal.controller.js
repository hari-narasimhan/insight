(function() {
  'use strict';

  angular
    .module('insight')
    .controller('NewInitiativeModalController', NewInitiativeModalController);

  /** @ngInject */
  function NewInitiativeModalController ( $scope, $modalInstance, APP_CONSTANTS, Common, BusinessUnits, Initiatives, Users) {
    
    var _this = this;
    
    _this.getInitiative = function () {
        return {
            businessUnitId: $scope.newInitiative.businessUnit.selected._id,
            businessUnit: $scope.newInitiative.businessUnit.selected.name,
            year: $scope.newInitiative.year,
            month : $scope.newInitiative.month,
            initiatives: $scope.newInitiative.initiatives
        };
    };

    _this.ok = function () {
        $modalInstance.close(_this.getInitiative());
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

    _this.refreshBusinessUnits = function (businessUnit) {

       return BusinessUnits.query({query:{name: '~' + businessUnit}})
         .then(function (response) {
            $scope.businessUnits = response;
         });
    }      

    // Business Unit picker
    $scope.businessUnit = {};
    $scope.refreshBusinessUnits = _this.refreshBusinessUnits;


    $scope.ok = _this.ok;
    $scope.cancel = _this.cancel;
    
    $scope.newInitiative = {
        businessUnit: {},
        year: year,
        month : month,
        initiatives: new Array(10)
    };
  }
})();
