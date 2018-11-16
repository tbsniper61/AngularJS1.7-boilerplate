(function() {
  'use strict';

  angular.module('app').component('navbar', {
    controller: NavbarController,
    controllerAs: 'vm',
    templateUrl: 'app/components/navbar/navbar.view.html'
  });

  /** @ngInject */
  function NavbarController(
    $state,
    $log,
    $scope,
    RestService,
    StorageService,
    FOURSQUARE_CLIENTID,
    FOURSQUARE_CLIENTSECRET
  ) {
    const vm = this;
    // Scope variables go here:
    // vm.variable = 'value';
    vm.records = {
      food: true,
      shops: false,
      outdoors: false
    };
    vm.obj = {
      searchString: 'London',
      state: 'loading'
    };
    vm.originatorEv = '';

    function activate() {
      $log.debug('Navbar activated');
    }

    vm.homeClick = function() {
      $state.go('/');
    };

    vm.search = function() {
      vm.obj.state = 'loading';
      StorageService.setData('obj', vm.obj);

      // load filter options from localStorage
      if (angular.equals(vm.records, {})) {
        vm.records = {
          food: true,
          shops: false,
          outdoors: false
        };
      }
      // create the category object
      let category = [];
      if (vm.records.food) category.push('food');
      if (vm.records.shops) category.push('shops');
      if (vm.records.outdoors) category.push('outdoors');

      const params =
        'near=' +
        vm.obj.searchString +
        '&venuePhotos=1&section=' +
        category.join(',') +
        '&client_id=' +
        FOURSQUARE_CLIENTID +
        '&client_secret=' +
        FOURSQUARE_CLIENTSECRET +
        '&v=20131124';
      RestService.getPlaces(params).then(
        function successCallback(result) {
          const items = result.data.response.groups[0].items;
          let help = [];
          for (var el in items) {
            const place = vm.parseVenue(items[el]);
            help.push(place);
          }
          vm.obj.state = 'loaded';
          vm.venues = help;
          StorageService.setData('obj', vm.obj);
          StorageService.setData('venues', vm.venues);
        },
        function errorCallback(err) {
          vm.obj.state = 'noResult';
          StorageService.setData('obj', vm.obj);
          StorageService.setData('venues', {});
          $log.log(err);
        }
      );
    };

    vm.parseVenue = function(data) {
      const venue = data.venue;
      let price = '$';

      if (venue.price) {
        let value = venue.price.tier;
        while (value > 1) {
          price += '$';
          value--;
        }
      } else {
        price = '';
      }

      let rating = Math.round(venue.rating) / 2.0;
      let plus = [];
      let minus = [];
      for (var i in [0, 1, 2, 3, 4]) {
        if (rating > 0.5) {
          rating--;
          plus.push(i);
        } else {
          minus.push(i);
        }
      }

      return {
        title: venue.name,
        plus: plus,
        minus: minus,
        venueID: venue.id,
        picture_url: '',
        reviews: venue.ratingSignals + ' reviews',
        price: price,
        place:
          venue.location.formattedAddress[0] +
          ',' +
          venue.location.formattedAddress[1],
        category: venue.categories[0].name
      };
    };

    $scope.$watch('obj.searchString', function() {
      vm.search();
    });

    //Filter menu block
    vm.openMenu = function($mdMenu, ev) {
      vm.originatorEv = ev;
      $mdMenu.open(ev);
    };

    activate(); // here is main run block
  }
})();
