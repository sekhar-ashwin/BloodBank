'use strict';
/* Controllers */
var AppControllers = angular.module('AppControllers', []);



AppControllers.controller('HomeCtrl',function($rootScope,$scope,$location){


  $scope.search = function(group){
    $location.path("result/"+group);
  }

  $scope.navigate = function(item) {
    $scope.title = item.name;
    $location.path(item.link);
  }


});


AppControllers.controller('ResultCtrl', function($scope,$rootScope,$routeParams,$location,BloodService){

  $scope.group = $routeParams.group;
  BloodService.getData(function(data){

    $scope.data = data.content;
  });

});
