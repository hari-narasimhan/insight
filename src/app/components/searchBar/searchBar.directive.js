(function() {
  'use strict';

  angular
    .module('insight')
    .directive('searchBar', searchBar);

  /** @ngInject */
  function searchBar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/searchBar/searchBar.html',
      scope: {
          onChange: '&'
      },
      controller: SearchBarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function SearchBarController ( $scope, BusinessUnits, Common, APP_CONSTANTS ) {
      
      var vm = this;
      var currentYear = Common.getCurrentYear();
      var currentMonth = Common.getCurrentMonth();

      // Select Year
      vm.years = [currentYear - 1, currentYear, currentYear + 1];
      // Month
      vm.months = APP_CONSTANTS.MONTHS;    

      vm.refreshBusinessUnits = function(businessUnit) {
        BusinessUnits.query({query:{name: '~' + businessUnit}})
        .then(function(response){
          $scope.businessUnits = response;
        });
      };

      vm.reset = function () {
        vm.businessUnit = {};
        vm.month = currentMonth;
        vm.year = currentYear;
        vm.onChange({search: {businessUnit: vm.businessUnit.selected, year: vm.year, month: vm.month}});
      };

      vm.apply = function () {
        vm.onChange({search: {businessUnit: vm.businessUnit.selected, year: vm.year, month: vm.month}});
      };

      vm.reset();
    }
  }

})();
