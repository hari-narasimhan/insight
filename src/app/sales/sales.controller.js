(function() {
  'use strict';

  angular
    .module('insight')
    .controller('SalesController', SalesController);

  /** @ngInject */
  function SalesController($scope, SalesUpdate) {
    var vm = this;
    $scope.salesUpdates = SalesUpdate.query({});
  }
})();
