(function() {
  'use strict';

  angular
    .module('insight')
    .factory('Logger', Logger);

    /** @ngInject */
    function Logger ($log, ENVIRONMENT) {

        var service = {
            info : info,
            error: error
        };

        return service;


        function info (data, msg) {
            msg = msg || 'Success';
            $log.info('[ENVIRONMENT ' + ENVIRONMENT + '] ' + msg + ' [ ' + angular.toJson(data) + ' ]');
        }

        function error (err, msg) {
            msg = msg || 'Error ';
            $log.error('[ENVIRONMENT ' + ENVIRONMENT + '] ' + msg + ' [ ' + angular.toJson(err.data || err) + ' ]');
        }

    }

})();