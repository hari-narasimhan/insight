(function() {
  'use strict';

  angular
    .module('insight')
    .controller('NewEngineeringUpdateModalController', NewEngineeringUpdateModalController);

  /** @ngInject */
  function NewEngineeringUpdateModalController ( $scope, $modalInstance, BusinessUnits, EngineeringUpdates) {
    
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

    
    _this.hasValidBusinessId = function (newEngineeringUpdate) {
        
        // We need a business id to continue
        if(!newEngineeringUpdate.businessUnitId || !newEngineeringUpdate.businessUnit) {
            return false;
        }
        return true;
    };
    
    _this.ok = function () {
        
        // Check if we have a valid business id
        if(!_this.hasValidBusinessId($scope.newEngineeringUpdate)) {
            $scope.newEngineeringUpdateForm.businessUnit.$setValidity('validity', false);
            return;
        }

        EngineeringUpdates.create($scope.newEngineeringUpdate).then(
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
      $scope.newEngineeringUpdate.businessUnitId = businessUnit.id;
      $scope.newEngineeringUpdate.businessUnit = businessUnit.name;
    };

    $scope.ok = _this.ok;
    $scope.cancel = _this.cancel;
    
    $scope.newEngineeringUpdate = {
        businessUnit: undefined,
        businessUnitId: undefined,
        year: _this.getCurrentYear(),
        month : _this.getCurrentMonthName()
    };
  }
})();
