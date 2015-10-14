(function() {
  'use strict';

  angular
    .module('insight')
    .controller('NewSalesUpdateController', NewSalesUpdateController);

  /** @ngInject */
  function NewSalesUpdateController ( $scope, $modalInstance, BusinessUnits, SalesUpdates) {
    
    var _this = this;
    _this.createdId = undefined;

    _this.getCurrentYear = function() {
      return moment().year();
    };

    _this.getCurrentMonth = function() {
      return moment().month();
    };

    _this.getCurrentMonthName = function () {
      return moment.monthsShort(_this.getCurrentMonth());
    };

    _this.ok = function () {
      $modalInstance.close(_this.createdId);
    };

    _this.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

    _this.newSalesUpdate = {
        businessUnit: undefined,
        businessUnitId: undefined,
        year: _this.getCurrentYear(),
        month : _this.getCurrentMonthName()
     };


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

    $scope.ok = _this.ok;
    $scope.cancel = _this.cancel;
    $scope.newSalesUpdate = _this.newSalesUpdate;
  }
})();
