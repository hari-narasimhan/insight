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
          items: '='
      },
      controller: FocusAreasController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function FocusAreasController($scope) {
      var vm = this;
    }
  }

})();
