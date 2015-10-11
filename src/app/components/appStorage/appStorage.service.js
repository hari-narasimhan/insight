(function() {
    'use strict';

    angular.module('insight')
        .factory('AppStorage', AppStorage);

    /** @ngInject */
    function AppStorage(store, APP_CONSTANTS) {

        var service = {
            getJwtToken: getJwtToken,
            storeJwtToken: storeJwtToken,
            getConfiguration: getConfiguration,
            storeConfiguration: storeConfiguration,
            storeUserProfile: storeUserProfile,
            getUserProfile: getUserProfile,
            getBusinessUnits: getBusinessUnits,
            storeBusinessUnits: storeBusinessUnits,
            getProducts: getProducts,
            storeProducts: storeProducts,
            clear: clear,
            token: ''
        };


        return service;

        // Get a JWT TOKEN
        function getJwtToken() {
            return service.token ?  service.token : store.get(APP_CONSTANTS.JWT_TOKEN_KEY);
        }

        // Store a JWT Token
        function storeJwtToken(token, rememberMe) {
            if(rememberMe) {
                store.set(APP_CONSTANTS.JWT_TOKEN_KEY, token);
            } else {
                service.token = token;
            }
        }

        // Get appliation configuration
        function getConfiguration () {
            return store.get(APP_CONSTANTS.APP_CONFIG_KEY);
        }

        // Store application configuration
        function storeConfiguration (configuration) {
            store.set(APP_CONSTANTS.APP_CONFIG_KEY, configuration);
        }

        // Get User Profile
        function getUserProfile () {
            return store.get(APP_CONSTANTS.USER_PROFILE_KEY);
        }

        // Store user Profile
        function storeUserProfile (profile) {
            store.set(APP_CONSTANTS.USER_PROFILE_KEY, profile);
        }

        // Get Products
        function getProducts () {
            return store.get(APP_CONSTANTS.APP_PRODUCTS_CACHE_KEY);
        }

        // Store Products
        function storeProducts (products) {
            store.set(APP_CONSTANTS.APP_PRODUCTS_CACHE_KEY, products);
        }

        // Get Business Units
        function getBusinessUnits () {
            return store.get(APP_CONSTANTS.APP_BUSINESS_UNITS_CACHE_KEY);
        }

        // Store Business Units
        function storeBusinessUnits (businessUnits) {
            store.set(APP_CONSTANTS.APP_BUSINESS_UNITS_CACHE_KEY, businessUnits);
        }
        
        // Clear stored items
        function clear () {
            store.remove(APP_CONSTANTS.JWT_TOKEN_KEY);
            store.remove(APP_CONSTANTS.APP_CONFIG_KEY);
            store.remove(APP_CONSTANTS.USER_PROFILE_KEY);
            service.token = '';
        }
    }
})();