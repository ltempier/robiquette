"use strict";var robiquetteApp=angular.module("robiquetteApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","firebase","leaflet-directive","ngGeolocation"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/map",{templateUrl:"views/map.html",controller:"MapCtrl"}).when("/menu",{templateUrl:"views/menu.html",controller:"MenuCtrl"}).when("/ro-admin",{templateUrl:"views/admin.html",controller:"AdminCtrl"}).otherwise({redirectTo:"/"})}]).run(["$rootScope","$firebaseObject",function(a,b){}]);robiquetteApp.factory("robiquettes",["$firebaseObject",function(a){var b=new Firebase("https://robiquette.firebaseio.com/robiquettes");return a(b)}]),robiquetteApp.controller("MainCtrl",["$scope",function(a){}]),robiquetteApp.controller("NavbarCtrl",["$scope","$location",function(a,b){a.menus=[{text:"La robiquette",path:"/"},{text:"Map",path:"/map"},{text:"Menu",path:"/menu"}],a.getClass=function(a){return b.path()==a.path?"active":""}}]),robiquetteApp.controller("MenuCtrl",["$scope",function(a){}]),robiquetteApp.controller("MapCtrl",["$scope","$geolocation","$timeout","robiquettes",function(a,b,c,d){function e(b){var c={opacity:1,draggable:!1,focus:!1};_.each(b,function(b,d){0!=d.indexOf("$")&&(a.map.markers[d]=_.extend(b,c))})}a.map={center:{lat:48.8597625,lng:2.3435408,zoom:12},tiles:{url:"http://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}",type:"xyz",options:{apikey:"pk.eyJ1IjoiYnVmYW51dm9scyIsImEiOiJLSURpX0pnIn0.2_9NrLz1U9bpwMQBhVk97Q",mapid:"robiquette.c8a85d9f"}},markers:{}},e(d),b.getCurrentPosition({timeout:6e4}).then(function(b){a.map.markers.me={lat:b.coords.latitude,lng:b.coords.longitude}}),d.$watch(function(){d.$loaded().then(e)})}]),robiquetteApp.controller("AdminCtrl",["$scope","$firebaseAuth","$geolocation","$interval","robiquettes",function(a,b,c,d,e){function f(){a.robiquette&&(a.map.center.lat=_.clone(a.robiquette.lat),a.map.center.lng=_.clone(a.robiquette.lng))}function g(){a.robiquetteIndex&&_.each(a.map.markers,function(b,c){b.draggable=c==a.robiquetteIndex,b.opacity=c==a.robiquetteIndex?1:.5})}function h(b){_.each(b,function(b,c){0!=c.indexOf("$")&&(a.robiquettes[c]=b,a.map.markers[c]=b,a.robiquetteIndex||(a.robiquetteIndex=c))})}function i(b){a.isFollowMe=1==b?!1:!a.isFollowMe,angular.isDefined(l)&&(d.cancel(l),l=void 0),1==a.isFollowMe&&(l=d(function(){c.getCurrentPosition({timeout:5e3}).then(function(b){a.myPosition=b.coords,a.myPosition.lastUpdate=new Date(b.timestamp),a.robiquette&&(a.robiquette.lat=a.myPosition.latitude,a.robiquette.lng=a.myPosition.longitude,j())})},1e4))}function j(){console.log("save "+a.robiquetteIndex),a.robiquetteIndex&&a.robiquette&&(_.extend(e[a.robiquetteIndex],a.robiquette,{draggable:!1,opacity:1}),e.$save().then(g))}var k=new Firebase("https://robiquette.firebaseio.com");a.user={email:"",password:""},a.auth=b(k).$getAuth(),a.login=function(){a.isLogin=!0,a.loginError=!1,k.authWithPassword(a.user,function(b,c){b?a.loginError="Login error":a.auth=c,a.isLogin=!1,a.$apply()})},a.logout=function(){a.auth&&b(k).$unauth(),a.auth=b(k).$getAuth()},a.map={center:{lat:48.8597625,lng:2.3435408,zoom:12},tiles:{url:"http://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}",type:"xyz",options:{apikey:"pk.eyJ1IjoiYnVmYW51dm9scyIsImEiOiJLSURpX0pnIn0.2_9NrLz1U9bpwMQBhVk97Q",mapid:"robiquette.c8a85d9f"}},markers:{}},a.robiquettes={},a.isFollowMe=!1,a.followMe=i,a.save=j,h(e),e.$watch(function(){e.$loaded().then(h)}),a.$watch("robiquetteIndex",function(b){b&&(g(),i(!0),a.robiquette=e[b],f())}),a.$on("leafletDirectiveMarker.dragend",function(b,c){c.modelName==a.robiquetteIndex?a.robiquette=c.model:console.log("select good robiquette")});var l=void 0}]);