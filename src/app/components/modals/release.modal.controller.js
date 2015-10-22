(function() {
  'use strict';

  angular
    .module('insight')
    .controller('ReleaseModalController', ReleaseModalController);

  /** @ngInject */
  function ReleaseModalController ( $scope, $modalInstance, ENGINEERING_STATUS, Products) {
    
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
        $modalInstance.close($scope.release);
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

     $scope.refreshProduct = function ( product ) {
       return Products.query({q:{name:product}})
         .then(function (response) {
           return response.map(function(item){
             return item;
           });
         });
     };

    
    $scope.ok = _this.ok;
    $scope.cancel = _this.cancel;
    $scope.statuses = ENGINEERING_STATUS;
    
    $scope.release = {
        product: undefined,
        milestoneTask: undefined,
        status : $scope.statuses[0],
        targetDate: undefined,
        remarks: undefined
    };
  }
})();
