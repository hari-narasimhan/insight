(function() {
  'use strict';

  angular
    .module('insight')
    .controller('NewSalesUpdateModalController', NewSalesUpdateModalController);

  /** @ngInject */
  function NewSalesUpdateModalController ( $scope, $modalInstance, BusinessUnits, SalesUpdates) {
    
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

    
    _this.hasValidBusinessId = function (newSalesUpdate) {
        
        // We need a business id to continue
        if(!newSalesUpdate.businessUnitId || !newSalesUpdate.businessUnit) {
            return false;
        }
        return true;
    };
    
    _this.ok = function () {
        
        // Check if we have a valid business id
        if(!_this.hasValidBusinessId($scope.newSalesUpdate)) {
            $scope.newSalesUpdateForm.businessUnit.$setValidity('validity', false);
            return;
        }

        SalesUpdates.create($scope.newSalesUpdate).then(
            function(response) {
                $modalInstance.close(response.id);
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
      $scope.newSalesUpdate.businessUnitId = businessUnit.id;
      $scope.newSalesUpdate.businessUnit = businessUnit.name;
    }

    $scope.ok = _this.ok;
    $scope.cancel = _this.cancel;
    
    $scope.newSalesUpdate = {
        businessUnit: undefined,
        businessUnitId: undefined,
        year: _this.getCurrentYear(),
        month : _this.getCurrentMonthName()
    };
  }
})();
