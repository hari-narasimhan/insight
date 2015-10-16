(function() {
  'use strict';

  angular
    .module('insight')
    .controller('MarketingUpdatesController', MarketingUpdatesController);

  /** @ngInject */
  function MarketingUpdatesController ( $scope, $state, $controller, $modal, MarketingUpdates ) {
    
    var _this = this;
    var baseCtrl = $controller('BaseController', {$scope:$scope, service: MarketingUpdates});
    

    _this.openCreateModal = function (size) {
      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'app/marketingUpdates/create.modal.html',
        controller : 'NewMarketingUpdateModalController',
        size: size
      });
      
      modalInstance.result.then(function (id) {
        _this.edit(id);
      }, function () {
          // DO NOTHING
      });
    };
    
    _this.edit = function (id) {
      $state.go('editMarketingUpdate', {id:id});
    };

    // Mixin BaseController
    angular.extend(this, baseCtrl);

    $scope.openCreateModal          = _this.openCreateModal;
    $scope.edit    = _this.edit;
    
    // query the service for records
    _this.query({page:1});
  }
})();
