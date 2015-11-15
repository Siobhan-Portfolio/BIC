
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

/************************
  Global Variables
*************************/

var fitThreshold = 25; //This is a percentage of death. So 25 woul be 25% a fit solution will die.
var unFitThreshold = 75;//Same as above.
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

  switch(activFunc[0]){
    case 0:
          this.output = stepFunction(this.sum, activFunc[1]);
          break;
    case 1:
          this.output = sigmoidExp(this.sum, activFunc[1]);
          break;
    case 2:
          this.output = sigmoidTanh(this.sum, activFunc[1]);
          break;
    case 3:
          this.output =  piecewiseLinear(this.sum, activFunc[1], activFunc[2],activFunc[3]);
          break;
    case 4:
          this.output = gaussian(this.sum, activFunc[1]);
          break;
    default:
          this.output = sigmoidTanh(this.sum, activFunc[1]);
          console.log("There was an error reading the assigned activation function to this node so the default sigmoid Tanh was used!");
  }

}


/***************************************
           Topology Functions
****************************************/


var singleInputLayer = function(input,w, aFunc){

  //console.log("Input Weight " + w);

  var input_1 = new perceptron(input, w, aFunc[0]);

  /*console.log("Input Layer (Single)");
  console.log("Input: "+ input_1.x);
  console.log("Weight: "+ input_1.w);
  console.log("Sum: "+ input_1.sum);
  console.log("Output: "+ input_1.output);
  console.log("------");*/

  return input_1;
}

var hiddenLayer = function(inputNode, w, aFunc){

  //console.log("Hidden Weight " + w);
  var hidden_1 = new perceptron([inputNode.output], w.splice(0,1), aFunc[2]);
  var hidden_2 = new perceptron([inputNode.output], w.splice(0,1), aFunc[3]);
  var hidden_3 = new perceptron([inputNode.output], w.splice(0,1), aFunc[4]);
  var hidden_4 = new perceptron([inputNode.output], w.splice(0,1), aFunc[5]);
  var hidden_5 = new perceptron([inputNode.output], w.splice(0,1), aFunc[6]);

  /*console.log("Hidden Layer outputs");
  console.log("1: " + hidden_1.output);
  console.log("2: " + hidden_2.output);
  console.log("3: " + hidden_3.output);
  console.log("4: " + hidden_4.output);
  console.log("5: " + hidden_5.output);
  console.log("Hidden Layer sum");
  console.log("1: " + hidden_1.sum);
  console.log("2: " + hidden_2.sum);
  console.log("3: " + hidden_3.sum);
  console.log("4: " + hidden_4.sum);
  console.log("5: " + hidden_5.sum);
  console.log("------");*/

  var hiddenNodes = [hidden_1, hidden_2, hidden_3, hidden_4 ,hidden_5];

  return hiddenNodes;

}

var outputLayer = function(hiddenNodes,w,aFunc){
  //console.log("Output Weights" + w);
  var outerLayer = new perceptron(
        [hiddenNodes[0].output,
         hiddenNodes[1].output,
         hiddenNodes[2].output,
         hiddenNodes[3].output,
         hiddenNodes[4].output
        ], w, aFunc[7]);

    /*console.log("OutputLayer");
    console.log("Sum: " + outerLayer.sum);
    console.log("Output: " + outerLayer.output);
    console.log("------");*/

    return outerLayer;
}

/***************************************
  This function creates a new MLP with
  random weights
****************************************/

var createRandomAFunc= function(){

  var aFunc = [];

  var random0 = Math.floor((Math.random() * 10)/2);
  aFunc.push(random0);
  var random1 = Math.floor((Math.random() * 10)/2);
  aFunc.push(random1);
  if(random0 == 3){
    var random2 =0 - Math.random();
    aFunc.push(random2);

    var random3 = Math.random();
    aFunc.push(random3);
  }
  else{
    aFunc.push(0);
    aFunc.push(0);
  }

  return aFunc;

}


var createNewRandMLP = function(){
  var weights = [Math.random(),
                 Math.random(),
                 Math.random(),
                 Math.random(),
                 Math.random(),
                 Math.random(),
                 Math.random(),
                 Math.random(),
                 Math.random(),
                 Math.random(),
                 Math.random(),
                 Math.random()
                ];

    var aFunc = [createRandomAFunc(),
                 createRandomAFunc(),
                 createRandomAFunc(),
                 createRandomAFunc(),
                 createRandomAFunc(),
                 createRandomAFunc(),
                 createRandomAFunc(),
                 createRandomAFunc()
                ];


    //divide up the weights between the nodes.
    var temp = [];
    for(var i = 0; i< weights.length; i++){
      temp[i] = weights[i];
    }
    var inputWeights = temp.splice(0,2);
    var hiddenWeights = temp.splice(0,5);
    var outputWeights = temp.splice(0,5);


    //create the three layers.
    var iLayer = singleInputLayer([Math.random()], inputWeights, aFunc);
    var hLayer = hiddenLayer(iLayer, hiddenWeights, aFunc);
    var oLayer = outputLayer(hLayer, outputWeights, aFunc);


    //error checking of the network.
    var correctOutput = iLayer.x[0] * iLayer.x[0] * iLayer.x[0];
    var error = correctOutput - oLayer.output;

    //create a JS object to add to the global population
    var allLayers = {
                      'weights': weights,
                      'aFunc': aFunc,
                      'inputLayer': iLayer,
                      'hiddenLayer': hLayer,
                      'outputLayer': oLayer,
                      'error': error
                    };
    return allLayers;
}

var createNewMLP = function(weights){

    var aFunc = [createRandomAFunc(),
                 createRandomAFunc(),
                 createRandomAFunc(),
                 createRandomAFunc(),
                 createRandomAFunc(),
                 createRandomAFunc(),
                 createRandomAFunc(),
                 createRandomAFunc()
                ];


    //divide up the weights between the nodes.
    var temp = [];
    for(var i = 0; i< weights.length; i++){
      temp[i] = weights[i];
    }
    var inputWeights = temp.splice(0,2);
    var hiddenWeights = temp.splice(0,5);
    var outputWeights = temp.splice(0,5);


    //create the three layers.
    var iLayer = singleInputLayer([Math.random()], inputWeights, aFunc);
    var hLayer = hiddenLayer(iLayer, hiddenWeights, aFunc);
    var oLayer = outputLayer(hLayer, outputWeights, aFunc);


    //error checking of the network.
    var correctOutput = iLayer.x[0] * iLayer.x[0] * iLayer.x[0];
    var error = correctOutput - oLayer.output;

    //create a JS object to add to the global population
    var allLayers = {
                      'weights': weights,
                      'aFunc': aFunc,
                      'inputLayer': iLayer,
                      'hiddenLayer': hLayer,
                      'outputLayer': oLayer,
                      'error': error
                    };
    return allLayers;
}


/*************************************
    This initialises a new population
    of size 'n'
*************************************/

var initializePopulation = function(n){

  var size = n;

  var population = [];
  for (var i = 0; i<size; i++) {
    var temp = createNewRandMLP();
    population.push(temp);
  }

  return population;
}


/***************************************
  This function returns the error
  information on the population passed
  Like average, min, max error.
****************************************/

var errorChecking = function(population){

  var size = population.length;

  var totalError = 0.0;
  var minError = [1.01, -1];
  var maxError = [0.0, -1];
  var allErrors = []; //just for debug to ease reading

  for (var i = 0; i < size; i++) {
    allErrors.push(population[i].error); //just for debug!!
    var temp = Math.abs(population[i].error);
    totalError += temp;
    if(temp < minError[0]){
      minError = [temp,i];
    }
    if(temp>maxError[0]){
      maxError = [temp,i];
    }
  };

  var avError = totalError/size;

  var errorStats = {
      'totalError': totalError,
      'minError': minError,
      'maxError': maxError,
      'avError': avError,
      'allErrors': allErrors
  }
  console.log(avError);
  return errorStats;
}


var fitnessFunction = function(population){

  var errorStats = errorChecking(population);
  var threshold = errorStats.avError;
  var newPopulation = [];

  for (var i = 0; i < population.length; i++) {

    var random = (Math.floor(Math.random()*100 + 1));

    if(Math.abs(population[i].error) < threshold){
      if(random>fitThreshold){
      newPopulation.push(population[i]);
      console.log("Fit MLP added");
      }
    }
    else{
      if(random>unFitThreshold){
      newPopulation.push(population[i]);
      console.log("UNFIT MLP added");
      }
    }
  }
  console.log("1st Gen Size: " + population.length);
  console.log("2nd Gen Size: " + newPopulation.length);
  return newPopulation;


}

$scope.test = function(n){

  $scope.newpop = initializePopulation(n);

  $scope.secGen = fitnessFunction($scope.newpop);

  var difference = n - $scope.secGen.length

  $scope.babies = crossOverWeights($scope.secGen,difference);

}



/***************************************
      What is bellow works.
      However is basic and random.
****************************************/



$scope.crossing = function(){

  var population = initializePopulation(4);
  crossOver(population);
}

var crossOverWeights = function(population, difference){

    var babies = [];
    var parents = [];
    var numParents= population.length;
    //copy over parents
    for(var i = 0; i< numParents; i++){
      parents[i] = population[i];
    }

    //whilst there is still space, randomly select two adults and splice
    for(var i = 0; i <difference; i++){

      var random1 = Math.floor(Math.random() * 100)%numParents;
      var random1 = Math.floor(Math.random() * 100)%numParents;
      console.log("R1: " + random1 + "R2: "+ random2);
      var temp1 = [];
      var temp2 = [];

    }


}


/***************************************
      These functions purge the lower
      half of the population and then
      create random children to replace
      those that have been removed.
****************************************/


$scope.runTheMLP = function(max){

  var oldMlp = initializePopulation(5);
  var begErrorStats = errorChecking(oldMlp);
  var newGen = randomPurging(oldMlp);
  for(var i = 1; i< max; i++){
    newGen = randomPurging(newGen);
  }
  var endErrorStats = errorChecking(newGen);

  console.log("Beginning Stats: " + begErrorStats.avError);
  console.log("End Stats: " + endErrorStats.avError);

  var bestMLP = endErrorStats.minError[1];

  console.log("Best E: "+newGen[bestMLP].error);
  console.log("Best X: "+newGen[bestMLP].inputLayer.x);
  console.log("Best O: "+newGen[bestMLP].outputLayer.output);
  console.log("Correct: "+ correct)
  $scope.bestMLP = newGen[bestMLP];
}

var randomPurging = function(oldMlp){

  var newMlp = purgeTheWeak(oldMlp);

  var difference = (oldMlp.length - newMlp.length);

  procreate(newMlp,difference);

  return newMlp;

}

var procreate = function(population,n){

  for(var i = 0; i<n; i++){
    var temp = createNewRandMLP();
    population.push(temp);
  }

  return population;


}

var purgeTheWeak = function(population){


  var errorStats = errorChecking(population);
  var threshold = errorStats.avError;
  var newPopulation = [];

  for (var i = 0; i < population.length; i++) {
    if(Math.abs(population[i].error) < threshold){
      newPopulation.push(population[i]);
    }
  };

  return newPopulation;


}

});