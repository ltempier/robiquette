'use strict';

robiquetteApp
  .controller('AdminCtrl', ['$scope', '$firebaseAuth', function ($scope, $firebaseAuth) {
    var ref = new Firebase("https://robiquette.firebaseio.com");
    $scope.user = {};
    $scope.auth = $firebaseAuth(ref).$getAuth();
    $scope.login = function () {
      ref.authWithPassword($scope.user, function (error, userData) {
        if (error) {
          console.log("Error creating user:", error);
        } else {
          $scope.auth = userData;
          $scope.$apply();
        }
      });
    };
    $scope.logout = function () {
      if ($scope.auth)
        $firebaseAuth(ref).$unauth();
      $scope.auth = $firebaseAuth(ref).$getAuth();
    };
  }]);




