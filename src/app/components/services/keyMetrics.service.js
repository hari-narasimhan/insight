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
      bulkUpdate: bulkUpdate
    };

    var serviceUrl = BASE_URL + '/keyMetrics';
    return service;

    function query (queryCriteria) {
      return ServiceRequest.execute({
        url: serviceUrl + '?' + RequestUtils.createQueryCriteria(queryCriteria)
      });
    }

    function bulkUpdate (entities) {
      return ServiceRequest.execute({
        method: 'PUT',
        url: serviceUrl,
        data: entities
      });
    }
  }


  /** @ngInject */
  function KeyMetrics(ServiceResolver, APP_CONSTANTS) {
    return ServiceResolver.resolve(APP_CONSTANTS.SERVICES.KeyMetrics);
  }
})();
