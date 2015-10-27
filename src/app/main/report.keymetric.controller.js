(function() {
  'use strict';

  angular
    .module('insight')
    .controller('ReportKeyMetricController', ReportKeyMetricController);

  /** @ngInject */
  function ReportKeyMetricController($scope, $state, $stateParams, APP_CONSTANTS, BusinessUnits, 
    KeyMetrics, Common, toastr) {
    var  _this = this;

    _this.createQuery = function (businessUnitId, startPeriod, endPeriod) {
        
        return {
                query: {
                    businessUnitId: businessUnitId, 
                    period: {"$gt": startPeriod, "$lte": endPeriod}
                }
            };
    };


    _this.startDate   = moment().subtract(APP_CONSTANTS.KEY_PARAM_MONTHS_RANGE, 'months');
    _this.startPeriod = parseInt(_this.startDate.format("YYYYMM"));
    _this.endDate     = moment().add(APP_CONSTANTS.KEY_PARAM_MONTHS_RANGE,'months');
    _this.endPeriod   = parseInt(_this.endDate.format("YYYYMM"));

    $scope.range        = Common.getRange(_this.startDate, _this.endDate);

    $scope.businessUnitId = $stateParams.businessUnitId;
    $scope.year = parseInt($stateParams.year);
    $scope.month = parseInt($stateParams.month);
    $scope.businessUnit = $stateParams.businessUnit;

    $scope.currentReport = APP_CONSTANTS.REPORT_SECTIONS[0];
    $scope.reportSections = APP_CONSTANTS.REPORT_SECTIONS;

    $scope.isCurrentReport = function (report) {
      return report.state === $scope.currentReport.state;
    };

    $scope.refresh = function () {
      //fetch the key metrics
      KeyMetrics.query(_this.createQuery($scope.businessUnitId, _this.startPeriod, _this.endPeriod))
        .then(function(response) {
            $scope.keyMetrics = Common.normalizeKeyMetrics($scope.businessUnit, $scope.range, response);
            }, function (error) {
            //  TODO Handle Error
        });
    };
    
    $scope.transition = function (link) {
      $state.go(link.state, 
        {businessUnitId: $scope.businessUnitId, 
          year:$scope.year, 
          month:$scope.month, 
          businessUnit: $scope.businessUnit
        });
    };

    $scope.refresh();
  };
})();
