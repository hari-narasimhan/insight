(function() {
  'use strict';

  angular
    .module('insight')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
