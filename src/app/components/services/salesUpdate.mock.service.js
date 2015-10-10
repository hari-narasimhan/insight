(function() {
  'use strict';

  angular
  .module('insight')
  .factory('SalesUpdateMock', SalesUpdateMock);

  /** @ngInject */
  function SalesUpdateMock($q) {
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
      var ret = [];
      var chance = new Chance();

      for (var i=0; i < 10; i++) {
        ret.push({
          id: chance.guid(),
          businessUnit: chance.pick(['Health Care', 'Media', 'Retail']),
          product: chance.word(),
          monthYear: 'Oct, 2015',
          percentComplete: chance.integer({min:0, max:100}),
          lastUpdated: 'a month ago'
        });
      } 
      return ret;
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

})();