(function() {
  'use strict';

  angular
    .module('insight')
    .controller('InitiativesController', InitiativesController);

  /** @ngInject */
  function InitiativesController ( $scope, $state, $controller, $modal, Initiatives) {
    
    var _this = this;
    var baseCtrl = $controller('BaseController', {$scope:$scope, service: Initiatives, editRoute: 'editInitiative', 
          modalTitle: 'CREATE_INITIATIVES'});

    _this.openCreateModal = function (size) {
      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'app/initiatives/create.modal.html',
        controller : 'NewInitiativeModalController',
        size: size
      });
      
      modalInstance.result.then(function (id) {
        $scope.edit(id);
      }, function () {
          // DO NOTHING
      });
    };
    
    // Mixin BaseController
    angular.extend(this, baseCtrl);

    $scope.openCreateModal  = _this.openCreateModal;

    // query the service for records
    _this.query({page:1});
  }
})();
