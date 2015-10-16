(function() {
  'use strict';

  angular
    .module('insight')
    .controller('KeyMetricsController', KeyMetricsController);

  /** @ngInject */
  function KeyMetricsController ( $scope, $state, KeyMetrics ) {
    
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
    };

    $scope.keyMetrics = {
        businessUnit: undefined,
        keyMetrics: []
    }
  }
})();
