'use strict';



function error(r){
  console.log(r);
  var v;
  for(var key in r){
    v+=r[key];
  }
  alert(v);
}

/* end api debug */;


/* App Module */
var app = angular.module('app', [
    'ngRoute',
    'AppControllers',
    'AppServices',
    'AppDirectives'
]);



app.run(function($rootScope,BloodResource,BloodService){

  var push = PushNotification.init({
    android: {
        senderID: "173338710703"
    }
  });
  push.on('registration', function(data) {
      console.log(data.registrationId);

      BloodResource.addId({id:data.registrationId},function(response){
        console.log(response);
      },function(err){
        console.log(err);
      });

  });

  push.on('notification', function(data) {
    console.log(data);
  });

  push.on('error', function(e) {
      // e.message
  });


  if(true){

    console.log('first run');

    var load = function(){
      BloodResource.get({},function(response){
        console.log(response);
        //clear db first
        BloodService.clearAll(function(){
          for(var i=0;i<response.length;i++){
            var contacts=response[i];
            BloodService.put(contacts,function(data){
              console.log(data);
              localStorage.isNotFirst = true;
              //console.log(localStorage.isNotFirst);
            },function(error){
              console.log(error);
            });
          }
          BloodService.loadCurrent();
        });





      },function(error){
        console.log(error);

      });
    }
    load();

  }else{

    //not the first run! Load things up and fire!!
    setTimeout(function(){

      BloodService.loadCurrent();

    },2500);



  }
});



app.config(['$routeProvider', '$locationProvider','$httpProvider',
    function($routeProvider, $locationProvider,$httpProvider) {

      $httpProvider.defaults.useXDomain = true;
      delete $httpProvider.defaults.headers.common['X-Requested-With'];


        $routeProvider.
                when('/', {
                    templateUrl: 'partials/login.html',
                    controller: 'LogCtrl'
                }).when('/home', {
                    templateUrl: 'partials/home.html',
                    controller: 'HomeCtrl'
                }).when('/result/:group',{
                    templateUrl: 'partials/result.html',
                    controller: 'ResultCtrl'
                }).when('/agreed',{
                    templateUrl: 'partials/agreed.html',
                    controller: 'AgreeCtrl'
                })
        $locationProvider.html5Mode(false).hashPrefix('!');
    }]);


/* Push set up */


document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {

   console.log("Device Ready");
   angular.bootstrap(document.body, ['app']);

}
