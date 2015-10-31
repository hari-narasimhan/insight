(function() {
  'use strict';

  angular
    .module('insight')
    .controller('OpportunitiesController', OpportunitiesController);

  /** @ngInject */
  function OpportunitiesController ( $scope, $state, $controller, $modal, Opportunities) {
    
    var _this = this;
    var baseCtrl = $controller('BaseController', {$scope:$scope, service: Opportunities, editRoute: 'editOpportunity', 
          modalTitle: 'CREATE_OPPORTUNITY'});

    _this.openCreateModal = function (size) {
      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'app/opportunities/create.modal.html',
        controller : 'NewOpportunityModalController',
        size: size
      });
      
      modalInstance.result.then(function (opportunity) {
        
        Opportunities.create (opportunity)
          .then(
              function (response) {
                $state.go('opportunities');
              }
          );
      });
    };

    // Mixin BaseController
    angular.extend(this, baseCtrl);

    $scope.openCreateModal  = _this.openCreateModal;

    // query the service for records
    _this.query({page:1});
  }
})();
