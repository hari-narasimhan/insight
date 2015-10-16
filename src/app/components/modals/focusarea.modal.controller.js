(function() {
  'use strict';

  angular
    .module('insight')
    .controller('FocusAreaModalController', FocusAreaModalController);

  /** @ngInject */
  function FocusAreaModalController ( $scope, $modalInstance, Users) {
    
    var _this = this;

    _this.focusArea = {staff: undefined, activity: undefined, areas: []};
    
    _this.ok = function () {
      $modalInstance.close(_this.focusArea);
    };

    _this.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

    _this.refreshSalesPerson = function ( staff ) {
      return Users.query({q:{name:staff}})
        .then(function (response) {
          return response.data.map(function(item){
            return item;
          });
        });
    };

    $scope.focusArea = _this.focusArea;
    $scope.refreshSalesPerson = _this.refreshSalesPerson;
    $scope.ok = _this.ok;
    $scope.cancel = _this.cancel;

  }
})();
