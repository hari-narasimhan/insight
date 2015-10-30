(function() {
  'use strict';

  angular
    .module('insight')
    .directive('focusAreas', focusAreas);

  /** @ngInject */
  function focusAreas() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/focusAreas/focusAreas.html',
      scope: {
          items: '=',
          options: '=',
          onDelete: '&',
          onAdd: '&',
          onEdit: '&'
      },
      controller: FocusAreasController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function FocusAreasController($scope, $modal) {
      var vm = this;


      var openFocusAreaModal = function (size, options, index, focusArea) {
        var modalInstance = $modal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'app/components/modals/focusarea.modal.html',
          controller : 'FocusAreaModalController',
          size: size,
          resolve : {
            options : function () {return options;},
            focusArea : function () {return focusArea;}
          }
        });
      
        modalInstance.result.then(function (response) {
          if(options.edit) {
            vm.onEdit({index:index, focusArea: response});
          } else {
            vm.onAdd({focusArea:response});
          }
        }, function () {
            // DO NOTHING
        });
      };

      vm.canDelete = function() {
        return vm.options && vm.options.delete;
      };

      vm.canEdit = function() {
        return vm.options && vm.options.edit;
      }

      vm.edit = function(index, focusArea) {
        openFocusAreaModal('lg', {edit:true}, index, focusArea);
      }

      vm.add = function() {
        openFocusAreaModal('lg', {add:true}); 
      }
    }
  }

})();
