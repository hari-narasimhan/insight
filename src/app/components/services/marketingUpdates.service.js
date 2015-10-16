(function() {
  'use strict';

  angular
    .module('insight')
    .factory('MarketingUpdates', MarketingUpdates)
    .factory('MarketingUpdatesProduction', MarketingUpdatesProduction);
  
  /** @ngInject */
  function MarketingUpdatesProduction ( ServiceRequest, RequestUtils, BASE_URL ) {
    
    var service = {
      query: query,
      get: get,
      create: create,
      update: update,
      remove: remove
    };

    var serviceUrl = BASE_URL + '/marketingUpdates';
    return service;

    function query (queryCriteria) {
      return ServiceRequest.execute({
        url: serviceUrl + '?' + RequestUtils.createQueryCriteria(queryCriteria)
      });
    }

    function get (id) {
      return ServiceRequest.execute({
        url: serviceUrl + '/' + id
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
        url: serviceUrl,
        data: entity
      });
    }

    function remove (id) {
      return ServiceRequest.execute({
        method: 'DELETE',
        url: serviceUrl + '/' + id
      });
    }
  }


  /** @ngInject */
  function MarketingUpdates ( ServiceResolver, APP_CONSTANTS ) {
    return ServiceResolver.resolve(APP_CONSTANTS.SERVICES.MarketingUpdates);
  }
})();
