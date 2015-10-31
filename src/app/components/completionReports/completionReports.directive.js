(function() {
  'use strict';

  angular
    .module('insight')
    .directive('completionReports', completionReports);

  /** @ngInject */
  function completionReports() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/completionReports/completionReports.html',
      scope: {
          items: '=',
          options: '=',
          onDelete: '&',
          onAdd: '&',
          onEdit: '&'
      },
      controller: CompletionReportsController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function CompletionReportsController($scope, $modal) {
      var vm = this;

      var openReportModal = function (size, options, index, report) {
        var modalInstance = $modal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'app/components/modals/completionReport.modal.html',
          controller : 'CompletionReportModalController',
            resolve : {
              options : function () {return options;},
              report : function () {return report;}
            }, 
          size: size
        });
        
          modalInstance.result.then(function (response) {
            if(options.edit) {
              vm.onEdit({index:index, report: response});
            } else {
              vm.onAdd({report:response});
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
      };

      vm.edit = function(index, report) {
        openReportModal('lg', {edit:true}, index, report);
      };

      vm.add = function() {
        openReportModal('lg', {add:true}); 
      };
    }
  }

})();
