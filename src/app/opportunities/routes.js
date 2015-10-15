(function() {
  'use strict';

  angular
    .module('insight')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('opportunities', {
        url: '/opportunities',
        templateUrl: 'app/opportunities/list.html',
        controller: 'OpportunitiesController',
        controllerAs: 'opportunities'
      })
      .state('editOpportunity', {
          url: '/editOpportunity/:id',
          templateUrl: 'app/opportunities/edit.html',
          controller: 'EditOpportunityController',
          controllerAs: 'editOpportunity'
      });
  }
})();
