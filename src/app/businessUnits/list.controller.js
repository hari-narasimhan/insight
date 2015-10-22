(function() {
  'use strict';

  angular
    .module('insight')
    .controller('BusinessUnitsController', BusinessUnitsController);

  /** @ngInject */
  function BusinessUnitsController ( $scope, $state, $controller, $modal, BusinessUnits ) {
    
    var _this = this;
    var baseCtrl = $controller('BaseController', {$scope:$scope, service: BusinessUnits});

    _this.openCreateModal = function (size) {
      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'app/businessUnits/create.modal.html',
        controller : 'NewBusinessUnitModalController',
        size: size
      });
      
      modalInstance.result.then(function (id) {
          // DO NOTHING
          _this.query({page:1});
      }, function () {
          // DO NOTHING
      });
    };
    
    _this.edit = function (id) {
      $state.go('editBusinessUnit', {id:id});
    };


    // Mixin BaseController
    angular.extend(this, baseCtrl);

    $scope.openCreateModal  = _this.openCreateModal;
    $scope.edit  = _this.edit;

    // query the service for records
    _this.query({page:1});

  }
})();
