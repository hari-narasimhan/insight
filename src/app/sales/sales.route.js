(function() {
  'use strict';

  angular
    .module('insight')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('sales', {
        url: '/sales',
        templateUrl: 'app/sales/sales.html',
        controller: 'SalesController',
        controllerAs: 'sales'
      })
      .state('newSales', {
          url: '/salesUpdates',
          templateUrl: 'app/sales/new.html',
          controller: 'NewSalesController',
          controllerAs: 'newSales'
      });
  }

})();
