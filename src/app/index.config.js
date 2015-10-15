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
       BUSINESS_UNIT_REQUIRED: 'Business Unit is required',
       FOCUS_AREA: 'Focus Area',
       SALES_ENGINEERING_ACTIVITIES: 'Sales Engineering Activities',
       SALES_PERSON: 'Sales Person',
       ACTIVITY: 'Activity',
       ADD_FOCUS_AREA: 'Add Focus Area',
       ENTER_SALES_ACTIVITY_HELP_TEXT: 'Please enter activity details here.',
       PROSPECT: 'Prospect',
       ENTER_PROSPECT: 'Enter Prospect Name',
       POTENTIAL: 'Potential $m',
       OPPORTUNITIES: 'Opportunities',
       TARGET_CLOSURE_DATE: 'Target Closure Date',
       SALES_PERSON_REQUIRED: 'Sales Person is required',
       SELECT_PRODUCT: 'Select Product',
       PRODUCT_REQUIRED: 'Product is required',
       ENTER_POTENTIAL: 'Enter Potential in USD millions',
       PROSPECT_REQUIRED: 'Prospect is required',
       ENTER_TARGET_DATE: 'Enter Target Closure Date',
       POTENTIAL_REQUIRED: 'Potential is required',
       CREATE_NEW_OPPORTUNITY: 'Create New Sales Opportunity'
    });
    
    // Set the preferred language to enter
    $translateProvider.preferredLanguage('en');

    // Set sanitize strategy
    $translateProvider.useSanitizeValueStrategy('sanitize');
  }

})();
