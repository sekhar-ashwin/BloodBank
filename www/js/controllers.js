'use strict';
/* Controllers */
var AppControllers = angular.module('AppControllers', []);



AppControllers.controller('LogCtrl',function($rootScope,$scope,$location,BloodService,BloodResource){

  $scope.Login = function(username,pass){
    BloodResource.LogIn({username:username,pass:pass}, function(data){
      console.log(data.status);
      if(data.status=="fail"){
        alert("Wrong Username/password");
      }
      else{
        $location.path("home");
      }
    });

  }
});


AppControllers.controller('NavCtrl',function($rootScope,$scope,$location){
  $scope.agpage = function(){
    $location.path("agreed");
  }
});


AppControllers.controller('AgreeCtrl',function($rootScope,$scope,$location,BloodService,BloodResource){

  BloodService.getData(function(data){
    $scope.data = data;
    console.log(data);
  });

  $scope.agree = function(user,code,roll,group,f){
      console.log("called");
      BloodResource.sendResponse({code:code,roll:roll,group:group },function(data){
       console.log(data);
       user.RESPONSE = code;
       console.log(user);
       BloodService.UpdateUser(user);
       f(true);
     },function(error){
        console.log(error);
    });
  }


});



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
      //console.log(data);
      if(data.status=="success"){
        $scope.data = data.data;
      }
    });
  }

  $scope.refreshData();

  $interval(function(){
    $scope.refreshData();
  }, 4000);

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
      //console.log(data);
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
  }, 4000);


  BloodService.getData(function(data){
    $scope.data = data;
    console.log(data);
    console.log("controller");
  });


  $scope.agree = function(user,code,roll,group,f){
      console.log(user);
      BloodResource.sendResponse({code:code,roll:roll,group:group },function(data){
       //console.log(data);
       //console.log(code);
       //console.log(roll);
       //console.log(group);
       user.RESPONSE = code;
       console.log(user);
       BloodService.UpdateUser(user);

       f(true);
     },function(error){
        console.log(error);
    });
  }

});
