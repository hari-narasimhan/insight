(function() {
  'use strict';

  angular
    .module('insight')
    .controller('NavController', NavController);

  /** @ngInject */
  function NavController ( $scope, $state, $rootScope, APP_CONSTANTS, toastr ) {
    $rootScope.$on( APP_CONSTANTS.SERVER_ERRORS.NOT_AUTHENTICATED, function(){
      $state.go('login');
    });
  }
})();
