(function() {
  'use strict';

  angular.module('app').config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        component: 'home'
      })
      .state('places', {
        url: '/',
        controller: 'places'
      })
      .state('filter', {
        url: '/filters',
        controller: 'filters'
      })
      .state('detail', {
        url: '/detail/{venueId}',
        controller: 'detail',
        params: {
          venue: ''
        }
      });

    $urlRouterProvider.otherwise('/');
  }
})();
