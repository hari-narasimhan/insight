(function() {
  'use strict';

  angular
    .module('insight')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, $rootScope, $state, $auth, $window, APP_CONSTANTS, 
          BusinessUnits, KeyMetrics, Common ) {
    
    var  _this = this;

    $scope.chartOptions = {
      chart: {
        type: "cumulativeLineChart",
        height: 150,
        margin: {
          top: 20,
          right: 20,
          bottom: 50,
          left: 65
        },
        color: [
          "#1f77b4",
          "#ff7f0e",
          "#2ca02c",
          "#d62728",
          "#9467bd",
          "#8c564b",
          "#e377c2",
          "#7f7f7f",
          "#bcbd22",
          "#17becf"
        ],
        duration: 300,
        useInteractiveGuideline: true,
        clipVoronoi: false,
        xAxis: {
          axisLabel: "Months",
          showMaxMin: false,
          staggerLabels: true
        },
        yAxis: {
          axisLabel: "Values",
          axisLabelDistance: 0
        }
      }
    };

    _this.createQuery = function (businessUnitId, startPeriod, endPeriod) {
        
        return {
                query: {
                    period: {"$gt": startPeriod, "$lte": endPeriod}
                }
            };
    };

    _this.getMonths = function ( selectedYear, currentYear, currentMonth, months ) {
        
      if(selectedYear !== currentYear) {
        return months;
      } else {
        var ret =  _.filter(months, function(m) {
          return m.value <= currentMonth; 
        });
        ret = _.sortByOrder(ret, ['value'], ['desc']);
        return ret;
      }

    };

    // Get current year and month from moment
    var currentYear = Common.getCurrentYear();
    var currentMonth = Common.getCurrentMonth();
    

    // Select Year
    $scope.years = [currentYear - 1, currentYear, currentYear + 1];
    $scope.months = APP_CONSTANTS.MONTHS;
    
    $scope.year = currentYear;
    $scope.month = currentMonth;

    $scope.refresh = function () {

      _this.startDate   = moment([$scope.year, $scope.month, 1]).subtract(APP_CONSTANTS.KEY_PARAM_MONTHS_RANGE, 'months');
      _this.startPeriod = parseInt(_this.startDate.format("YYYYMM"));
      _this.endDate     = moment([$scope.year, $scope.month, 1]).add(APP_CONSTANTS.KEY_PARAM_MONTHS_RANGE,'months');
      _this.endPeriod   = parseInt(_this.endDate.format("YYYYMM"));
    

      $scope.range      = Common.getRange(_this.startDate, _this.endDate);
      $scope.months = _this.getMonths($scope.year, currentYear, currentMonth, APP_CONSTANTS.MONTHS);
      
      console.log($scope.chartOptions);

      var updatedDate = new Date($scope.year, $scope.month, 1);
      var updatedAt = moment(updatedDate).subtract(3, 'months').toISOString();
      var query = {query: {updatedAt: {"$gt": updatedAt}}};

      BusinessUnits.query({})
        .then(function(businessUnits){
          $scope.items = [];
          $scope.businessUnits = businessUnits;

            KeyMetrics.query(_this.createQuery(_this.startPeriod, _this.endPeriod))
              .then(function(response){
                
                _.forEach(businessUnits, function(businessUnit) {
                  var metrics = _.filter(response, {businessUnitId : businessUnit._id});

                  var val = {};  
                  val[businessUnit.name] = Common.normalizeKeyMetrics(businessUnit, $scope.range, metrics);
                  $scope.items.push(val);
                });
            });
        });
    };

    $scope.openReport = function (businessUnitId, year, month, businessUnit) {
      $state.go('report.keymetric', {businessUnitId: businessUnitId, 
                                    year:year, month:month, businessUnit: businessUnit});
    };

    $scope.isAuthenticated = function () {
      return $auth.isAuthenticated();
    };

    $scope.logout = function() {
      $auth.logout();
      delete $window.localStorage.currentUser;
      $state.go('home');
    };

    $scope.refresh();
  }
})();
