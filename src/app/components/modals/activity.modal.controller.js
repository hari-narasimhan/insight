(function() {
  'use strict';

  angular
    .module('insight')
    .controller('ActivityModalController', ActivityModalController);

  /** @ngInject */
  function ActivityModalController ( $scope, $modalInstance, Users ) {
    
    var _this = this;
    
    _this.activity = { staff: undefined, 
                       activity: undefined
                     };
    
    _this.ok = function () {
      $modalInstance.close(_this.activity);
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

    $scope.activity       = _this.activity;
    $scope.refreshStaff   = _this.refreshStaff;
    $scope.ok             = _this.ok;
    $scope.cancel         = _this.cancel;

  }
})();
