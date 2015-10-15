(function() {
  'use strict';

  angular
    .module('insight')
    .controller('InitiativesController', InitiativesController);

  /** @ngInject */
  function InitiativesController ( $scope, $state, $controller, $modal, Initiatives) {
    
    var _this = this;
    var baseCtrl = $controller('BaseController', {$scope:$scope, service: Initiatives});

    _this.openCreateModal = function (size) {
      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'app/initiatives/create.modal.html',
        controller : 'NewInitiativeModalController',
        size: size
      });
      
      modalInstance.result.then(function (id) {
        _this.editSalesUpdate(id);
      }, function () {
          // DO NOTHING
      });
    };
    
    _this.edit = function (id) {
      $state.go('editInitiative', {id:id});
    };

    // Mixin BaseController
    angular.extend(this, baseCtrl);

    $scope.openCreateModal  = _this.openCreateModal;
    $scope.edit  = _this.edit;

    // query the service for records
    _this.query({page:1});
  }
})();
