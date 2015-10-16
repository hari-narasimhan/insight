(function() {
  'use strict';

  angular
    .module('insight')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('marketingUpdates', {
        url: '/marketingUpdates',
        templateUrl: 'app/marketingUpdates/list.html',
        controller: 'MarketingUpdatesController',
        controllerAs: 'marketingUpdates'
      })
      .state('editMarketingUpdate', {
          url: '/editMarketingUpdate/:id',
          templateUrl: 'app/marketingUpdates/edit.html',
          controller: 'EditMarketingUpdateController',
          controllerAs: 'editMarketingUpdate'
      });
  }

})();
