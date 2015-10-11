(function() {
  'use strict';

  angular
    .module('insight')
    .factory('Cache', Cache);

    /** @ngInject */
    function Cache ($q, $cacheFactory, APP_CONSTANTS, Products, BusinessUnits) {

        var appCache = $cacheFactory(APP_CONSTANTS.APP_CACHE);
        var CACHE_PRODUCTS = 'products';
        var CACHE_BUSINESS_UNITS = 'BusinessUnits';
        var service = {
            getProducts : getProducts,
            getBusinessUnits: getBusinessUnits
        };

        return service;


        function getProducts () {
            var deferred = $q.defer();
            var products  = appCache.get(CACHE_PRODUCTS);
            
            if(products) {
                deferred.resolve(products);
            } else {
                Products.query({}).then (
                    function ( response ){
                        // Set the cache
                        appCache.put(CACHE_PRODUCTS, response.data);
                        deferred.resolve (appCache.get(CACHE_PRODUCTS));
                    },
                    function ( error ) {
                        deferred.reject(error);
                    }
                )
            }

            return deferred.promise;
        }

        function getBusinessUnits () {

            var deferred = $q.defer();
            var businessUnits  = appCache.get(CACHE_BUSINESS_UNITS);
            
            if(businessUnits) {
                deferred.resolve(businessUnits);
            } else {
                BusinessUnits.query({}).then (
                    function ( response ){
                        // Set the cache
                        appCache.put(CACHE_BUSINESS_UNITS, response.data);
                        deferred.resolve (appCache.get(CACHE_BUSINESS_UNITS));
                    },
                    function ( error ) {
                        deferred.reject(error);
                    }
                )
            }

            return deferred.promise;
        }
    }

})();