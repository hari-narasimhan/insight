(function() {
  'use strict';

  angular
    .module('insight')
    .controller('KeyMetricsController', KeyMetricsController);

  /** @ngInject */
  function KeyMetricsController ( $scope, $state, BusinessUnits, KeyMetrics, Common, toastr, APP_CONSTANTS) {
    var _this = this;

    _this.editStart   = moment().subtract(APP_CONSTANTS.EDIT_MONTHS_BEFORE, 'months');
    
    _this.startDate   = moment().subtract(APP_CONSTANTS.KEY_PARAM_MONTHS_RANGE, 'months');
    _this.startPeriod = parseInt(_this.startDate.format("YYYYMM"));
    _this.endDate     = moment().add(APP_CONSTANTS.KEY_PARAM_MONTHS_RANGE,'months');
    _this.endPeriod   = parseInt(_this.endDate.format("YYYYMM"));

    _this.monthName = function(month) {
        return moment.monthsShort(month-1);
    };
    
    _this.canEdit = function(year, month) {
        var date = moment([year, month, 1]);
        return date.isAfter(_this.editStart);
    };
    
    _this.createQuery = function (businessUnitId, startPeriod, endPeriod) {
        
        return {
                query: {
                    businessUnitId: businessUnitId, 
                    period: {"$gt": startPeriod, "$lte": endPeriod}
                }
            };
    };

    $scope.range        = Common.getRange(_this.startDate, _this.endDate);
    $scope.monthName    = _this.monthName;
    $scope.canEdit      = _this.canEdit;
    $scope.template     = {noRecords: 'app/components/templates/noRecords.html'};

    _this.refreshBusinessUnits = function (businessUnit) {

       return BusinessUnits.query({query:{name: '~' + businessUnit}})
         .then(function (response) {
            $scope.businessUnits = response;
         });
    };

    // Business Unit picker
    $scope.businessUnit = {};
    $scope.refreshBusinessUnits = _this.refreshBusinessUnits;


    // Handle typeahead selection
    $scope.onBusinessUnitSelect = function (businessUnit) {

      //fetch the key metrics
      KeyMetrics.query(_this.createQuery(businessUnit._id, _this.startPeriod, _this.endPeriod))
        .then(function(response){
            $scope.items = Common.normalizeKeyMetrics(businessUnit, $scope.range, response);
            $scope.setOriginalData($scope.items);
        });
    };
    
    $scope.items = [];
    
    $scope.setOriginalData = function(data) {
        $scope.originalData = JSON.stringify(data);
    };

    $scope.dataHasChanged = function (data) {
        return JSON.stringify(data) === $scope.originalData;
    };


    $scope.save = function (businessUnit, param, value) {
        var record = {
            businessUnitId: businessUnit._id,
            businessUnit: businessUnit.name,
            param: param,
            value: value.value || '',
            period: value.period
        };


        if(_.isUndefined(value._id)) {
            KeyMetrics.create(record)
                .then(
                    function(result) {
                        // Do nothing
                        value._id = result._id;
                    }, function (error) {
                        toastr.error(error.message);
                    }
                );
        } else {
            KeyMetrics.update(value._id, record)
                .then(
                    function() {
                        // Do nothing
                    }, function (error) {
                        toastr.error(error.message);
                    }
                );
        }

    };
  }
})();