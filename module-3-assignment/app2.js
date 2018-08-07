(function(){
  'use strict';

  angular.module('NarrowItDownApp',[])
  .controller('NarrowItDownController',NarrowItDownController)
  .service('MenuSearchService',MenuSearchService)
  .directive('foundItems',foundItemsDirective);

  function foundItemsDirective(){
    var ddo={
      restrict:'E',
      templateUrl:'./items.html',
      scope:{
        foundItems:'<',
        onRemove:'&'
      },
      controller:foundItemsDirectiveController,
      controllerAs:'narrow',
      bindToController:true
    };
    return ddo;
  }

  function foundItemsDirectiveController(){
    var narrow=this;
    narrow.ifNoItems=function(){
      if(narrow.foundItems.length < 1)
        return true;
      else
        return false;
    };
  }


  NarrowItDownController.$inject=['$scope','MenuSearchService'];
  function NarrowItDownController($scope,MenuSearchService){
    var narrowdown=this;
    narrowdown.searchTerm="";
    narrowdown.searchItems=function(searchTerm){
      narrowdown.found=[];
      var promise=MenuSearchService.getMatchedMenuItems(searchTerm);
      promise.then(function(items) {
        if (items && items.length > 0) {
           narrowdown.found = items;
        } else {
          narrowdown.found = [];
        }
      });
    };
    narrowdown.removeItem=function(index){
      MenuSearchService.removeItem(index);
    };
  }


  MenuSearchService.$inject=['$http'];
  function MenuSearchService($http){
    var service=this;
    var foundItems=[];
    service.getMatchedMenuItems=function(searchTerm){
      return $http({
        method: "GET",
        url:"https://davids-restaurant.herokuapp.com/menu_items.json"
      }).then(function (result) {
        for(var i=0,size=result.data.menu_items.length;i<size;i++){
          var item=result.data.menu_items[i]["description"];
          if(searchTerm.length>0 && item.toLowerCase().indexOf(searchTerm) !== -1){
            foundItems.push(result.data.menu_items[i]);
            console.log(foundItems);
          }
        }
      return foundItems;
    });

  };

  service.removeItem=function(index){
    foundItems.splice(index,1);
  };
}


})();
