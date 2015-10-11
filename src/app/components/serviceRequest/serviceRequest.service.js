(function() {
  'use strict';

  angular
    .module('insight')
    .factory('ServiceRequest', ServiceRequest)
    .factory('RequestUtils', RequestUtils);

    /** @ngInject */
    function ServiceRequest($q, $http, APP_CONSTANTS, AppStorage, Logger) {
        
        var defaultMethod  = 'GET';
        var service = {
            create: create,
            execute: execute,
        };

        return service;

        /**
        * Creates a request object for an ajax call ($http)
        * @param {object} options
        * @returns an object containing the request attributes
        */
        function create (options) {

          // Options must exist and it should contain the url attribute
          if(!options) {
            throw new Error(' empty options sent to ServiceRequest.create method');
          }

          // check that the options has URL
          if(!options.url) {
            throw new Error(' No url found in the option sent to ServiceRequest.create method');
          }

          var method =  options.method || defaultMethod,
              headers = options.headers || getDefaultHeader();

          var req = {
            method: method,
            url : options.url,
            headers: headers
          };

          // Add the data if available
          if(options.data) {
            req.data = options.data;
          }
          return req;
        }

        /**
        * executes a http request based in the options passed in
        * uses create  method to create the request
        * @param {object} options
        * @returns a promise which will resolves into the http response
        */
        function execute (options) {
            var deferred = $q.defer(),
            req = service.create(options);

            $http(req).then(
                function(payload) {
                    deferred.resolve(payload.data);
                }, 
                function(reason) {
                    Logger.error(reason, 'error executing ' + JSON.stringify(req));
                    deferred.reject(reason);
                });

            return deferred.promise;
        }

        /**
        * A helper method to generate a default header
        */
        function getDefaultHeader() {
            return {'Authorization': APP_CONSTANTS.STRATAGIES.BEARER + ' ' + AppStorage.getJwtToken()};
        }
    }

    /** @ngInject */
    function RequestUtils () {
      var service = {
        createQueryString : createQueryString
      };

      return service;

      function createQueryString ( queryCriteria ) {
        
        var retCriteria = [];
        
        if(queryCriteria.q) {
          retCriteria.push('q=' + queryCriteria.q);
        }
        
        if(queryCriteria.limit) {
          retCriteria.push('limit=' + queryCriteria.limit);
        }
        
        if(queryCriteria.page) {
          retCriteria.push('page=' + queryCriteria.page);
        }
        
        if(queryCriteria.order) {
          retCriteria.push('order=' + queryCriteria.order);
        }
        
        if(queryCriteria.orderBy) {
          retCriteria.push('orderBy=' + queryCriteria.orderBy);
        }
        
        if(queryCriteria.joinCondition) {
          retCriteria.push('joinCondition=' + queryCriteria.joinCondition);
        }
        
        return retCriteria.join('&');
      };

    }

})();