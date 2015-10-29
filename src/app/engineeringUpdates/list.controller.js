(function() {
  'use strict';

  angular
    .module('insight')
    .controller('EngineeringUpdatesController', EngineeringUpdatesController);

  /** @ngInject */
  function EngineeringUpdatesController ( $scope, $state, $controller, $modal, Common, BusinessUnits, EngineeringUpdates ) {
    
    var _this = this;
    
    var baseCtrl = $controller('BaseController', 
        { $scope:$scope, 
          $state: $state, 
          $modal: $modal, 
          service: EngineeringUpdates, 
          editRoute: 'editEngineeringUpdate', 
          modalTitle: 'CREATE_ENGINEERING_UPDATE'}
    );

    // Mixin BaseController
    angular.extend(this, baseCtrl);
  
    // query the service for records
    _this.query({page:1});
  }
})();
