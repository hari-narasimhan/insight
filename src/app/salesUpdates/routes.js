(function() {
  'use strict';

  angular
    .module('insight')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('salesUpdates', {
        url: '/salesUpdates',
        templateUrl: 'app/salesUpdates/list.html',
        controller: 'SalesUpdatesController',
        controllerAs: 'salesUpdates'
      })
      .state('editSalesUpdate', {
          url: '/editSalesUpdate/:id',
          templateUrl: 'app/salesUpdates/edit.html',
          controller: 'EditSalesUpdateController',
          controllerAs: 'editSalesUpdate'
      });
  }

})();
