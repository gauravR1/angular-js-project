(function(){

  'use strict';

  angular.module('LunchCheck',[])

  .controller('LunchCheckController',LunchCheckController);

  LunchCheckController.$inject=['$scope'];
  function LunchCheckController($scope){
    $scope.listItems="";
    $scope.message="";
    $scope.calculator= function () {
      var noOfItems=0;
      noOfItems=$scope.listItems.split(",");
      console.log(noOfItems.length);
      if (noOfItems=="") {
        $scope.message="Please enter data first";
      } else if (noOfItems.length<=3) {
        $scope.message="Enjoy!!";
      } else if(noOfItems.length >3){
        $scope.message="Too much!";
      }
   };
  }


})();
