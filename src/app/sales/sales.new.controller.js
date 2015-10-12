(function() {
  'use strict';

  angular
    .module('insight')
    .controller('NewSalesController', NewSalesController);

  /** @ngInject */
  function NewSalesController ( $scope, $state, SalesUpdates ) {
    
    var _this = this;
    
    
    
    _this.createNewRecord = function() {
        // TODO return a proper sales record
        return {};
    };
    
    _this.save = function () {
        
    };
    
    _this.cancel = function () {
        $state.go('sales');
    };
    
    $scope.salesUpdate = _this.createNewRecord();
    $scope.cancel = _this.cancel;
  }
})();
