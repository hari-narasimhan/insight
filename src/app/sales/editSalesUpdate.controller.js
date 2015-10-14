(function() {
  'use strict';

  angular
    .module('insight')
    .controller('EditSalesUpdateControllerOLD', EditSalesUpdateController);

  /** @ngInject */
  function EditSalesUpdateController ( $scope, $stateParams, Users) {
    
    var _this = this;

    console.log($stateParams);

  }
})();
