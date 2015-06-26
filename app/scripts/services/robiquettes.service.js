'use strict';

robiquetteApp
  .factory('robiquettes', ['$firebaseObject', function ($firebaseObject) {
    var ref = new Firebase("https://robiquette.firebaseio.com/robiquettes");
    return $firebaseObject(ref);
  }]);
