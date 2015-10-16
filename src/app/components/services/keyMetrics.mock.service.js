(function() {
  'use strict';

  angular
  .module('insight')
  .factory('KeyMetricsMock', KeyMetricsMock);

  /** @ngInject */
  function KeyMetricsMock(ServiceRequest, BASE_DEV_URL) {
    
    var service = {
      query: query,
      bulkUpdate: bulkUpdate
    };

    // Setup the service name
    var serviceName = 'KeyMetrics';

    return service;

    function query (queryCriteria) {
      return ServiceRequest.execute({
        url: BASE_DEV_URL + '/mockdata/query' + serviceName + '.json'
      });
    }

    function bulkUpdate (entitities) {
      return ServiceRequest.execute({
        url: BASE_DEV_URL + '/mockdata/create' + serviceName + '.json'
      });
    }
    
  }

})();