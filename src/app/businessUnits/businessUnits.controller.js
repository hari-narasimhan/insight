(function() {
  'use strict';

  angular
    .module('insight')
    .controller('BusinessUnitsController', BusinessUnitsController);

  /** @ngInject */
  function BusinessUnitsController ( $scope, $controller, BusinessUnits ) {
    
    var _this = this;
    var baseCtrl = $controller('BaseController', {$scope:$scope, service: BusinessUnits});
    
    // Mixin BaseController
    angular.extend(this, baseCtrl);

    _this.query({page:1});
  }
})();
