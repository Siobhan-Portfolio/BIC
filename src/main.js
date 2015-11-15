
/******************************************************************************************
                                         Angular Overhead
*******************************************************************************************/

var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope) {





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
$scope.input_1;
$scope.input_2;
$scope.outputTest;
$scope.hiddenNodes;



var x_data = [1];


/************************************************************
                    Activation Functions

Because I designed my MLP to go between the values -1 and 1 I tweek some
of the functions so that they would allow outputs between these values
rather than have values starting from 0

The activation function array contains the encoding for each of these

[0] = Step
[1] = Sigmoid using Exp
[2] = Sigmoid using tanh
[3] = Piecwise Linear
[4] = Gaussian
*************************************************************/


var stepFunction = function(input,threshold){
  if(input>=threshold){
    //console.log("Step Function: "+1);
    return 1;
  }
  else{
    //console.log("Step Function: "+ (-1);
    return -1;
  }
}

var sigmoidExp = function(input, constant){
  input = input * constant;
  var temp = (2/(1+Math.pow(Math.E, -input))) - 1;
  //console.log("Exp Sigmoid: "+temp);
  return temp;

}

var sigmoidTanh = function(input, constant){

  var temp = Math.tanh(constant*input);
  //console.log("Tanh Sigmoid: "+temp);
  return temp;

}

var piecewiseLinear = function(input, bias, min, max){

  if(input<=min){
    //console.log("piecewiseLinear: "+-1);
    return -1;
  }
  if(input>=max){
    //console.log("piecewiseLinear: "+1);
    return 1;
  }
  else {
    var temp = input + bias;
    //console.log("piecewiseLinear: "+temp);
    return (temp);
  }

}

var gaussian = function(input){

var gausConstant = 5/ Math.sqrt(2* Math.PI);


var temp = gausConstant * Math.exp(-5 * input * input) - 1;

//console.log("Gaussian: " + temp);

return temp;

}


/***************************************
            Perceptron Itself
****************************************/



var perceptron = function(input, weights, activFunc){

  //Reads and sets the weights and the input values, w() and x() in our perceptron
  this.x = [];
  this.x = input;
  this.w = [];
  this.w = weights;
  this.activFunc = activFunc;

//bias set to 0 for now.
  var bias = 0;

  this.sum = 0;
  var tempSum = 0;

  for (var i = this.x.length - 1; i >= 0; i--) {
    tempSum = tempSum + (this.w[i]*this.x[i]);
  };

  tempSum = tempSum + bias;
  this.sum = tempSum;

  switch(activFunc){
    case 0:
          this.output = stepFunction(this.sum, 0);
          break;
    case 1:
          this.output = sigmoidExp(this.sum, 6);
          break;
    case 2:
          this.output = sigmoidTanh(this.sum, 2);
          break;
    case 3:
          this.output =  piecewiseLinear(this.sum, 0, -0.5, 0.5);
          break;
    case 4:
          this.output = gaussian(this.sum, 2);
          break;
    default:
          this.output = sigmoidTanh(this.sum);
          console.log("There was an error reading the assigned activation function to this node so the default sigmoid Tanh was used!");
  }

}


/***************************************
           Topology Functions
****************************************/


var singleInputLayer = function(input,weights){
  var input_1 = new perceptron(input, weights[0][0],2);

  console.log("Input Layer (Single)");
  console.log("Input: "+ input_1.x);
  console.log("Weight: "+ input_1.w);
  console.log("Sum: "+ input_1.sum);
  console.log("Output: "+ input_1.output);
  console.log("------");

  return input_1;
}

var hiddenLayer = function(inputNode, weights){

  var hidden_1 = new perceptron([inputNode.output], weights[1],4);
  var hidden_2 = new perceptron([inputNode.output], weights[2],4);
  var hidden_3 = new perceptron([inputNode.output], weights[3],4);
  var hidden_4 = new perceptron([inputNode.output], weights[4],4);
  var hidden_5 = new perceptron([inputNode.output], weights[5],4);

  console.log("Hidden Layer outputs");
  console.log("1: " + hidden_1.output);
  console.log("2: " + hidden_2.output);
  console.log("3: " + hidden_3.output);
  console.log("4: " + hidden_4.output);
  console.log("5: " + hidden_5.output);
  /*console.log("Hidden Layer sum");
  console.log("1: " + hidden_1.sum);
  console.log("2: " + hidden_2.sum);
  console.log("3: " + hidden_3.sum);
  console.log("4: " + hidden_4.sum);
  console.log("5: " + hidden_5.sum);*/
  console.log("------");

  var hiddenNodes = [hidden_1, hidden_2, hidden_3, hidden_4 ,hidden_5];

  return hiddenNodes;

}

var outputLayer = function(hiddenNodes,weights){
  var outerLayer = new perceptron(
        [hiddenNodes[0].output,
         hiddenNodes[1].output,
         hiddenNodes[2].output,
         hiddenNodes[3].output,
         hiddenNodes[4].output
        ], weights[6], 2);

    console.log("OutputLayer");
    console.log("Sum: " + outerLayer.sum);
    console.log("Output: " + outerLayer.output);
    console.log("------");

    return outerLayer;
}


/***************************************
      Test function to run as is
****************************************/


$scope.runTheMLP = function(){

  var globalWeights = [[[Math.random()],[Math.random()]],
               [Math.random()],
               [Math.random()],
               [Math.random()],
               [Math.random()],
               [Math.random()],
               [Math.random(),Math.random(),Math.random(),Math.random(),Math.random()]
               ];

    console.log(globalWeights);

    var iLayer = singleInputLayer([Math.random()],globalWeights);
    var hLayer = hiddenLayer(iLayer,globalWeights);
    var oLayer = outputLayer(hLayer,globalWeights);
    //var temp = $scope.input_1.x - $scope.outerLayer.output;
    //console.log("Linear Error: " + temp);

    //inputWeightChange();
}

});