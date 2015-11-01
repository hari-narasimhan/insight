(function() {
  'use strict';

  angular
    .module('insight')
    .controller('ReportMarketingController', ReportMarketingController);

  /** @ngInject */
  function ReportMarketingController($scope, $state, $stateParams, APP_CONSTANTS, BusinessUnits, 
    MarketingUpdates, Opportunities, Common, toastr) {
    var  _this = this;

    _this.createQuery = function (businessUnitId, year, month) {
        
        return {
                query: {
                    businessUnitId: businessUnitId, 
                    year: year,
                    month: month
                }
            };
    };

    $scope.template = {
      base: 'app/components/templates/reports.html',
      body: 'app/main/report.marketing.part.html'
    };

    $scope.businessUnitId = $stateParams.businessUnitId;
    $scope.year = parseInt($stateParams.year);
    $scope.month = parseInt($stateParams.month);
    $scope.businessUnit = $stateParams.businessUnit;

    $scope.currentReport = APP_CONSTANTS.REPORT_SECTIONS[1];
    $scope.reportSections = APP_CONSTANTS.REPORT_SECTIONS;

    $scope.isCurrentReport = function (report) {
      return report.state === $scope.currentReport.state;
    };
    
    $scope.refresh = function () {
      MarketingUpdates.query(_this.createQuery($scope.businessUnitId, $scope.year, $scope.month))
        .then (
          function(response) {
            $scope.marketingUpdate = response[0];
        }, function (error){
            // Handle Error
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
