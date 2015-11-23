(function() {
  'use strict';

  angular
    .module('insight')
    .controller('ActivityModalController', ActivityModalController);

  /** @ngInject */
  function ActivityModalController ( $scope, $modalInstance, Users, options, activity ) {
    
    var _this = this;
    
    _this.isEditMode = function () {
      return _.has(options, 'edit') && options.edit === true;
    };

    _this.ok = function () {
      $modalInstance.close(_this.getActivity());
    };

    _this.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
    
    _this.refreshStaff = function(staff) {
        Users.query({query:{fullname: '~' + staff}})
        .then(function(response){
          $scope.staffs = response;
        });
    };

    _this.getActivity = function () {
        return {staff: _this.activity.staff.selected.fullname, 
        activity: _this.activity.activity};
    };


    _this.activity = { staff: {}, 
                       activity: undefined
                     };
  
    _this.title = 'ADD_ACTIVITY';

    if(_this.isEditMode()) {
      _this.title = 'EDIT_ACTIVITY';
      // Make a copy
      _this.activity.staff.selected = {fullname: activity.staff};
      _this.activity.activity = activity.activity;
    }
    _this.originalActivity = activity;

    $scope.title          = _this.title;
    $scope.activity       = _this.activity;
    $scope.refreshStaff   = _this.refreshStaff;
    $scope.ok             = _this.ok;
    $scope.cancel         = _this.cancel;

  }
})();
