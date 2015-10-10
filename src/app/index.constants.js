/*
* All insignt application constants defined here
*/
(function() {
  'use strict';

  angular
    .module('insight')
    .constant('malarkey', malarkey)
    .constant('toastr', toastr)
    .constant('moment', moment)
    .constant('chance', chance)
    .constant('DEFAULT_ENVIRONMENTS',    {
        DEV: 'DEV',
        PRODUCTION: 'PRODUCTION',
        STAGING: 'STAGING'
    })
    .constant('APP_CONSTANTS', {
        SERVICES: {
            Auth: 'Auth',
            SalesUpdate: 'SalesUpdate',
            MarketingUpdate: 'MarketingUpdate',
            EngineeringUpdate: 'EngineeringUpdate',
            KeyMetricsUpdate: 'KeyMetricsUpdate',
            BusinessUnits: 'BusinessUnits',
            Products: 'Products'
        }
    })
    .constant('AUTH_EVENTS', {
        LOGIN_SUCCESS: 'login-success'
    })
    // Configure the environment to cater here.
    .constant('ENVIRONMENT', 'DEV');

})();
