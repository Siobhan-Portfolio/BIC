
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

$scope.values = [];
$scope.weights = [];
$scope.sum = 0;
var perceptron = function(input, weights){

var x = [];
x = input;
var w = [];
w = weights;

var sum = 0;

for (var i = x.length - 1; i >= 0; i--) {
	sum = sum + (w[i]*x[i]);
};

this.output = stepFunction(sum);

}

var data = [-1,-0.5,0.5,1];


$scope.print = function(){
	$scope.pTest = new perceptron(data);
	console.log($scope.pTest.output);
}


});