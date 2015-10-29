(function() {
  'use strict';

  angular
    .module('insight')
    .controller('CreateUpdateModalController', CreateUpdateModalController);

  /** @ngInject */
  function CreateUpdateModalController ( $scope, $modalInstance, APP_CONSTANTS, Common, BusinessUnits, title) {
    
    var _this = this;
    
    $scope.title = title;
    
    _this.ok = function () {

        // Check if we have a valid business id
        if(!_.has($scope.update, 'businessUnit.selected._id')) {
            $scope.createUpdateForm.businessUnit.$setValidity('validity', false);
            return;
        }

        $modalInstance.close($scope.update);
    };

    _this.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
    
    // Business Unit picker
    $scope.refreshBusinessUnits = function(businessUnit) {
        BusinessUnits.query({query:{name: '~' + businessUnit}})
        .then(function(response){
          $scope.businessUnits = response;
        });
    };

    $scope.ok = _this.ok;
    $scope.cancel = _this.cancel;
    
    var year = Common.getCurrentYear();
    var month = Common.getCurrentMonth();

    $scope.update = {
        businessUnit: {},
        year: year,
        month : month
    };

    // Select Year
    $scope.years = [year - 1, year, year + 1];
    $scope.months = APP_CONSTANTS.MONTHS;
  }
})();
