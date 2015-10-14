(function() {
  'use strict';

  angular
    .module('insight')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('opportunities', {
        url: '/opportunities',
        templateUrl: 'app/opportunities/list.html',
        controller: 'OpportunitiesController',
        controllerAs: 'opportunities'
      })
      /*.state('editSalesUpdate', {
          url: '/editSalesUpdate/:id',
          templateUrl: 'app/salesUpdates/edit.html',
          controller: 'EditSalesUpdateController',
          controllerAs: 'editSalesUpdate'
      })*/;
  }

})();
