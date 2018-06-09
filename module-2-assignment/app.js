(function(){
  'use strict';

  angular.module("ShoppingListCheckoff",[])
  .controller("ToBuyController",ToBuyController)
  .controller("AlreadyBoughtController",AlreadyBoughtController)
  .service("ShoppingListCheckoffService",ShoppingListCheckoffService);

  // controller for handling to buy list
  ToBuyController.$inject=["ShoppingListCheckoffService"];
  function ToBuyController(ShoppingListCheckoffService){
    var tobuy=this;
    tobuy.list=ShoppingListCheckoffService.getToBuyList();
  }

  //controller for handling bought item list
  AlreadyBoughtController.$inject=["ShoppingListCheckoffService"];
  function AlreadyBoughtController (ShoppingListCheckoffService){
    var alreadybought=this;
    alreadybought.list=[];
    alreadybought.createBoughtList=function(index){
      alreadybought.list=ShoppingListCheckoffService.createBoughtList(index);
    }
  }
  //creating service
  function ShoppingListCheckoffService(){
    var service=this;
    var list1=[
      {
        name:"chips",
        quantity:10
      },
      {
        name:"egg",
        quantity:15
      },
      {
        name:"socks",
        quantity:2
      },
      {
        name:"cookies",
        quantity:10
      },
      {
        name:"sode",
        quantity:5
      }
    ];
    var list2=[];

    service.getToBuyList=function(){
      return list1;
    };

    service.createBoughtList=function(index){
      var item=list1.splice(index,1);
      list2.push(item[0]);
      return list2;
    };

  }
})();
