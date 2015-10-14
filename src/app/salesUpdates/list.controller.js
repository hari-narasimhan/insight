(function() {
  'use strict';

  angular
    .module('insight')
    .controller('SalesUpdatesController', SalesUpdatesController);

  /** @ngInject */
  function SalesUpdatesController ( $scope, $state, $controller, $modal, SalesUpdates ) {
    
    var _this = this;
    var baseCtrl = $controller('BaseController', {$scope:$scope, service: SalesUpdates});
    

    _this.openCreateModal = function (size) {
      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'app/salesUpdates/create.modal.html',
        controller : 'NewSalesUpdateModalController',
        size: size
      });
      
      modalInstance.result.then(function (id) {
        _this.editSalesUpdate(id);
      }, function () {
          // DO NOTHING
      });
    };
    
    _this.editSalesUpdate = function (id) {
      $state.go('editSalesUpdate', {id:id});
    };

    // Mixin BaseController
    angular.extend(this, baseCtrl);

    $scope.openCreateModal  = _this.openCreateModal;
    $scope.editSalesUpdate          = _this.editSalesUpdate;
    
    // query the service for records
    _this.query({page:1});
  }
})();
