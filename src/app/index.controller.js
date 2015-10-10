(function() {
  'use strict';

  angular
    .module('insight')
    .controller('NavController', NavController);

  /** @ngInject */
  function NavController($scope) {
    var vm = this;
    $scope.items = [
        "The first choice!",
        "And another choice for you.",
        "but wait! A third!"
    ];
  }
})();
