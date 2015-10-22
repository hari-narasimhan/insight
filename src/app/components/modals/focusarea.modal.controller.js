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

    _this.refreshStaff = function ( staff ) {
      return Users.query({query:{fullname: "~" + staff}})
        .then(function (response) {
          return response.map(function(item){
            return item;
          });
        });
    };

    $scope.focusArea = _this.focusArea;
    $scope.refreshStaff = _this.refreshStaff;
    $scope.ok = _this.ok;
    $scope.cancel = _this.cancel;

  }
})();
