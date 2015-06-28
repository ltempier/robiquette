'use strict';

robiquetteApp
  .controller('MapCtrl', ['$scope', '$geolocation', '$timeout', 'robiquettes',
    function ($scope, $geolocation, $timeout, robiquettes) {
      $scope.map = {
        center: {
          lat: 48.8597625,
          lng: 2.3435408,
          zoom: 12
        },
        tiles: {
          url: 'http://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}',
          type: 'xyz',
          options: {
            apikey: 'pk.eyJ1IjoiYnVmYW51dm9scyIsImEiOiJLSURpX0pnIn0.2_9NrLz1U9bpwMQBhVk97Q',
            mapid: 'robiquette.c8a85d9f'
          }
        },
        markers: {}
      };
      loadMarkers(robiquettes);

      $geolocation.getCurrentPosition({
        timeout: 60000
      }).then(function (position) {
        $scope.map.markers.me = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      });

      robiquettes.$watch(function () {
        robiquettes.$loaded().then(loadMarkers);
      });


      function loadMarkers(datas) {
        _.each(datas, function (data, key) {
          if (key.indexOf('$') != 0) {
            $scope.map.markers[key] = data
          }
        });
      }
    }]);




