(function() {
  'use strict';

  angular
    .module('app')
    .factory('RestService', function($http) {
      let service = {};
      const urlBase = 'https://api.foursquare.com/v2/venues';

      service.getPlaces = function(params) {
        return $http.get(urlBase + '/explore/?' + params);
      };

      service.getDeail = function(params) {
        return $http.get(urlBase + params);
      };

      return service;
    })
    .factory('StorageService', function($log, $rootScope) {
      let service = {};
      let datas = {
        venues: {},
        obj: {
          searchString: 'London',
          state: 'loading'
        }
      };

      service.getData = function() {
        return datas;
      };

      service.setData = function(key, value) {
        datas[key] = value;
        $rootScope.$broadcast('data-received', datas);
      };

      return service;
    })
    .factory('MapService', function($document) {
      let service = {};
      service.init = function(lat, lng) {
        var options = {
          center: new google.maps.LatLng(lat, lng),
          zoom: 13,
          disableDefaultUI: true
        };
        this.map = new google.maps.Map(
          $document.getElementById('map'),
          options
        );
        this.places = new google.maps.places.PlacesService(this.map);
      };

      service.addMarker = function(myLatLng) {
        if (this.marker) this.marker.setMap(null);
        this.marker = new google.maps.Marker({
          map: this.map,
          position: myLatLng,
          animation: google.maps.Animation.DROP
        });
        this.map.setCenter(myLatLng);
      };

      return service;
    });
})();
