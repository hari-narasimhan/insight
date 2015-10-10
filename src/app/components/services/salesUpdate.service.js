(function() {
  'use strict';

  angular
    .module('insight')
    .factory('SalesUpdate', SalesUpdate)
    .factory('SalesUpdateProduction', SalesUpdateProduction);
  
  /** @ngInject */
  function SalesUpdateProduction($log, $http, $auth, $q) {
    
    var service = {
      query: query,
      get: get,
      create: create,
      update: update,
      remove: remove
    };

    return service;

    function query (queryCriteria) {
      // TODO implement
    }

    function get (id) {
      // TODO implement
    }

    function create (entity) {
      // TODO implement
    }

    function update (id, entity) {
      //  TODO implement
    }

    function remove (id) {
      // TODO implement
    }
  }


  /** @ngInject */
  function SalesUpdate(ServiceResolver, APP_CONSTANTS) {
    return ServiceResolver.resolve(APP_CONSTANTS.SERVICES.SalesUpdate);
  }
})();
