(function() {
  'use strict';

  angular
    .module('insight')
    .controller('ReportEngineeringController', ReportEngineeringController);

  /** @ngInject */
  function ReportEngineeringController($scope, $state, $stateParams, APP_CONSTANTS, BusinessUnits, 
    EngineeringUpdates) {
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
      body: 'app/main/report.engineering.part.html'
    };

    $scope.businessUnitId = $stateParams.businessUnitId;
    $scope.year = parseInt($stateParams.year);
    $scope.month = parseInt($stateParams.month);
    $scope.businessUnit = $stateParams.businessUnit;

    $scope.currentReport = APP_CONSTANTS.REPORT_SECTIONS[3];
    $scope.reportSections = APP_CONSTANTS.REPORT_SECTIONS;

    $scope.isCurrentReport = function (report) {
      return report.state === $scope.currentReport.state;
    };

    $scope.refresh = function () {
      EngineeringUpdates.query(_this.createQuery($scope.businessUnitId, $scope.year, $scope.month))
        .then (
          function(response) {
            $scope.engineeringUpdate = response[0];
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
  }
})();
