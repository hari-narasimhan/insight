(function() {
  'use strict';

  angular
    .module('insight')
    .filter('appDate', appDate);

    /** @ngInject */
    function appDate ($filter) {

        return function(input) {
            if(input === null) {
                return "";
            }
            
            return $filter('date')(input, "dd MMM, yyyy");
        }
    }

})();