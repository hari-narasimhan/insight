(function() {
  'use strict';

  angular
    .module('insight')
    .controller('OpportunitiesController', OpportunitiesController);

  /** @ngInject */
  function OpportunitiesController ( $scope, $state, $controller, $modal, Opportunities ) {
    
    var _this = this;
    var baseCtrl = $controller('BaseController', {$scope:$scope, service: Opportunities});
    

    _this.openCreateModal = function (size) {
      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'app/opportunities/create.modal.html',
        controller : 'NewOpportunityModalController',
        size: size
      });
      
      modalInstance.result.then(function (id) {
        _this.editSalesUpdate(id);
      }, function () {
          // DO NOTHING
      });
    };
    
    _this.editOpportunity = function (id) {
      $state.go('editOpportunity', {id:id});
    };

    // Mixin BaseController
    angular.extend(this, baseCtrl);

    $scope.openCreateModal  = _this.openCreateModal;
    $scope.editSalesUpdate  = _this.editSalesUpdate;
    
    // query the service for records
    _this.query({page:1});
  }
})();
