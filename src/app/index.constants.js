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
    .constant('_', window._)
    .constant('PROSPECT_STATUS', ['HOT', 'WARM', 'COLD'])
    .constant('ENGINEERING_STATUS', ['IN-PROGRESS', 'COMPLETED', 'DELAYED', 'ON-HOLD'])
    .constant('DEFAULT_ENVIRONMENTS',    {
        DEV: 'DEV',
        PRODUCTION: 'PRODUCTION',
        STAGING: 'STAGING'
    })
    .constant('APP_CONSTANTS', {
        EDIT_MONTHS_BEFORE : 2,
        KEY_PARAM_MONTHS_RANGE: 6,
        SERVICES: {
            Auth: 'Auth',
            SalesUpdates: 'SalesUpdates',
            MarketingUpdates: 'MarketingUpdates',
            EngineeringUpdates: 'EngineeringUpdates',
            KeyMetricsUpdates: 'KeyMetricsUpdates',
            BusinessUnits: 'BusinessUnits',
            Products: 'Products',
            Users: 'Users',
            Opportunities: 'Opportunities',
            Initiatives: 'Initiatives',
            KeyMetrics: 'KeyMetrics',
            Dashboard: 'Dashboard'
        },
        APP_CACHE: 'q4.insight.app.cache',
        JWT_TOKEN_KEY: 'q4.insight.app.auth.token',
        APP_CONFIG_KEY: 'q4.insight.app.config',
        USER_PROFILE_KEY: 'q4.insight.app.profile',
        APP_PRODUCTS_CACHE_KEY: 'q4.insight.products.cache',
        APP_BUSINESS_UNITS_CACHE_KEY: 'q4.insight.businessUnits.cache',
        STRATAGIES: {
            BEARER: 'Bearer'
        }
    })
    .constant('AUTH_EVENTS', {
        LOGIN_SUCCESS: 'login-success'
    })
    // Configure the environment to cater here.
    .constant('ENVIRONMENT', 'PRODUCTION')
    .constant('BASE_DEV_URL', "http://localhost:3030")
    // Set BASE_URL value for production
    .constant('BASE_URL', ''); 

})();
