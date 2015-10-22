(function() {
  'use strict';

  angular
    .module('insight')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $rootScope, $auth, $window) {

    if ($auth.isAuthenticated()) {
        $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
    }
    $log.debug('runBlock end');
  }

})();
