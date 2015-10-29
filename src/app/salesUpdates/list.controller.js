(function() {
  'use strict';

  angular
    .module('insight')
    .controller('SalesUpdatesController', SalesUpdatesController);

  /** @ngInject */
  function SalesUpdatesController ( $scope, $state, $controller, $modal, Common, BusinessUnits, SalesUpdates ) {
    
    var _this = this;
    
    var baseCtrl = $controller('BaseController', 
        { $scope:$scope, 
          $state: $state, 
          $modal: $modal, 
          service: SalesUpdates, 
          editRoute: 'editSalesUpdate', 
          modalTitle: 'CREATE_SALES_UPDATE'}
    );

    // Mixin BaseController
    angular.extend(this, baseCtrl);
  
    // query the service for records
    _this.query({page:1});
  }
})();
