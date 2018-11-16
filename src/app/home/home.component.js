(function() {
  'use strict';

  angular.module('app').component('home', {
    controller: HomeController,
    controllerAs: 'vm',
    templateUrl: 'app/home/home.view.html'
  });

  /** @ngInject */
  function HomeController($log) {
    const vm = this;

    // Scope variables go here:
    // vm.variable = 'value';
    function activate() {
      vm.state = {};
      $log.debug('home activated');
    }

    activate();
  }
})();
