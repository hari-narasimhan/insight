(function() {
  'use strict';

  angular
    .module('insight')
    .directive('activities', activities);

  /** @ngInject */
  function activities() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/activities/activities.html',
      scope: {
          items: '=',
          options: '=',
          onDelete: '&',
          onAdd: '&',
          onEdit: '&'
      },
      controller: ActivitiesController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function ActivitiesController($scope, $modal) {
      var vm = this;

      var openActivityModal = function (size, options, index, activity) {
        var modalInstance = $modal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'app/components/modals/activity.modal.html',
          controller : 'ActivityModalController',
            resolve : {
              options : function () {return options;},
              activity : function () {return activity;}
            }, 
          size: size
        });
        
          modalInstance.result.then(function (response) {
            if(options.edit) {
              vm.onEdit({index:index, activity: response});
            } else {
              vm.onAdd({activity:response});
            }
          }, function () {
              // DO NOTHING
          });
      };

      vm.canAdd = function () {
        return vm.options && vm.options.add;
      };

      vm.canDelete = function() {
        return vm.options && vm.options.delete;
      };

      vm.canEdit = function() {
        return vm.options && vm.options.edit;
      };

      vm.edit = function(index, activity) {
        openActivityModal('lg', {edit:true}, index, activity);
      };

      vm.add = function() {
        openActivityModal('lg', {add:true}); 
      };
    }
  }

})();
