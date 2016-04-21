
var appDirectives = angular.module('AppDirectives', []);



appDirectives.directive('card', function ($timeout) {
    return {
        restrict: 'EA',
        templateUrl:'partials/card.html',
        scope:{
          user : "=user",
          onAgree : "&onAgree"
        },
        link: function (scope, element, attr) {
            /*if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('ngRepeatFinished');
                });
            }*/
          scope.d = scope.user;
          scope.disagreed=true;
          scope.agreed=true;
          scope.donated=true;


          scope.change = function(code){
            if(code==0){
              scope.agreed=true;
              scope.disagreed=false;
            }
            if(code==1){
              scope.agreed=false;
              scope.disagreed=true;
            }
            if(code==2){
              scope.donated=false;
              scope.agreed=false;
              scope.disagreed=false;
            }
          }

          scope.agree = function(user,code,roll,group){

            scope.onAgree({user:user,code:code,roll:roll,group:group,
              f:function(isOkay){
              if(isOkay){
                  scope.change(code);
              }
            }
          });

          }

        }


    }

});
