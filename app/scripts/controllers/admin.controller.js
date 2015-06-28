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
      loadMarkers(robiquettes);
      robiquettes.$watch(function () {
        robiquettes.$loaded().then(loadMarkers);
      });
      function loadMarkers(datas) {
        _.each(datas, function (data, key) {
          if (key.indexOf('$') != 0) {
            $scope.robiquettes[key] = data;
            $scope.map.markers[key] = _.extend(data, {
              draggable: true
            });
            if (!$scope.robiquette)
              $scope.robiquette = $scope.map.markers[key]
          }
        });
      }

      var stopFollowMePromise = undefined;
      $scope.follow = false;
      $scope.$watch('follow', function (followMeValue) {
        if (angular.isDefined(stopFollowMePromise)) {
          $interval.cancel(stopFollowMePromise);
          stopFollowMePromise = undefined;
        }
        if (followMeValue == true) {
          stopFollowMePromise = $interval(function () {
            $geolocation.getCurrentPosition({
              timeout: 60000
            }).then(function (position) {
              $scope.myPosition = position;
            });
          }, 1000);
        }
      });

    }]);




