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
  function BaseController ( $scope, service ) {
    
    var _this = this;

    $scope.items = [];
    $scope.totalItems = 0;
    $scope.itemsPerPage = 10;

    $scope.pagination = {
      current: 1
    };

    $scope.pageChanged = function (newPage) {
      _this.query({page:newPage});
    };

    // query instance method
    this.query = function ( options ) {
      
        service.query(options).then( function ( response ) {
            $scope.items = response;
            if(response.cursor) {
              $scope.totalItems =   response.cursor.totalRecords || 0 ;
            }
        }, function ( error ) {
            // TODO handle error
        });      
    };
  }
})();
