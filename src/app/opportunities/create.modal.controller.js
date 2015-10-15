(function() {
  'use strict';

  angular
    .module('insight')
    .controller('NewOpportunityModalController', NewOpportunityModalController);

  /** @ngInject */
  function NewOpportunityModalController ( $scope, $modalInstance, BusinessUnits, Products, Opportunities, Users) {
    
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
        
        alert(JSON.stringify($scope.newOpportunity));
        // Check if we have a valid business id
        if(!_this.hasValidBusinessId($scope.newOpportunity)) {
            $scope.newOpportunityForm.businessUnit.$setValidity('validity', false);
            return;
        }

        Opportunities.create($scope.newOpportunity).then(
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
    $scope.selectedBusinessUnit = undefined;  
    $scope.refreshBusinessUnits = function ( businessUnit ) {
      return BusinessUnits.query({q:{name:businessUnit}})
        .then(function (response) {
          return response.data.map(function(item){
            return item;
          });
        });
    };

    $scope.refreshSalesPerson = function ( salesPerson ) {
      return Users.query({q:{name:salesPerson}})
        .then(function (response) {
          return response.data.map(function(item){
            return item;
          });
        });
    };

    $scope.refreshProduct = function ( product ) {
       return Products.query({q:{name:product}})
         .then(function (response) {
           return response.data.map(function(item){
             return item;
           });
         });
     };

    // Handle typeahead selection
    $scope.setSelectedBusinessUnit = function (businessUnit) {
      $scope.newOpportunity.businessUnitId = businessUnit.id;
      $scope.newOpportunity.businessUnit = businessUnit.name;
    }

    $scope.ok = _this.ok;
    $scope.cancel = _this.cancel;
    
    $scope.newOpportunity = {
        businessUnit: undefined,
        businessUnitId: undefined,
        year: _this.getCurrentYear(),
        month : _this.getCurrentMonthName()
    };
  }
})();
