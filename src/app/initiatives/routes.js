(function() {
  'use strict';

  angular
    .module('insight')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('initiatives', {
        url: '/initiatives',
        templateUrl: 'app/initiatives/list.html',
        controller: 'InitiativesController',
        controllerAs: 'initiatives'
      })
      .state('editInitiative', {
          url: '/editInitiative/:id',
          templateUrl: 'app/initiatives/edit.html',
          controller: 'EditInitiativeController',
          controllerAs: 'editInitiative'
      });
  }
})();
