(function() {
  'use strict';

  angular
    .module('insight')
    .controller('ReleaseModalController', ReleaseModalController);

  /** @ngInject */
  function ReleaseModalController ( $scope, $modalInstance, ENGINEERING_STATUS, Products, options, release) {
    
    var _this = this;

    _this.isEditMode = function () {
      return _.has(options, 'edit') && options.edit === true;
    };

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
        $modalInstance.close(_this.getRelease());
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
       return Products.query({q:{name: '~' + product}})
         .then(function (response) {
            $scope.products = response;
          });
     };

     _this.getRelease = function () {
        return {
          product: _this.release.product.selected.name,
          milestoneTask: _this.release.milestoneTask,
          status : _this.release.status,
          targetDate : _this.release.targetDate,
          remarks : _this.release.remarks
        }
     };
    

    $scope.statuses = ENGINEERING_STATUS;

    _this.release = {
        product: {},
        milestoneTask: undefined,
        status : $scope.statuses[0],
        targetDate: undefined,
        remarks: undefined
    };

    
    this.title = "ADD_RELEASE";

    if(_this.isEditMode()) {
      _this.title = 'EDIT_RELEASE';
      // Make a copy
      _this.release.product.selected = {name: release.product};
      _this.release.milestoneTask = release.milestoneTask;
      _this.release.status = release.status;
      _this.release.targetDate = release.targetDate;
      _this.release.remarks = release.remarks;
    }

    $scope.title = _this.title;
    $scope.release = _this.release;
    $scope.ok = _this.ok;
    $scope.cancel = _this.cancel;
    
    $scope.refreshProducts = _this.refreshProducts;

    _this.originalRelease = release;

  }
})();
