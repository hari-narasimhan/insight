(function() {
  'use strict';

  angular
    .module('insight')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, $rootScope, $state, $auth, $window, APP_CONSTANTS, 
          BusinessUnits, Opportunities, Common ) {
    
    var  _this = this;

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

      $scope.months = _this.getMonths($scope.year, currentYear, currentMonth, APP_CONSTANTS.MONTHS);
      var updatedDate = new Date($scope.year, $scope.month, 1);
      var updatedAt = moment(updatedDate).subtract(3, 'months').toISOString();
      var query = {query: {updatedAt: {"$gt": updatedAt}}};

      Opportunities.query(query)
        .then(function(response){
          $scope.opportunities = response;
        });

      BusinessUnits.query({})
        .then ( function(businessUnits)  {
          $scope.businessUnits = businessUnits;
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

    BusinessUnits.query({})
      .then(
        function(response) {
          $scope.businessUnits = response;
        }
      );

    $scope.refresh();
  }
})();
