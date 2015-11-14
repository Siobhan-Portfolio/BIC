
/******************************************************************************************
                                         Angular Overhead
*******************************************************************************************/

var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope) {
    $scope.firstName= "John";
    $scope.lastName= "Doe";


/******************************************************************************************
                                         Perceptron
*******************************************************************************************/


/****************************************
 * Input Variables:
 *   + Inputs Vector             phi(x)
 *     - Weights                 w
 *     - Input Values            x
 *     - SourceID                NodeID
 *
 *   + Bias                      b
 *
 * Node Variables:
 *  + Summing Function           SUM()
 *  + Activation Function        f(sum)
 *  + NodeID                     NodeID
 *
 * Output Variables:
 *   + Output Vector
 *     - Destination Node
 *     - Output Values
 *   + Error
****************************************/

var stepFunction = function(i){
  if(i>=0){
    return 1;
  }
  else{
    return -1;
  }
}


var perceptron = function(input){

this.i = input;
var weights = Math.random();
var sum = input * weights;
this.output = stepFunction(sum);

}

var one = 1;


$scope.print = function(){
	$scope.pTest = new perceptron(-0.5);
	console.log($scope.pTest.output);
}


});