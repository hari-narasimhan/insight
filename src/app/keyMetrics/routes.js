(function() {
  'use strict';

  angular
    .module('insight')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('keyMetrics', {
        url: '/keyMetrics',
        templateUrl: 'app/keyMetrics/index.html',
        controller: 'KeyMetricsController',
        controllerAs: 'keyMetrics'
      });
  }

})();
