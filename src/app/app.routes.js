(function() {
  'use strict';

  angular.module('app').config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('places', {
        url: '/',
        component: 'places'
      })
      .state('filter', {
        url: '/filters',
        component: 'filters'
      })
      .state('detail', {
        url: '/detail',
        component: 'detail',
        params: {
          venueID: null
        }
      });

    $urlRouterProvider.otherwise('/');
  }
})();
