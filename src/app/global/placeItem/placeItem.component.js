(function() {
  'use strict';

  angular.module('app').component('placeItem', {
    controller: PlaceItemController,
    controllerAs: 'vm',
    templateUrl: 'app/place/place.view.html',
    bindings: {
      venue: '<',
      click: '&'
    }
  });

  /** @ngInject */
  function PlaceItemController($log, $location, $rootScope, $scope) {
    const vm = this;

    // Scope variables go here:
    // vm.variable = 'value';

    vm.Click = click;
    vm.switchLanguage = switchLanguage;

    activate();

    function activate() {
      $log.debug('PlaceItem activated');
    }

    function click() {
      console.log(vm.venue);
    }
  }
})();
