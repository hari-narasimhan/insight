(function() {
  'use strict';

  angular
    .module('insight')
    .controller('SalesController', SalesController);

  /** @ngInject */
  function SalesController ( $scope, $state, $controller, $modal, SalesUpdates ) {
    
    var _this = this;
    var baseCtrl = $controller('BaseController', {$scope:$scope, service: SalesUpdates});
    

    _this.openNewSalesUpdateModal = function (size) {
      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'app/sales/newSalesUpdate.modal.html',
        controller : 'NewSalesUpdateController',
        size: size
      });
      
      modalInstance.result.then(function (id) {
        $state.go('newSales');
      }, function () {
          // DO NOTHING
      });
    };
    
    _this.editSalesUpdate = function (id) {
      $state.go('editSalesUpdate', {id:id});
    };

    // Mixin BaseController
    angular.extend(this, baseCtrl);

    $scope.openNewSalesUpdateModal = _this.openNewSalesUpdateModal;
    $scope.editSalesUpdate = _this.editSalesUpdate;
    
    // query the service for records
    _this.query({page:1});
  }
})();
