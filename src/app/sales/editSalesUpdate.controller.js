(function() {
  'use strict';

  angular
    .module('insight')
    .controller('EditSalesUpdateController', EditSalesUpdateController);

  /** @ngInject */
  function EditSalesUpdateController ( $scope, $stateParams, Users) {
    
    var _this = this;

    console.log($stateParams);

  }
})();
