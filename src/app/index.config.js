(function() {
  'use strict';

  angular
    .module('insight')
    .config(config);

  /** @ngInject */
  function config($logProvider, $translateProvider, toastr) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastr.options.timeOut = 3000;
    toastr.options.positionClass = 'toast-top-right';
    toastr.options.preventDuplicates = true;
    toastr.options.progressBar = true;
    
    // Set up the language translations
    $translateProvider.translations('en', {
       SALES_UPDATES: 'Sales Updates',
       MARKETING_UPDATES: 'Marketing Updates',
       ENGINEERING_UPDATES: 'Engineering Updates',
       KEY_METRICS_UPDATES: 'Key Metrics Updates',
       UPCOMING_INITIATIVES: 'Upcoming Initiatives',
       BUSINESS_UNIT : 'Business Unit',
       PRODUCT: 'Product',
       YEAR_MONTH: 'Year & Month',
       PERCENT_COMPLETE: '% Complete',
       LAST_UPDATED: 'Last Updated',
       ADD_NEW: 'Add New',
       CREATE_NEW_SALES_UPDATE: 'Create New Sales Update',
       MONTH: 'Month',
       YEAR: 'Year',
       SELECT_BUSINESS_UNIT: 'Select Business Unit',
       SELECT_SALES_PERSON: 'Select Sales Person',
       SELECT_VALID_BUSINESS_UNIT: 'Please select a valid business unit',
       BUSINESS_UNIT_REQUIRED: 'Business Unit is required'
    });
    
    // Set the preferred language to en
     $translateProvider.preferredLanguage('en');
  }

})();
