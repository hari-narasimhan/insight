(function() {
  'use strict';

  angular
    .module('insight')
    .controller('ProductsController', ProductsController);

  /** @ngInject */
  function ProductsController ( $scope, $state, $controller, $modal, Products ) {
    
    var _this = this;
    var baseCtrl = $controller('BaseController', {$scope:$scope, service: Products, editRoute:'editProduct', modalTitle:'CREATE_PRODUCT'});

    _this.openCreateModal = function (size) {
      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'app/products/create.modal.html',
        controller : 'NewProductModalController',
        size: size
      });
      
      modalInstance.result.then(function (product) {
          
          Products.create(product)
            .then (function(response) {
              _this.query({page:1, query:{}});              
            });
      });
    };
    
    _this.edit = function (id) {
      $state.go('editProduct', {id:id});
    };


    // Mixin BaseController
    angular.extend(this, baseCtrl);

    $scope.openCreateModal  = _this.openCreateModal;
    $scope.edit  = _this.edit;

    // query the service for records
    _this.query({page:1, query:{}});


  }
})();
