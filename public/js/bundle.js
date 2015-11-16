(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

/******************************************************************************************
                                         Angular Overhead
*******************************************************************************************/

'use strict';

var app = angular.module('myApp', []);

app.controller('myCtrl', function ($scope) {

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

  var superHealthyThreshold = 5;
  var fitThreshold = 25; //This is a percentage of death. So 25 woul be 25% a fit solution will die.
  var averageThreshold = 80;
  var unFitThreshold = 95; //Same as above.

  var mutationRate = 5000; //this is in 1/1'000'000 of a % so that we can chose very small mutation rates

  var averageErrors = [];

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

  var stepFunction = function stepFunction(input, threshold) {
    if (input >= threshold) {
      //console.log("Step Function: "+1);
      return 1;
    } else {
      //console.log("Step Function: "+ (-1);
      return -1;
    }
  };

  var sigmoidExp = function sigmoidExp(input, constant) {
    input = input * constant;
    var temp = 2 / (1 + Math.pow(Math.E, -input)) - 1;
    //console.log("Exp Sigmoid: "+temp);
    return temp;
  };

  var sigmoidTanh = function sigmoidTanh(input, constant) {

    var temp = Math.tanh(constant * input);
    //console.log("Tanh Sigmoid: "+temp);
    return temp;
  };

  var piecewiseLinear = function piecewiseLinear(input, bias, min, max) {

    if (input <= min) {
      //console.log("piecewiseLinear: "+-1);
      return -1;
    }
    if (input >= max) {
      //console.log("piecewiseLinear: "+1);
      return 1;
    } else {
      var temp = input + bias;
      //console.log("piecewiseLinear: "+temp);
      return temp;
    }
  };

  var gaussian = function gaussian(input) {

    var gausConstant = 5 / Math.sqrt(2 * Math.PI);

    var temp = gausConstant * Math.exp(-5 * input * input) - 1;

    //console.log("Gaussian: " + temp);

    return temp;
  };

  /***************************************
              Perceptron Itself
  ****************************************/

  var perceptron = function perceptron(input, weights, activFunc) {

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

    for (var i = 0; i < this.x.length; i++) {
      tempSum = tempSum + this.w[i] * this.x[i];
      console.log("Temp: " + tempSum);
    };

    tempSum = tempSum + bias;
    this.sum = tempSum;
    console.log("SUM: " + this.sum);

    switch (activFunc[0]) {
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
        this.output = piecewiseLinear(this.sum, activFunc[1], activFunc[2], activFunc[3]);
        break;
      case 4:
        this.output = gaussian(this.sum, activFunc[1]);
        break;
      default:
        this.output = sigmoidTanh(this.sum, activFunc[1]);
        console.log("There was an error reading the assigned activation function to this node so the default sigmoid Tanh was used!");
    }
  };

  /***************************************
             Topology Functions
  ****************************************/

  var singleInputLayer = function singleInputLayer(input, w, aFunc) {

    //console.log("Input Weight " + w);

    var input_1 = new perceptron(input, w, aFunc[0]);

    /*console.log("Input Layer (Single)");
    console.log("Input: "+ input_1.x);
    console.log("Weight: "+ input_1.w);
    console.log("Sum: "+ input_1.sum);
    console.log("Output: "+ input_1.output);
    console.log("------");*/

    return input_1;
  };

  var hiddenLayer = function hiddenLayer(inputNode, w, aFunc) {

    //console.log("Hidden Weight " + w);
    var hidden_1 = new perceptron([inputNode.output], w.splice(0, 1), aFunc[2]);
    var hidden_2 = new perceptron([inputNode.output], w.splice(0, 1), aFunc[3]);
    var hidden_3 = new perceptron([inputNode.output], w.splice(0, 1), aFunc[4]);
    var hidden_4 = new perceptron([inputNode.output], w.splice(0, 1), aFunc[5]);
    var hidden_5 = new perceptron([inputNode.output], w.splice(0, 1), aFunc[6]);

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

    var hiddenNodes = [hidden_1, hidden_2, hidden_3, hidden_4, hidden_5];

    return hiddenNodes;
  };

  var outputLayer = function outputLayer(hiddenNodes, w, aFunc) {
    //console.log("Output Weights" + w);
    var outerLayer = new perceptron([hiddenNodes[0].output, hiddenNodes[1].output, hiddenNodes[2].output, hiddenNodes[3].output, hiddenNodes[4].output], w, aFunc[7]);

    /*console.log("OutputLayer");
    console.log("Sum: " + outerLayer.sum);
    console.log("Output: " + outerLayer.output);
    console.log("------");*/

    return outerLayer;
  };

  /***************************************
    This function creates a new MLP with
    random weights
  ****************************************/

  var createRandomAFunc = function createRandomAFunc() {

    var aFunc = [];

    var random0 = Math.floor(Math.random() * 10 / 2);
    aFunc.push(random0);
    var random1 = Math.floor(Math.random() * 10 / 2);
    aFunc.push(random1);
    if (random0 == 3) {
      var random2 = 0 - Math.random();
      aFunc.push(random2);

      var random3 = Math.random();
      aFunc.push(random3);
    } else {
      aFunc.push(0);
      aFunc.push(0);
    }

    return aFunc;
  };

  var createNewRandMLP = function createNewRandMLP(input) {
    var weights = [Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random()];

    var aFunc = [createRandomAFunc(), createRandomAFunc(), createRandomAFunc(), createRandomAFunc(), createRandomAFunc(), createRandomAFunc(), createRandomAFunc(), createRandomAFunc()];

    //divide up the weights between the nodes.
    var temp = [];
    for (var i = 0; i < weights.length; i++) {
      temp[i] = weights[i];
    }
    var inputWeights = temp.splice(0, 2);
    var hiddenWeights = temp.splice(0, 5);
    var outputWeights = temp.splice(0, 5);

    //create the three layers.
    var iLayer = singleInputLayer(input, inputWeights, aFunc);
    var hLayer = hiddenLayer(iLayer, hiddenWeights, aFunc);
    var oLayer = outputLayer(hLayer, outputWeights, aFunc);

    //error checking of the network.

    var error = Math.pow(input - oLayer.output, 2);

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
  };

  var createNewMLP = function createNewMLP(input, weights) {

    var aFunc = [createRandomAFunc(), createRandomAFunc(), createRandomAFunc(), createRandomAFunc(), createRandomAFunc(), createRandomAFunc(), createRandomAFunc(), createRandomAFunc()];

    //divide up the weights between the nodes.
    var temp = [];
    for (var i = 0; i < weights.length; i++) {
      temp[i] = weights[i];
    }
    var inputWeights = temp.splice(0, 2);
    var hiddenWeights = temp.splice(0, 5);
    var outputWeights = temp.splice(0, 5);

    //create the three layers.
    var iLayer = singleInputLayer(input, inputWeights, aFunc);
    var hLayer = hiddenLayer(iLayer, hiddenWeights, aFunc);
    var oLayer = outputLayer(hLayer, outputWeights, aFunc);

    //error checking of the network.
    var correctOutput = iLayer.x[0];
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
  };

  /*************************************
      This initialises a new population
      of size 'n'
  *************************************/

  var initializePopulation = function initializePopulation(n) {

    var size = n;

    var population = [];
    for (var i = 0; i < size; i++) {
      var temp = createNewRandMLP([Math.random()]);
      population.push(temp);
    }

    return population;
  };

  /***************************************
    This function returns the error
    information on the population passed
    Like average, min, max error.
  ****************************************/

  var errorChecking = function errorChecking(population) {

    var size = population.length;

    var totalError = 0.0;
    var minError = [1.01, -1];
    var maxError = [0.0, -1];
    var allErrors = []; //just for debug to ease reading

    for (var i = 0; i < size; i++) {
      allErrors.push(population[i].error); //just for debug!!
      var temp = Math.abs(population[i].error);
      totalError += temp;
      if (temp < minError[0]) {
        minError = [temp, i];
      }
      if (temp > maxError[0]) {
        maxError = [temp, i];
      }
    };

    var avError = totalError / size;

    var errorStats = {
      'totalError': totalError,
      'minError': minError,
      'maxError': maxError,
      'avError': avError,
      'allErrors': allErrors
    };
    console.log("Average Error: " + avError);
    averageErrors.push(avError);
    return errorStats;
  };

  var fitnessFunction = function fitnessFunction(population) {

    var errorStats = errorChecking(population);
    var threshold = errorStats.avError;
    var veryHealthy = threshold / 2;
    var superHealthy = threshold / 4;
    var insanelyHealthy = threshold / 8;
    var newPopulation = [];

    for (var i = 0; i < population.length; i++) {

      var random = Math.floor(Math.random() * 100 + 1);
      if (Math.abs(population[i].error) < insanelyHealthy) {
        newPopulation.push(population[i]);
      }
      if (Math.abs(population[i].error) < superHealthy) {
        if (random > superHealthyThreshold) {
          newPopulation.push(population[i]);
        }
      } else if (Math.abs(population[i].error) < veryHealthy) {
        if (random > fitThreshold) {
          newPopulation.push(population[i]);
          //console.log("Fit MLP added");
        }
      } else if (Math.abs(population[i].error) < threshold) {
          if (random > averageThreshold) {
            newPopulation.push(population[i]);
            //console.log("Fit MLP added");
          }
        } else {
            if (random > unFitThreshold) {
              newPopulation.push(population[i]);
              //console.log("UNFIT MLP added");
            }
          }
    }
    return newPopulation;
  };

  $scope.testMLP;
  $scope.test1 = function () {
    $scope.testMLP = createNewRandMLP(1);
  };

  $scope.test2 = function () {
    var inp = Math.random();
    checkMLP(inp, inp, 1, $scope.testMLP);
  };

  $scope.test = function (popSize, iterations) {

    //$scope.newpop = initializePopulation(popSize);
    /*
    $scope.secGen = fitnessFunction($scope.newpop);
    var difference = popSize - $scope.secGen.length
    $scope.secGen = crossOverWeights($scope.secGen,difference);
    for(var i=1;i<iterations;i++){
        $scope.secGen = fitnessFunction($scope.secGen);
        var difference = popSize - $scope.secGen.length
        $scope.secGen = crossOverWeights($scope.secGen,difference);
        console.log("Iteration: " + i)
    }
    //console.log("Errors over populations: "+ averageErrors);
    var finalErrorStats = errorChecking($scope.secGen);
    var bestMLP = finalErrorStats.minError[1];
    $scope.disp = $scope.secGen[bestMLP];
    console.log("Input: "+$scope.disp.inputLayer.x);
    console.log("Output: "+$scope.disp.outputLayer.output);
    checkMLP([-1],$scope.disp);*/
  };

  var checkMLP = function checkMLP(input, expected, sampleNumber, mlp) {

    var aFunc = mlp.aFunc;

    //divide up the weights between the nodes.
    var temp = [];
    for (var i = 0; i < mlp.weights.length; i++) {
      temp[i] = mlp.weights[i];
    }
    var inputWeights = temp.splice(0, 2);
    var hiddenWeights = temp.splice(0, 5);
    var outputWeights = temp.splice(0, 5);

    //create the three layers.
    var iLayer = singleInputLayer(input, inputWeights, aFunc);
    console.log("Input in: " + input);
    console.log("Input out: " + iLayer.output);
    var hLayer = hiddenLayer(iLayer, hiddenWeights, aFunc);
    var oLayer = outputLayer(hLayer, outputWeights, aFunc);

    mlp.inputLayer = iLayer;
    mlp.hiddenLayer = hLayer;
    mlp.outputLayer = oLayer;
    //error checking of the network.
    var error = Math.pow(expected - oLayer.output, 2) / sampleNumber;

    mlp.error = mlp.error + error;

    /*  {
      'weights': mlp.weights,
      'aFunc': mlp.aFunc,
      'inputLayer': mlp.iLayer,
      'hiddenLayer': mlp.hLayer,
      'outputLayer': mlp.oLayer,
      'error': mlp.error
    };*/
  };

  /*************************************************
      This funtion splits two parents into two parts
      and creates one child from two of those parts.
      Sometimes the two parents are the same
      which means that the parent just clones itself.
  **************************************************/

  var crossOverWeights = function crossOverWeights(population, difference) {

    var babies = [];
    var parents = [];
    var numParents = population.length;
    //this means you have killed all your population
    if (numParents == 0) {
      parents = initializePopulation(difference);
      console.log("You have set the fitnessFunction to be too harsh and you have had to create a new population");
      console.log("Maybe try relaxing the parameters");

      return parents;
    }

    var weightsSize = 12;
    //copy over parents
    for (var i = 0; i < numParents; i++) {
      parents[i] = population[i];
    }

    //whilst there is still space, randomly select two adults and splice
    for (var i = 0; i < difference; i++) {

      var ran1 = Math.floor(Math.random() * 100) % numParents;
      var ran2 = Math.floor(Math.random() * 100) % numParents;
      var ran3 = Math.floor(Math.random() * 100) % weightsSize;
      var ran4 = Math.floor(Math.random() * 1000000) + 1;
      var temp1 = [];
      var temp2 = [];

      for (var j = 0; j < weightsSize; j++) {
        temp1[j] = parents[ran1].weights[j];
        temp2[j] = parents[ran2].weights[j];
      }
      //added to a new list so that the babies don't become parents in the same generation
      var babysWeights = [];
      if (ran1 % 5 < 1) {
        for (var k = 0; k < ran3; k++) {
          babysWeights[k] = temp1[k];
        }
        for (var k = ran3; k < weightsSize; k++) {
          babysWeights[k] = temp2[k];
        }
      } else {
        for (var k = 0; k < weightsSize; k++) {
          babysWeights[k] = temp1[k];
          babysWeights[k + 1] = temp2[+1];
        }
      }

      //this randomly mutates one of the weights based on the mutation rate.
      if (ran4 < mutationRate) {
        ran4 = ran4 % 12;
        babysWeights[ran4] = Math.random();
        console.log("Mutation Occured!");
      }

      babies.push(createNewMLP([Math.random()], babysWeights));
    }

    //combine the two lists.
    for (var s = 0; s < difference; s++) {
      parents.push(babies[s]);
    }
    return parents;
  };

  /***************************************
        What is bellow works.
        However is basic and random.
  ****************************************/

  $scope.runTheMLP = function (max) {

    var oldMlp = initializePopulation(5);
    var begErrorStats = errorChecking(oldMlp);
    var newGen = randomPurging(oldMlp);
    for (var i = 1; i < max; i++) {
      newGen = randomPurging(newGen);
    }
    var endErrorStats = errorChecking(newGen);

    console.log("Beginning Stats: " + begErrorStats.avError);
    console.log("End Stats: " + endErrorStats.avError);

    var bestMLP = endErrorStats.minError[1];

    console.log("Best E: " + newGen[bestMLP].error);
    console.log("Best X: " + newGen[bestMLP].inputLayer.x);
    console.log("Best O: " + newGen[bestMLP].outputLayer.output);
    console.log("Correct: " + correct);
    $scope.bestMLP = newGen[bestMLP];
  };

  var randomPurging = function randomPurging(oldMlp) {

    var newMlp = purgeTheWeak(oldMlp);

    var difference = oldMlp.length - newMlp.length;

    procreate(newMlp, difference);

    return newMlp;
  };

  var procreate = function procreate(population, n) {

    for (var i = 0; i < n; i++) {
      var temp = createNewRandMLP([Math.random()]);
      population.push(temp);
    }

    return population;
  };

  var purgeTheWeak = function purgeTheWeak(population) {

    var errorStats = errorChecking(population);
    var threshold = errorStats.avError;
    var newPopulation = [];

    for (var i = 0; i < population.length; i++) {
      if (Math.abs(population[i].error) < threshold) {
        newPopulation.push(population[i]);
      }
    };

    return newPopulation;
  };
});

},{}]},{},[1])
//# sourceMappingURL=bundle.js.map
