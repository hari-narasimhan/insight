(function() {
  'use strict';

  angular
    .module('insight')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('products', {
        url: '/products',
        templateUrl: 'app/products/list.html',
        controller: 'ProductsController',
        controllerAs: 'products'
      })
      .state('editProduct', {
          url: '/editProduct/:id',
          templateUrl: 'app/products/edit.html',
          controller: 'EditProductController',
          controllerAs: 'editProducts'
      });
  }
})();
