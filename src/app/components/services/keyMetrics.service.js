(function() {
  'use strict';

  angular
    .module('insight')
    .factory('KeyMetrics', KeyMetrics)
    .factory('KeyMetricsProduction', KeyMetricsProduction);
  
  /** @ngInject */
  function KeyMetricsProduction ( ServiceRequest, RequestUtils, BASE_URL ) {
    
    var service = {
      query: query,
      bulkUpdate: bulkUpdate,
      create: create,
      update: update
    };

    var serviceUrl = BASE_URL + '/keyMetrics';
    var bulkServiceUrl = BASE_URL + '/keyMetrices';
    return service;

    function query (queryCriteria) {
      return ServiceRequest.execute({
        url: serviceUrl + '?' + RequestUtils.createQueryCriteria(queryCriteria)
      });
    }

    function create (entity) {
      return ServiceRequest.execute({
        method: 'POST',
        url: serviceUrl,
        data: entity
      });
    }

    function update (id, entity) {
      return ServiceRequest.execute({
        method: 'PUT',
        url: serviceUrl + '/' + id,
        data: entity
      });
    }

    function bulkUpdate (entities) {
      return ServiceRequest.execute({
        method: 'PUT',
        url: bulkServiceUrl,
        data: entities
      });
    }
  }


  /** @ngInject */
  function KeyMetrics(ServiceResolver, APP_CONSTANTS) {
    return ServiceResolver.resolve(APP_CONSTANTS.SERVICES.KeyMetrics);
  }
})();
