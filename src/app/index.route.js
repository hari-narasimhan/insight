(function() {
  'use strict';

  angular
    .module('insight')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('report', {
        url:'/report/:businessUnitId/:year/:month',
        templateUrl:'app/main/report.html',
        abstract: true,
        controller: 'ReportController',
        controllerAs: 'report',
        params: {businessUnit: null}
      })
      .state('report.sales', {
        url: '/sales',
        templateUrl: 'app/main/report.sales.html',
        controller: 'ReportSalesController',
        controllerAs: 'sales',
        params: {businessUnit: null}
      })
      .state('report.marketing', {
        url: '/marketing',
        templateUrl: 'app/main/report.marketing.html',
        controller: 'ReportMarketingController',
        controllerAs: 'marketing',
        params: {businessUnit: null}
      })
      .state('report.engineering', {
        url: '/engineering',
        templateUrl: 'app/main/report.engineering.html',
        controller: 'ReportEngineeringController',
        controllerAs: 'engineering',
        params: {businessUnit: null}
      })
      .state('report.initiative', {
        url: '/initiative',
        templateUrl: 'app/main/report.initiative.html',
        controller: 'ReportInitiativeController',
        controllerAs: 'initiative',
        params: {businessUnit: null}
      })
      .state('report.keymetric', {
        url: '/keymetric',
        templateUrl: 'app/main/report.keymetric.html',
        controller: 'ReportKeyMetricController',
        controllerAs: 'keymetric',
        params: {businessUnit: null}
      });

    $urlRouterProvider.otherwise('/');
  }

})();
