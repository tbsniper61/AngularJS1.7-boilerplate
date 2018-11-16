(function() {
  'use strict';

  angular.module('app').component('places', {
    controller: PlacesController,
    controllerAs: 'vm',
    templateUrl: 'app/pages/places/places.view.html'
  });

  /** @ngInject */
  function PlacesController($log, $scope, $state) {
    let vm = this;

    // Scope variables go here:
    // vm.variable = 'value';
    vm.empty = true;

    function activate() {
      $log.debug('Place activated');
    }

    //custom events
    vm.cellClick = function(venueID, event) {
      $state.go('detail', { venueID: venueID });
      $log.log(event);
    };

    $scope.$on('data-received', function(event, data) {
      // We have our new data from our factory
      vm.state = data.obj.state;
      if (vm.state == 'loaded') {
        vm.venues = data.venues;
      }
    });

    activate(); // here is main block
  }
})();
