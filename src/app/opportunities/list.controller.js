(function() {
  'use strict';

  angular
    .module('insight')
    .controller('OpportunitiesController', OpportunitiesController);

  /** @ngInject */
  function OpportunitiesController ( $scope, $state, $controller, $modal, Opportunities) {
    
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
        _this.edit(id);
      }, function () {
          // DO NOTHING
      });
    };
    
    _this.edit = function (id) {
      $state.go('editOpportunity', {id:id});
    };

    // Mixin BaseController
    angular.extend(this, baseCtrl);

    $scope.openCreateModal  = _this.openCreateModal;
    $scope.edit  = _this.edit;

    // query the service for records
    _this.query({page:1});
  }
})();
