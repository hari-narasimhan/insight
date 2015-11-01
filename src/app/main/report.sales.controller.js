(function() {
  'use strict';

  angular
    .module('insight')
    .controller('ReportSalesController', ReportSalesController);

  /** @ngInject */
  function ReportSalesController($scope, $state, $stateParams, APP_CONSTANTS, BusinessUnits, 
    SalesUpdates, Opportunities, Common, toastr) {
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
      body: 'app/main/report.sales.part.html'
    };


    $scope.businessUnitId = $stateParams.businessUnitId;
    $scope.year = parseInt($stateParams.year);
    $scope.month = parseInt($stateParams.month);
    $scope.businessUnit = $stateParams.businessUnit;

    $scope.currentReport = APP_CONSTANTS.REPORT_SECTIONS[2];
    $scope.reportSections = APP_CONSTANTS.REPORT_SECTIONS;

    $scope.isCurrentReport = function (report) {
      return report.state === $scope.currentReport.state;
    };

    $scope.refresh = function () {
      SalesUpdates.query(_this.createQuery($scope.businessUnitId, $scope.year, $scope.month))
        .then (
          function(response) {
            $scope.salesUpdate = response[0];
        }, function (error){
            // Handle Error
        });

      Opportunities.query(_this.createQuery($scope.businessUnitId, $scope.year, $scope.month))
        .then (
          function(response) {
            $scope.opportunities = response;
        }, function (error){
            // Handle Error
        });
    };
    
    $scope.refresh();

    $scope.transition = function (link) {
      $state.go(link.state, 
          {businessUnitId: $scope.businessUnitId, 
            year:$scope.year, 
            month:$scope.month, 
            businessUnit: $scope.businessUnit}
      );
    };
  };
})();
