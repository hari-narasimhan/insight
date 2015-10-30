(function() {
  'use strict';

  angular
    .module('insight')
    .controller('BaseEditController', BaseEditController);

  /**
  * This is the base controller for all EDIT operations
  * the base controller will use the injected service
  * to properly query and paginate the date. 
  * The BaseEdit Controller will be mixed-in into edit controllers through angular.extend
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
  function BaseEditController ( $scope, $state, $translate, service, toastr, listRoute ) {
    
    var _this = this;


    /*Scope Level data and methods */

    $translate('CONFIRM_DELETE').then(function(val){
      $scope.confirmDelete = val || 'DELETE?';
    });


    $translate('SALES_UPDATE_UPDATED_SUCCESSFULLY').then(function(val){
      $scope.successMessage = val || 'SUCCESS';
    });
      
    $translate('ERROR_UPDATING_SALES_UPDATE').then(function(val){
        $scope.errorMessage = val || 'ERROR';
    });


    $scope.save = function() {
      service.update(id, $scope.update)
        .then (
          function(response) {
              toastr.info('UPDATED', $scope.successMessage);
              $state.go('salesUpdates');
          }        
        );
    };

    $scope.cancel = function() {
      $state.go(listRoute);
    };

    $scope.hasChanged = function() {
      // Need to use angular.toJson  to avoid $$hashkey
      return ($scope.originalData !== angular.toJson($scope.update));

    };

    $scope.reset = function () {
      $scope.update = JSON.parse($scope.originalData);
    };

    $scope.get = function(id) {
      service.get(id)
          .then(
              function(response){
                  $scope.originalData = JSON.stringify(response);
                  $scope.update = response;
              }
      );
    }
  }
})();
