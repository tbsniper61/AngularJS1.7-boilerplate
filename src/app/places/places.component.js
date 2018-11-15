(function() {
  'use strict';

  angular.module('app').component('places', {
    controller: PlacesController,
    controllerAs: 'vm',
    templateUrl: 'app/places/places.view.html'
  });

  /** @ngInject */
  function PlacesController($rootScope, $http, $location, SAMPLE_CONSTANT, $q) {
    const vm = this;

    // Scope variables go here:
    // vm.variable = 'value';

    vm.showSampleConstant = showSampleConstant;
    vm.switchLanguage = switchLanguage;

    activate();

    function activate() {
      $log.debug('Place activated');
    }

    function showSampleConstant() {
      alert(SAMPLE_CONSTANT);
    }

    function switchLanguage(language) {
      $translate.use(language);
    }
  }
})();
