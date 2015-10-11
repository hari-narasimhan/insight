(function() {
  'use strict';

  angular
    .module('insight')
    .controller('SalesController', SalesController);

  /** @ngInject */
  function SalesController ( $scope, $controller, SalesUpdates ) {
    
    var _this = this;
    var baseCtrl = $controller('BaseController', {$scope:$scope, service: SalesUpdates});
    
    // Mixin BaseController
    angular.extend(this, baseCtrl);

    _this.query({page:1});
  }
})();
