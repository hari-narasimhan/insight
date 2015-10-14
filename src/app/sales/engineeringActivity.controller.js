(function() {
  'use strict';

  angular
    .module('insight')
    .controller('EngineeringActivityController', EngineeringActivityController);

  /** @ngInject */
  function EngineeringActivityController ( $scope, $modalInstance, Users ) {
    
    var _this = this;
    
    _this.engineeringActivity = { salesPerson: undefined, 
                       activity: undefined
                     };
    
    _this.ok = function () {
      $modalInstance.close(_this.engineeringActivity);
    };

    _this.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
    
    _this.refreshSalesPerson = function ( salesPerson ) {
      return Users.query({q:{name:salesPerson}})
        .then(function (response) {
          return response.data.map(function(item){
            return item;
          });
        });
    };

    $scope.engineeringActivity  = _this.engineeringActivity;
    $scope.refreshSalesPerson   = _this.refreshSalesPerson;
    $scope.ok                   = _this.ok;
    $scope.cancel               = _this.cancel;

  }
})();
