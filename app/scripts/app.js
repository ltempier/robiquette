'use strict';
var robiquetteApp = angular
  .module('robiquetteApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase',
    'leaflet-directive',
    'geolocation'
  ])
  .config(['$routeProvider', function ($routeProvider) {

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/map', {
        templateUrl: 'views/map.html',
        controller: 'MapCtrl'
      })
      .when('/menu', {
        templateUrl: 'views/menu.html',
        controller: 'MenuCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }])
  .run(['$rootScope', '$firebaseObject', function ($rootScope, $firebaseObject) {
    var robiquette = $firebaseObject(new Firebase("https://robiquette.firebaseio.com"));
    robiquette.robiquettes = [
      {
        lat: 48.86,
        lng: 2.35,
        message: 'Robiquette 1',
        icon: {
          iconUrl: 'images/robiquette_pin.png',
          iconSize: [30, 30],
          popupAnchor: [0, -15]
        }
      }, {
        lat: 48.84,
        lng: 2.36,
        message: 'Robiquette 2',
        icon: {
          iconUrl: 'images/robiquette_pin.png',
          iconSize: [30, 30],
          popupAnchor: [0, -15]
        }
      }
    ];
    robiquette.$save()
  }]);
