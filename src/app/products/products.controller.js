(function() {
  'use strict';

  angular
    .module('insight')
    .controller('ProductsController', ProductsController);

  /** @ngInject */
  function ProductsController ( $scope, $controller, Products, Cache ) {
    
    var _this = this;
    var baseCtrl = $controller ( 'BaseController', {$scope:$scope, service: Products} );


    // Mixin BaseController
    angular.extend(this, baseCtrl);


    // Fetch the data to lookup business units from cache and 
    // call query to populate the screen
    Cache.getBusinessUnits().then ( 
      
      function ( businessUnits ) {
        $scope.businessUnits = businessUnits;
        // fire the query now
        _this.query({page:1});  
      }, 
      function(error){
        console.log(error);
      });

    
    // Set product look up function
    $scope.getBusinessUnitById = function ( buId ) {
      return _.result(_.find($scope.businessUnits, {id: buId}), 'name');
    }
  }
})();
