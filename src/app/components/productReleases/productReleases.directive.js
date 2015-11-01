(function() {
  'use strict';

  angular
    .module('insight')
    .directive('productReleases', productReleases);

  /** @ngInject */
  function productReleases() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/productReleases/productReleases.html',
      scope: {
          items: '=',
          options: '=',
          onDelete: '&',
          onAdd: '&',
          onEdit: '&'
      },
      controller: ProductReleasesController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function ProductReleasesController($scope, $modal) {
      var vm = this;

      var openReleaseModal = function (size, options, index, release) {
        var modalInstance = $modal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'app/components/modals/release.modal.html',
          controller : 'ReleaseModalController',
            resolve : {
              options : function () {return options;},
              release : function () {return release;}
            }, 
          size: size
        });
        
          modalInstance.result.then(function (response) {
            if(options.edit) {
              vm.onEdit({index:index, release: response});
            } else {
              vm.onAdd({release:response});
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

      vm.edit = function(index, release) {
        openReleaseModal('lg', {edit:true}, index, release);
      };

      vm.add = function() {
        openReleaseModal('lg', {add:true}); 
      };
    }
  }

})();
