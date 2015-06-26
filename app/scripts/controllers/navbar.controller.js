'use strict';

robiquetteApp
  .controller('NavbarCtrl', ['$scope', '$location', function ($scope, $location) {
    $scope.menus = [{
      text: 'La robiquette',
      path: '/'
    }, {
      text: 'Map',
      path: '/map'
    }, {
      text: 'Menu',
      path: '/menu'
    }];

    $scope.getClass = function (menu) {
      if ($location.path() == menu.path) {
        return "active"
      } else {
        return ""
      }
    }
  }]);
