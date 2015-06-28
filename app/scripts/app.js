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
    'ngGeolocation',
    'NgSwitchery'
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
      .when('/ro-admin', {
        templateUrl: 'views/admin.html',
        controller: 'AdminCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }])
  .run(['$rootScope', '$firebaseObject', function ($rootScope, $firebaseObject) {
    //var robiquette = $firebaseObject(new Firebase("https://robiquette.firebaseio.com"));
    //robiquette.robiquettes = [
    //  {
    //    id: 'robiquette_1',
    //    lat: 48.86,
    //    lng: 2.35,
    //    message: 'Robiquette 1',
    //    draggable: true,
    //    icon: {
    //      iconUrl: 'images/robiquette_pin.png',
    //      iconSize: [30, 30],
    //      popupAnchor: [0, -15]
    //    }
    //  }, {
    //    id: 'robiquette_2',
    //    lat: 48.84,
    //    lng: 2.36,
    //    message: 'Robiquette 2',
    //    draggable: true,
    //    icon: {
    //      iconUrl: 'images/robiquette_pin.png',
    //      iconSize: [30, 30],
    //      popupAnchor: [0, -15]
    //    }
    //  }
    //];
    //robiquette.$save()
  }]);
