(function() {
  'use strict';

  angular
    .module('insight')
    .controller('BaseController', BaseController);

  /**
  * This is the base controller for all CRUD operations
  * the base controller will use the injected service
  * to properly query and paginate the date. 
  * The BaseController will be mixed-in into controllers through angular.extend
  *
  * 
  * Example : Mixin - Base controller functionality to aother controller
  * function UserController ($scope, UserService) {
  *   var _this = this;
  *   angular.extend(this, new BaseController($scope, UserService))
  *   ......
  * }
  */

  /** @ngInject */
  function BaseController ( $scope, $state, $modal, service, editRoute, modalTitle, Common) {
    
    var _this = this;

    $scope.items = [];
    $scope.totalItems = 0;
    $scope.itemsPerPage = 10;
    $scope.pagination = {
      current: 1
    };

    this.getQuery = function (search) {
      var ret = {query:{}};
      
      if(_.has(search, 'businessUnit._id')) {
        ret.query.businessUnitId = search.businessUnit._id;
      }

      if(_.has(search, 'year')) {
        ret.query.year = search.year;
      }

      if(_.has(search, 'month')) {
        ret.query.month = search.month;
      }

      return ret;
    };

    // query instance method
    this.query = function ( options ) {
        if(!_.has(options, 'query')){
          options.query = {year: Common.getCurrentYear(), month: Common.getCurrentMonth()};
        }
        service.query(options).then( function ( response ) {
            $scope.items = response;
            if(response.cursor) {
              $scope.totalItems =   response.cursor.totalRecords || 0 ;
            }
        }, function ( error ) {
            // TODO handle error
        });      
    };

    /*Scope Level data and methods */

    $scope.template = {url: 'app/components/templates/updateList.html'};

    $scope.pageChanged = function (newPage) {
      _this.query({page:newPage});
    };

    $scope.searchChanged = function (search) {
      _this.query(_this.getQuery(search));
    };

    $scope.edit = function (id) {
      $state.go(editRoute, {id:id});
    };

    $scope.openCreateModal = function (size) {
      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'app/components/modals/createUpdate.modal.html',
        controller : 'CreateUpdateModalController',
        resolve: {title : function(){
          return modalTitle;
        }},
        size: size
      });
      
      modalInstance.result.then(function (updateCriteria) {
        console.log(updateCriteria);

        service.create({
          businessUnit: updateCriteria.businessUnit.selected.name,
          businessUnitId: updateCriteria.businessUnit.selected._id,
          year: updateCriteria.year,
          month: updateCriteria.month
        }).then(function(response){
          $scope.edit(response._id);
        });

      }, function () {
          // DO NOTHING
      });
    };

  }
})();
