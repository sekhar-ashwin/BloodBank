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
    });
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


AppControllers.controller('ResultCtrl', function($scope,$rootScope,$routeParams,$location,$interval,BloodService,BloodResource){
  $scope.hide = true;
  $scope.group = $routeParams.group;

  $scope.refreshData = function(){
    BloodResource.getRequest({},function(data){
      console.log(data);
      if(data.status=="success"){
        var d = data.data;
        for(var i=0;i<d.length;i++){
          console.log(d[i].BLOODGROUP+" "+$scope.group);
          if(d[i].BLOODGROUP==$scope.group){
            $scope.r = d[i];
            $scope.hide = false;
            return;
          }
        }
        $scope.hide = true;
      }
    });
  }

  $scope.refreshData();

  $interval(function(){
    $scope.refreshData();
  }, 2500);


  BloodService.getData(function(data){
    $scope.data = data.content;
  });

});
