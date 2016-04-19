'use strict';

var AppServices = angular.module('AppServices', ['ngResource']);

var baseUrl = "";
baseUrl = "http://athena.nitc.ac.in/ashwin_b130657cs/";
//baseUrl = "http://192.168.1.101:8080/server/";
AppServices.factory('BloodResource',function ($resource) {
    return $resource(baseUrl+"getblood.php", {},
    {
        get:{method:'GET', cache:false,isArray:true},
        addId:{method:'GET',cache:false,isArray:false,url:baseUrl+"addId.php"},
        request:{method:'GET',cache:false,isArray:false,url:baseUrl+"bloodrequest.php"},
        getRequest:{method:'GET',cache:false,isArray:false,url:baseUrl+"getRequests.php"},
        sendResponse:{method:'GET',cache:false,isArray:false,url:baseUrl+"response.php"}
    });
});



/*
   IDBStore Interface :: indexed database store Interface (wrapper for indexed db)
   getAll() : retrieves everything
   put(): stores/updates an entry
   get(): retrieves an entry
   remove() : removes an entry

*/


AppServices.factory('BloodService',function(){
            /* IDBStore instance */
            var contacts = new IDBStore({
                dbVersion: 1,
                storeName: 'donor',
                keyPath: 'id',
                autoIncrement: true,
                onStoreReady: function () {
                    console.log('Donor Store ready!');
                }
            });
            contacts.loaded = false;
            contacts.loadCurrent = function(){
              contacts.get(1,function(data){
                  contacts.data = data;
                  contacts.loaded = true;
              },function(error){
                console.log(error);
              });
            };
            contacts.getData = function(f){
              console.log('called');
              if(contacts.loaded){
                f(contacts.data);
              }else{
                setTimeout(function(){
                  contacts.getData(f);
                },1500);
              }
            };
            contacts.updateData = function(data){
              contacts.data = data;
            }

            return contacts;
        }
);


AppServices.factory('RequestService',function(){
            /* IDBStore instance */
            var contacts = new IDBStore({
                dbVersion: 1,
                storeName: 'requests',
                keyPath: 'id',
                autoIncrement: true,
                onStoreReady: function () {
                    console.log('Request Store ready!');
                }
            });
            contacts.loaded = false;
            contacts.loadCurrent = function(){
              contacts.getAll(function(data){
                  contacts.data = data;
                  contacts.loaded = true;
              },function(error){
                console.log(error);
              });
            };
            contacts.getData = function(f){
              console.log('called');
              if(contacts.loaded){
                f(contacts.data);
              }else{
                setTimeout(function(){
                  contacts.getData(f);
                },1500);
              }
            };
            contacts.updateData = function(data){
              contacts.data = data;
            }

            return contacts;
        }
);
