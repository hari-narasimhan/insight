(function() {
  'use strict';

  angular
    .module('insight')
    .controller('CompletionReportModalController', CompletionReportModalController);

  /** @ngInject */
  function CompletionReportModalController ( $scope, $modalInstance, Products, options, report) {
    
    var _this = this;

    _this.isEditMode = function () {
      return _.has(options, 'edit') && options.edit === true;
    }

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
        $modalInstance.close(_this.getReport());
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

     _this.refreshProducts = function ( product ) {
       return Products.query({query:{name: '~' + product}})
         .then(function (response) {
            $scope.products = response;
         });
     };

     _this.getReport = function () {
        return {
          product: _this.report.product.selected.name,
          remarks : _this.report.remarks
        };
     }
      
    _this.report = {
        product: {},
        remarks: undefined
    };

    this.title = "ADD_REPORT";

    if(_this.isEditMode()) {
      _this.title = 'EDIT_REPORT';
      // Make a copy
      _this.report.product.selected = {name: report.product};
      _this.report.remarks = report.remarks;
    }


    $scope.ok = _this.ok;
    $scope.cancel = _this.cancel;
    $scope.refreshProducts = _this.refreshProducts;
    $scope.report = _this.report;
    _this.originalReport = report;    

  }
})();
