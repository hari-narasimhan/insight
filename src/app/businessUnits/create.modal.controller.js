(function() {
  'use strict';

  angular
    .module('insight')
    .controller('NewBusinessUnitModalController', NewBusinessUnitModalController);

  /** @ngInject */
  function NewBusinessUnitModalController ( $scope, $modalInstance, BusinessUnits) {
    
    var _this = this;
    _this.createdId = undefined;

 
    _this.ok = function () {

        BusinessUnits.create($scope.newBusinessUnit).then(
            function(response) {
                $modalInstance.close(response.id);
            },
            function (error) {
                // TODO Handle the error gracefully
            }
        );

    };

    _this.cancel = function () {
      $modalInstance.dismiss('cancel');
    };


    $scope.ok = _this.ok;
    $scope.cancel = _this.cancel;
    
    $scope.newBusinessUnit = {
        name: undefined,
        description: undefined
    };
  }
})();
