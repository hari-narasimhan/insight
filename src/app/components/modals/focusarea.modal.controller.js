(function() {
  'use strict';

  angular
    .module('insight')
    .controller('FocusAreaModalController', FocusAreaModalController);

  /** @ngInject */
  function FocusAreaModalController ( $scope, $modalInstance, Users, options, focusArea) {
    
    var _this = this;

    _this.isEditMode = function () {
      return _.has(options, 'edit') && options.edit === true;
    }    
    
    _this.ok = function () {
      $modalInstance.close(_this.getFocusArea());
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

    _this.getFocusArea = function () {
        return {
          staff: _this.focusArea.staff.selected.fullname, 
          activityHtml: _this.focusArea.activityHtml, 
          areas: _this.focusArea.areas
        };
    };

    _this.focusArea = {staff: {}, activityHtml: undefined, areas: []};

    _this.title = 'ADD_FOCUS_AREA';

    if(_this.isEditMode()) {
      _this.title = 'EDIT_FOCUS_AREA';
      // Make a copy
      _this.focusArea.staff.selected = {fullname: focusArea.staff};
      _this.focusArea.activityHtml = focusArea.activityHtml;
      _this.focusArea.areas = focusArea.areas;
    }
    _this.originalFocusArea = focusArea;


    $scope.title = _this.title;
    $scope.focusArea = _this.focusArea;
    $scope.refreshStaff = _this.refreshStaff;
    $scope.ok = _this.ok;
    $scope.cancel = _this.cancel;

  }
})();
