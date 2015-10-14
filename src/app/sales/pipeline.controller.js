(function() {
  'use strict';

  angular
    .module('insight')
    .controller('PipelineController', PipelineController);

  /** @ngInject */
  function PipelineController ( $scope, $modalInstance, Users, Products ) {
    
    var _this = this;
    
    _this.pipeline = { salesPerson: undefined, 
                             product: undefined, 
                             expectedRevenue: 0.0, 
                             remarks: undefined,
                             targetDate: undefined };
    
    _this.ok = function () {
      $modalInstance.close(_this.pipeline);
    };

    _this.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
    
    _this.refreshSalesPerson = function ( salesPerson ) {
      return Users.query({q:{name:salesPerson}})
        .then(function (response) {
          return response.data.map(function(item){
            return item;
          });
        });
    };

    _this.refreshProduct = function ( product ) {
      return Products.query({q:{name:product}})
        .then(function (response) {
          return response.data.map(function(item){
            return item;
          });
        });
    };

    // DATE CONTROL RELATED
    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    $scope.status = {
        opened: false
    };
    
    $scope.toggleMin = function() {
        $scope.minDate = $scope.minDate ? null : new Date();
    };
  
    $scope.toggleMin();
    $scope.maxDate = new Date(2020, 5, 22);

    $scope.open = function($event) {
        $scope.status.opened = true;
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[1];

  
    // END DATE CONTROL RELATED
    
    $scope.pipeline           = _this.pipeline;
    $scope.refreshSalesPerson = _this.refreshSalesPerson;
    $scope.refreshProduct     = _this.refreshProduct;
    $scope.ok                 = _this.ok;
    $scope.cancel             = _this.cancel;

  }
})();
