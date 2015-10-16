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
    
    _this.refreshSalesPerson = function ( staff ) {
      return Users.query({q:{name:staff}})
        .then(function (response) {
          return response.data.map(function(item){
            return item;
          });
        });
    };

    $scope.activity  = _this.activity;
    $scope.refreshSalesPerson   = _this.refreshSalesPerson;
    $scope.ok                   = _this.ok;
    $scope.cancel               = _this.cancel;

  }
})();
