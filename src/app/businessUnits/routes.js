(function() {
  'use strict';

  angular
    .module('insight')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('businessUnits', {
        url: '/businessUnits',
        templateUrl: 'app/businessUnits/list.html',
        controller: 'BusinessUnitsController',
        controllerAs: 'businessUnits'
      })
      .state('editBusinessUnit', {
          url: '/editBusinessUnit/:id',
          templateUrl: 'app/businessUnits/edit.html',
          controller: 'EditBusinessUnitController',
          controllerAs: 'editBusinessUnit'
      });
  }
})();
