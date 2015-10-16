(function() {
  'use strict';

  angular
    .module('insight')
    .controller('KeyMetricsController', KeyMetricsController);

  /** @ngInject */
  function KeyMetricsController ( $scope, $state, BusinessUnits, KeyMetrics, APP_CONSTANTS) {
    var _this = this;

    _this.editStart   = moment().subtract(APP_CONSTANTS.EDIT_MONTHS_BEFORE, 'months');
    _this.startDate   = moment().subtract(APP_CONSTANTS.KEY_PARAM_MONTHS_RANGE, 'months');
    _this.endDate     = moment().add(APP_CONSTANTS.KEY_PARAM_MONTHS_RANGE,'months');

    
    _this.getRange = function(startDate, endDate) {
        var range = [];
        // moment's month is zero based
        var month       = startDate.month() + 1;
        var year        = startDate.year();
        var endMonth    = endDate.month() + 1;
        var endYear     = endDate.year();

        while ( !(year === endYear && month === endMonth))  {
            range.push({year:year, month: month});
            // INCREMENT MONTH and YEAR
            if(month === 12) { month = 1; year += 1;} else { month += 1;}
        }
        return range;
    };

    _this.monthName = function(month) {
        return moment.monthsShort(month-1);
    };
    
    _this.canEdit = function(year, month) {
        var date = moment([year, month, 1]);
        return date.isAfter(_this.editStart);
    };
      
    _this.normalize = function (range, kpps){
        var ret = [];
        _.forEach(kpps, function(kpp) {
            var name = kpp.name;
            var values = [];
            console.log(kpp.values);
            // Go through the range and pull values from KPP in the order of the range
            _.forEach(range, function(period){
                values.push({
                    year: period.year,
                    month: period.month,
                    value: _.result(_.find(kpp.values, {year:period.year, month:period.month}), 'value')
               });
            });
            console.log(values);
            ret.push({name:name, values:values});
        });
        return ret;
    };
    
    $scope.range        = _this.getRange(_this.startDate, _this.endDate);
    $scope.monthName    = _this.monthName;
    $scope.canEdit      = _this.canEdit;
    
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
      $scope.keyMetrics.businessUnitId = businessUnit.id;
      $scope.keyMetrics.businessUnit = businessUnit.name;

      // TODO fetch the key metrics
      KeyMetrics.query({})
        .then(function(response){
            // Pick the first record from the response
            // we are expecting only one record to be returned
            $scope.keyMetrics.kpps = _this.normalize($scope.range, response.data[0].kpps);
            }, function (error) {
            //  TODO Handle Error
        });
    };
    
    $scope.keyMetrics = {
        businessUnit: undefined,
        businessUnitId: undefined,
        kpps: undefined
    };
  }
})();