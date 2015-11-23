(function() {
  'use strict';

  angular
    .module('insight')
    .factory('Common', Common);

    /** @ngInject */
    function Common (moment) {

        var service = {
            getCurrentYear : getCurrentYear,
            getCurrentMonth: getCurrentMonth,
            getCurrentMonthName: getCurrentMonthName,
            hasValidBusinessUnit: hasValidBusinessUnit,
            padLeftZ: padLeftZ,
            getPeriod: getPeriod,
            normalizeKeyMetrics: normalizeKeyMetrics,
            getRange: getRange
        };

        return service;


    function getCurrentYear () {
      return moment().year();
    }

    function getCurrentMonth () {
      return moment().month();
    }

    function getCurrentMonthName () {
      return moment.monthsShort(getCurrentMonth());
    }

    
    function getPeriod(year, month) {
      return parseInt(year + padLeftZ(month,2));
    }

    function hasValidBusinessUnit ( entity ) {
        
        // We need a business id to continue
        if(!entity.businessUnitId || !entity.businessUnit) {
            return false;
        }
        return true;
    }

     // String Functions -- TODO replace this with lodash version
    function padLeftZ(value, padding) {
      var zeroes = "0";
    
      for (var i = 0; i < padding; i++) { zeroes += "0"; }
    
      return (zeroes + value).slice(padding * -1);
    }

    // Key Metrics Related
    function normalizeKeyMetrics (businessUnit, range, keyMetrics){
        var ret = [];
        _.forEach(businessUnit.keyParameters, function(kpp) {
            var name = kpp.name;
            var values = [];
            // Go through the range and pull values from KPP in the order of the range
            _.forEach(range, function(period){
                var YYYYMM = getPeriod(period.year, period.month);
                values.push({
                    _id : _.result(_.find(keyMetrics, {period:YYYYMM, param:name}), '_id'),
                    year: period.year,
                    month: period.month,
                    period: YYYYMM,
                    value: _.result(_.find(keyMetrics, {period:YYYYMM, param:name}), 'value')
               });
            });
            ret.push({name:name, values:values});
        });
        return ret;
    }

    function getRange (startDate, endDate) {
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
    }

}

})();
