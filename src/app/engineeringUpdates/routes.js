(function() {
  'use strict';

  angular
    .module('insight')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('engineeringUpdates', {
        url: '/engineeringUpdates',
        templateUrl: 'app/engineeringUpdates/list.html',
        controller: 'EngineeringUpdatesController',
        controllerAs: 'engineeringUpdates'
      })
      .state('editEngineeringUpdate', {
          url: '/editEngineeringUpdate/:id',
          templateUrl: 'app/engineeringUpdates/edit.html',
          controller: 'EditEngineeringUpdateController',
          controllerAs: 'editEngineeringUpdate'
      });
  }

})();
