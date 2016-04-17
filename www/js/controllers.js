'use strict';
/* Controllers */
var AppControllers = angular.module('AppControllers', []);



AppControllers.controller('HomeCtrl',function($rootScope,$scope,$location,$interval,BloodResource){


  $scope.search = function(group){
    $location.path("result/"+group);
  }

  $scope.send = function(group,num){
    BloodResource.request({group:group,num:num},function(data){
      console.log(data);
    })
  }

  $scope.refreshData = function(){
    BloodResource.getRequest({},function(data){
      console.log(data);
      if(data.status=="success"){
        $scope.data = data.data;
      }
    })
  }

  $scope.refreshData();

  $interval(function(){
    $scope.refreshData();
  }, 2500);

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
