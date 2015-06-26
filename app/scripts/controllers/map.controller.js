'use strict';

robiquetteApp
  .controller('MapCtrl', ['$scope', 'geolocation', '$firebaseArray', function ($scope, geolocation, $firebaseArray) {

    var robiquettes = new Firebase("https://robiquette.firebaseio.com/robiquettes");


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
      markers: $firebaseArray(robiquettes)
    };

    geolocation.getLocation().then(function (data) {
      $scope.map.markers.push({
        lat: data.coords.latitude,
        lng: data.coords.longitude,
        focus: true,
        draggable: false,
        message: 'ME'
      })
    });
  }])
;




