(function() {
  'use strict';

  angular
    .module('insight')
    .controller('NewOpportunityController', NewOpportunityController);

  /** @ngInject */
  function NewOpportunityController ( $scope, $modalInstance, Users, Products, PROSPECT_STATUS) {
    
    var _this = this;
    
    _this.status = PROSPECT_STATUS;
    
    _this.newOpportunity = { salesPerson: undefined, 
                             product: undefined, 
                             prospect: undefined, 
                             status: undefined,
                             potential: 0.0,
                             targetDate: undefined };
    
    _this.ok = function () {
      $modalInstance.close(_this.newOpportunity);
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
    
    $scope.newOpportunity = _this.newOpportunity;
    $scope.refreshSalesPerson = _this.refreshSalesPerson;
    $scope.refreshProduct = _this.refreshProduct;
    $scope.status = _this.status;
    $scope.ok = _this.ok;
    $scope.cancel = _this.cancel;

  }
})();
