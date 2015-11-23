(function() {
  'use strict';

  angular
    .module('insight')
    .controller('NewOpportunityModalController', NewOpportunityModalController);

  /** @ngInject */
  function NewOpportunityModalController ( $scope, $modalInstance, PROSPECT_STATUS, APP_CONSTANTS, Common, BusinessUnits, Products, Opportunities, Users) {
    
    var _this = this;


    _this.getOpportunity = function () {

        return {
            businessUnitId: $scope.opportunity.product.selected.businessUnitId,
            businessUnit: $scope.opportunity.product.selected.businessUnit,
            product: $scope.opportunity.product.selected.name,
            prospect: $scope.opportunity.prospect,
            year: $scope.opportunity.year,
            month : $scope.opportunity.month,
            status : $scope.opportunity.status,
            staff: $scope.opportunity.staff.selected.fullname
        };
    };

    _this.ok = function () {
        $modalInstance.close(_this.getOpportunity());
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

    $scope.targetDateOpen = function() {
        $scope.targetDateCtrl.status.opened = true;
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[1];

    _this.refreshStaff = function ( staff ) {
      return Users.query({query:{fullname:'~' + staff}})
        .then(function (response) {
            $scope.staffs = response;
        });
    };

    _this.refreshProducts = function ( product ) {
       return Products.query({query:{name: '~' + product}})
         .then(function (response) {
            $scope.products = response;
         });
    };

    // END DATE CONTROL RELATED

    $scope.refreshStaff = _this.refreshStaff;
    $scope.refreshProducts = _this.refreshProducts;


    $scope.ok = _this.ok;
    $scope.cancel = _this.cancel;
    $scope.statuses = PROSPECT_STATUS;
    
    $scope.opportunity = {
        product: {},
        year: year,
        month : month,
        status : $scope.statuses[0],
        staff: {}
    };
  }
})();
