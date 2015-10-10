(function() {
  'use strict';

  angular
    .module('insight')
    .factory('ServiceResolver', ServiceResolver);

  /** @ngInject */
  function ServiceResolver ($injector, ENVIRONMENT, DEFAULT_ENVIRONMENTS, APP_CONSTANTS) {
    var service = {
      resolve: resolve
    };

    return service;

    /**
    * Resolves a service name based on the environment, this helps us to inject
    * mock services during development phase
    */
    function resolve (serviceName) {
      if (APP_CONSTANTS.SERVICES[serviceName]) {
        if (ENVIRONMENT === DEFAULT_ENVIRONMENTS.DEV) {
          return $injector.get(getMockName(serviceName));
        } else {
          // For Staging and production use the production name
          return $injector.get(getProductionName(serviceName));
        }
      } else {
        throw new Error ('Invalid service name passed to ServiceResolver, could not resolve ' + serviceName);
      }
    }

    /**
    * Returns the mock service name, appends literal string 'Mock' to the service name
    * passed in as parameter
    */
    function getMockName (serviceName) {
      return serviceName + 'Mock';
    }

    /**
    * Returns the production service name, appends literal string 'Production' to the service name
    * passed in as parameter
    */
    function getProductionName (serviceName) {
      return serviceName + 'Production';
    }
  }
})();