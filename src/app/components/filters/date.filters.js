(function() {
  'use strict';

  angular
    .module('insight')
    .filter('appDate', appDate)
    .filter('monthName', monthName)
    .filter('fromNow', fromNow);

    /** @ngInject */
    function appDate ($filter, moment, _) {

        return function(input) {
            if(input === null) {
                return "";
            }
            
            return $filter('date')(input, "dd MMM, yyyy");
        };
    }

    function fromNow ($filter, moment, _) {

        return function(input) {
            if(input === null) {
                return "";
            }
            
            return moment(input).fromNow();
        };
    }

    function monthName($filter) {
        return function (input) {
            if(_.isNull(input) || _.isUndefined(input)) {
                return "";
            }
            return moment.monthsShort(input);
        };
    }

})();