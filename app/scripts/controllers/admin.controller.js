'use strict';

robiquetteApp
  .controller('AdminCtrl', ['$scope', '$firebaseAuth', '$geolocation', '$interval', 'robiquettes',
    function ($scope, $firebaseAuth, $geolocation, $interval, robiquettes) {
      var ref = new Firebase("https://robiquette.firebaseio.com");
      $scope.user = {
        email: "",
        password: ""
      };
      $scope.auth = $firebaseAuth(ref).$getAuth();
      $scope.login = function () {
        $scope.isLogin = true;
        $scope.loginError = false;
        ref.authWithPassword($scope.user, function (error, userData) {
          if (error) {
            $scope.loginError = "Login error"
          } else {
            $scope.auth = userData;
          }
          $scope.isLogin = false;
          $scope.$apply();
        });
      };
      $scope.logout = function () {
        if ($scope.auth)
          $firebaseAuth(ref).$unauth();
        $scope.auth = $firebaseAuth(ref).$getAuth();
      };

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
      $scope.robiquettes = {};

      $scope.isFollowMe = false;
      $scope.followMe = followMe;
      $scope.save = save;

      loadMarkers(robiquettes);

      robiquettes.$watch(function () {
        robiquettes.$loaded().then(loadMarkers);
      });

      $scope.$watch('robiquetteIndex', function (robiquetteIndex) {
        if (robiquetteIndex) {
          _.each($scope.map.markers, function (marker, key) {
            marker.draggable = key == robiquetteIndex;
            marker.opacity = key == robiquetteIndex ? 1 : 0.5
          });
          followMe(true);
          $scope.robiquette = robiquettes[robiquetteIndex]
        }
      });

      $scope.$on('leafletDirectiveMarker.dragend', function (e, marker) {
        if (marker.modelName == $scope.robiquetteIndex)
          $scope.robiquette = marker.model;
        else
          console.log('select good robiquette')
      });

      function loadMarkers(datas) {
        _.each(datas, function (data, key) {
          if (key.indexOf('$') != 0) {
            $scope.robiquettes[key] = data;
            $scope.map.markers[key] = data;
            if (!$scope.robiquetteIndex) {
              $scope.robiquetteIndex = key
            }
          }
        });
      }

      var stopFollowMePromise = undefined;

      function followMe(stop) {
        $scope.isFollowMe = stop == true ? false : !$scope.isFollowMe;
        if (angular.isDefined(stopFollowMePromise)) {
          $interval.cancel(stopFollowMePromise);
          stopFollowMePromise = undefined;
        }
        if ($scope.isFollowMe == true) {
          stopFollowMePromise = $interval(function () {
            $geolocation.getCurrentPosition({
              timeout: 5000
            }).then(function (position) {
              $scope.myPosition = position.coords;
              $scope.myPosition.lastUpdate = new Date(position.timestamp);
              if ($scope.robiquette) {
                $scope.robiquette.lat = $scope.myPosition.latitude;
                $scope.robiquette.lng = $scope.myPosition.longitude;
                save()
              }
            });
          }, 10000);
        }
      }

      function save() {
        console.log('save ' + $scope.robiquetteIndex);
        if ($scope.robiquetteIndex && $scope.robiquette) {
          _.extend(robiquettes[$scope.robiquetteIndex], $scope.robiquette, {draggable: false, opacity: 1});
          robiquettes.$save($scope.robiquetteIndex).then(function (ref) {

          });
        }
      }
    }]);




