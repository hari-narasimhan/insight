(function() {
  'use strict';

  angular
    .module('insight')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('products', {
        url: '/products',
        templateUrl: 'app/products/products.html',
        controller: 'ProductsController',
        controllerAs: 'products'
      })
      .state('businessUnits', {
        url: '/businessUnits',
        templateUrl: 'app/businessUnits/businessUnits.html',
        controller: 'BusinessUnitsController',
        controllerAs: 'businessUnits'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
