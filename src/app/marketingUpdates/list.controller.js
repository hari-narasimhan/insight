(function() {
  'use strict';

  angular
    .module('insight')
    .controller('MarketingUpdatesController', MarketingUpdatesController);

  /** @ngInject */
  function MarketingUpdatesController ( $scope, $state, $controller, $modal, BusinessUnits, MarketingUpdates ) {
    
    var _this = this;
    
    var baseCtrl = $controller('BaseController', 
        { $scope:$scope, 
          $state: $state, 
          $modal: $modal, 
          service: MarketingUpdates, 
          editRoute: 'editMarketingUpdate', 
          modalTitle: 'CREATE_MARKETING_UPDATE'}
    );

    // Mixin BaseController
    angular.extend(this, baseCtrl);
  
    // query the service for records
    _this.query({page:1});
  }
})();
