(function() {
  'use strict';

  angular
    .module('insight')
    .controller('EngineeringUpdatesController', EngineeringUpdatesController);

  /** @ngInject */
  function EngineeringUpdatesController ( $scope, $state, $controller, $modal, EngineeringUpdates ) {
    
    var _this = this;
    var baseCtrl = $controller('BaseController', {$scope:$scope, service: EngineeringUpdates});
    

    _this.openCreateModal = function (size) {
      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'app/engineeringUpdates/create.modal.html',
        controller : 'NewEngineeringUpdateModalController',
        size: size
      });
      
      modalInstance.result.then(function (id) {
        _this.edit(id);
      }, function () {
          // DO NOTHING
      });
    };
    
    _this.edit = function (id) {
      $state.go('editEngineeringUpdate', {id:id});
    };

    // Mixin BaseController
    angular.extend(this, baseCtrl);

    $scope.openCreateModal          = _this.openCreateModal;
    $scope.edit    = _this.edit;
    
    // query the service for records
    _this.query({page:1});
  }
})();
