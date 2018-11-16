(function() {
  'use strict';

  angular.module('app').component('detail', {
    controller: DetailController,
    controllerAs: 'vm',
    templateUrl: 'app/pages/detail/detail.view.html'
  });

  /** @ngInject */
  function DetailController(
    $stateParams,
    $log,
    RestService,
    MapService,
    FOURSQUARE_CLIENTID,
    FOURSQUARE_CLIENTSECRET
  ) {
    let vm = this;

    // Scope variables go here:
    // vm.variable = 'value';

    function activate() {
      $log.debug('Place activated');
      vm.state = 'loading';

      const params =
        $stateParams.venueID +
        '?client_id=' +
        FOURSQUARE_CLIENTID +
        '&client_secret=' +
        FOURSQUARE_CLIENTSECRET +
        '&v=20131124';
      RestService.getDeail(params).then(
        function successCallback(result) {
          vm.state = 'loaded';  
          const venue = result.data.response.venue;
          vm.title = venue.name;
          vm.imgSrc =
            venue.bestPhoto.prefix + '300x300' + venue.bestPhoto.suffix;
          vm.address =
            venue.location.formattedAddress[0] +
            ',' +
            venue.location.formattedAddress[1];
          vm.openInfo = vm.parseOpenInformation(venue.popular);
          vm.lat = venue.location.lat;
          vm.lng = venue.location.lng;
          var myLatLng = { lat: vm.lat, lng: vm.lng };
          MapService.init(vm.lat, vm.lng);
          MapService.addMarker(myLatLng);
        },
        function errorCallback(err) {
          vm.state = 'noResult';
          $log.log(err);
        }
      );
    }

    vm.parseOpenInformation = function(data) {
      var info = '';
      if (data && data.timeframes) {
        for (var i in data.timeframes[0].open) {
          if (i !== 0) {
            info += '\n';
          }
          info += data.timeframes[0].open[i].renderedTime;
        }
      }

      return info;
    };

    activate(); // here is main block
  }
})();
