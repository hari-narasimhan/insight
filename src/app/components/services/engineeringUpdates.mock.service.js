(function() {
  'use strict';

  angular
  .module('insight')
  .factory('EngineeringUpdatesMock', EngineeringUpdatesMock);

  /** @ngInject */
  function EngineeringUpdatesMock(ServiceRequest, BASE_DEV_URL) {
    
    var service = {
      query: query,
      get: get,
      create: create,
      update: update,
      remove: remove
    };

    // Setup the service name
    var serviceName = 'EngineeringUpdates';

    return service;

    function query (queryCriteria) {
      return ServiceRequest.execute({
        url: BASE_DEV_URL + '/mockdata/query' + serviceName + '.json'
      });
    }

    function get (id) {
      return ServiceRequest.execute({
        url: BASE_DEV_URL + '/mockdata/get' + serviceName + '.json'
      });
    }

    function create (entity) {
      return ServiceRequest.execute({
        url: BASE_DEV_URL + '/mockdata/create' + serviceName + '.json'
      });
    }

    function update (id, entity) {
      return ServiceRequest.execute({
        url: BASE_DEV_URL + '/mockdata/update' + serviceName + '.json'
      });
    }

    function remove (id) {
      return ServiceRequest.execute({
        url: BASE_DEV_URL + '/mockdata/delete' + serviceName + '.json'
      });
    }
  }

})();