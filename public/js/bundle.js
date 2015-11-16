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

  /**************************************
  
      This is all test data please ignore.
  
  ***************************************/
  var linear_data = [[-1, -1], [-0.98, -0.98], [-0.96, -0.96], [-0.94, -0.94], [-0.92, -0.92], [-0.9, -0.9], [-0.88, -0.88], [-0.86, -0.86], [-0.84, -0.84], [-0.82, -0.82], [-0.8, -0.8], [-0.78, -0.78], [-0.76, -0.76], [-0.74, -0.74], [-0.72, -0.72], [-0.7, -0.7], [-0.68, -0.68], [-0.66, -0.66], [-0.64, -0.64], [-0.62, -0.62], [-0.6, -0.6], [-0.58, -0.58], [-0.56, -0.56], [-0.54, -0.54], [-0.52, -0.52], [-0.5, -0.5], [-0.48, -0.48], [-0.46, -0.46], [-0.44, -0.44], [-0.42, -0.42], [-0.4, -0.4], [-0.38, -0.38], [-0.36, -0.36], [-0.34, -0.34], [-0.32, -0.32], [-0.3, -0.3], [-0.28, -0.28], [-0.26, -0.26], [-0.24, -0.24], [-0.22, -0.22], [-0.2, -0.2], [-0.18, -0.18], [-0.16, -0.16], [-0.14, -0.14], [-0.12, -0.12], [-0.1, -0.1], [-0.08, -0.08], [-0.06, -0.06], [-0.04, -0.04], [-0.02, -0.02], [0, 0], [0.02, 0.02], [0.04, 0.04], [0.06, 0.06], [0.08, 0.08], [0.1, 0.1], [0.12, 0.12], [0.14, 0.14], [0.16, 0.16], [0.18, 0.18], [0.2, 0.2], [0.22, 0.22], [0.24, 0.24], [0.26, 0.26], [0.28, 0.28], [0.3, 0.3], [0.32, 0.32], [0.34, 0.34], [0.36, 0.36], [0.38, 0.38], [0.4, 0.4], [0.42, 0.42], [0.44, 0.44], [0.46, 0.46], [0.48, 0.48], [0.5, 0.5], [0.52, 0.52], [0.54, 0.54], [0.56, 0.56], [0.58, 0.58], [0.6, 0.6], [0.62, 0.62], [0.64, 0.64], [0.66, 0.66], [0.68, 0.68], [0.7, 0.7], [0.72, 0.72], [0.74, 0.74], [0.76, 0.76], [0.78, 0.78], [0.8, 0.8], [0.82, 0.82], [0.84, 0.84], [0.86, 0.86], [0.88, 0.88], [0.9, 0.9], [0.92, 0.92], [0.94, 0.94], [0.96, 0.96], [0.98, 0.98]];
  var cubic_data = [[-1.0000, -1.0000], [-0.9800, -0.9412], [-0.9600, -0.8847], [-0.9400, -0.8306], [-0.9200, -0.7787], [-0.9000, -0.7290], [-0.8800, -0.6815], [-0.8600, -0.6361], [-0.8400, -0.5927], [-0.8200, -0.5514], [-0.8000, -0.5120], [-0.7800, -0.4746], [-0.7600, -0.4390], [-0.7400, -0.4052], [-0.7200, -0.3732], [-0.7000, -0.3430], [-0.6800, -0.3144], [-0.6600, -0.2875], [-0.6400, -0.2621], [-0.6200, -0.2383], [-0.6000, -0.2160], [-0.5800, -0.1951], [-0.5600, -0.1756], [-0.5400, -0.1575], [-0.5200, -0.1406], [-0.5000, -0.1250], [-0.4800, -0.1106], [-0.4600, -0.0973], [-0.4400, -0.0852], [-0.4200, -0.0741], [-0.4000, -0.0640], [-0.3800, -0.0549], [-0.3600, -0.0467], [-0.3400, -0.0393], [-0.3200, -0.0328], [-0.3000, -0.0270], [-0.2800, -0.0220], [-0.2600, -0.0176], [-0.2400, -0.0138], [-0.2200, -0.0106], [-0.2000, -0.0080], [-0.1800, -0.0058], [-0.1600, -0.0041], [-0.1400, -0.0027], [-0.1200, -0.0017], [-0.1000, -0.0010], [-0.0800, -0.0005], [-0.0600, -0.0002], [-0.0400, -0.0001], [-0.0200, -0.0000], [0.0000, 0.0000], [0.0200, 0.0000], [0.0400, 0.0001], [0.0600, 0.0002], [0.0800, 0.0005], [0.1000, 0.0010], [0.1200, 0.0017], [0.1400, 0.0027], [0.1600, 0.0041], [0.1800, 0.0058], [0.2000, 0.0080], [0.2200, 0.0106], [0.2400, 0.0138], [0.2600, 0.0176], [0.2800, 0.0220], [0.3000, 0.0270], [0.3200, 0.0328], [0.3400, 0.0393], [0.3600, 0.0467], [0.3800, 0.0549], [0.4000, 0.0640], [0.4200, 0.0741], [0.4400, 0.0852], [0.4600, 0.0973], [0.4800, 0.1106], [0.5000, 0.1250], [0.5200, 0.1406], [0.5400, 0.1575], [0.5600, 0.1756], [0.5800, 0.1951], [0.6000, 0.2160], [0.6200, 0.2383], [0.6400, 0.2621], [0.6600, 0.2875], [0.6800, 0.3144], [0.7000, 0.3430], [0.7200, 0.3732], [0.7400, 0.4052], [0.7600, 0.4390], [0.7800, 0.4746], [0.8000, 0.5120], [0.8200, 0.5514], [0.8400, 0.5927], [0.8600, 0.6361], [0.8800, 0.6815], [0.9000, 0.7290], [0.9200, 0.7787], [0.9400, 0.8306], [0.9600, 0.8847], [0.9800, 0.9412], [1.0000, 1.0000]];
  var sine_data = [[-1.0000, 0.0001], [-0.9802, 0.0621], [-0.9604, 0.1238], [-0.9406, 0.1851], [-0.9208, 0.2456], [-0.9010, 0.3052], [-0.8812, 0.3636], [-0.8614, 0.4207], [-0.8416, 0.4761], [-0.8218, 0.5297], [-0.8020, 0.5812], [-0.7822, 0.6305], [-0.7624, 0.6774], [-0.7426, 0.7217], [-0.7228, 0.7632], [-0.7030, 0.8018], [-0.6832, 0.8373], [-0.6634, 0.8696], [-0.6436, 0.8986], [-0.6238, 0.9241], [-0.6040, 0.9460], [-0.5842, 0.9643], [-0.5644, 0.9789], [-0.5446, 0.9898], [-0.5248, 0.9968], [-0.5050, 1.0000], [-0.4851, 0.9994], [-0.4653, 0.9949], [-0.4455, 0.9866], [-0.4257, 0.9745], [-0.4059, 0.9587], [-0.3861, 0.9392], [-0.3663, 0.9160], [-0.3465, 0.8894], [-0.3267, 0.8593], [-0.3069, 0.8260], [-0.2871, 0.7894], [-0.2673, 0.7499], [-0.2475, 0.7074], [-0.2277, 0.6623], [-0.2079, 0.6145], [-0.1881, 0.5645], [-0.1683, 0.5122], [-0.1485, 0.4580], [-0.1287, 0.4021], [-0.1089, 0.3445], [-0.0891, 0.2857], [-0.0693, 0.2258], [-0.0495, 0.1650], [-0.0297, 0.1035], [-0.0099, 0.0417], [0.0099, -0.0203], [0.0297, -0.0822], [0.0495, -0.1438], [0.0693, -0.2049], [0.0891, -0.2651], [0.1089, -0.3244], [0.1287, -0.3823], [0.1485, -0.4389], [0.1683, -0.4937], [0.1881, -0.5466], [0.2079, -0.5975], [0.2277, -0.6460], [0.2475, -0.6921], [0.2673, -0.7355], [0.2871, -0.7760], [0.3069, -0.8136], [0.3267, -0.8481], [0.3465, -0.8793], [0.3663, -0.9071], [0.3861, -0.9315], [0.4059, -0.9522], [0.4257, -0.9693], [0.4455, -0.9827], [0.4653, -0.9923], [0.4851, -0.9981], [0.5050, -1.0000], [0.5248, -0.9981], [0.5446, -0.9924], [0.5644, -0.9828], [0.5842, -0.9695], [0.6040, -0.9524], [0.6238, -0.9317], [0.6436, -0.9074], [0.6634, -0.8797], [0.6832, -0.8485], [0.7030, -0.8141], [0.7228, -0.7765], [0.7426, -0.7360], [0.7624, -0.6926], [0.7822, -0.6466], [0.8020, -0.5981], [0.8218, -0.5473], [0.8416, -0.4944], [0.8614, -0.4396], [0.8812, -0.3831], [0.9010, -0.3251], [0.9208, -0.2659], [0.9406, -0.2056], [0.9604, -0.1446]];
  var tanh_data = [[-1.0000, -1.0000], [-0.9800, -1.0000], [-0.9600, -1.0000], [-0.9400, -1.0000], [-0.9200, -1.0000], [-0.9000, -1.0000], [-0.8800, -1.0000], [-0.8600, -1.0000], [-0.8400, -1.0000], [-0.8200, -1.0000], [-0.8000, -1.0000], [-0.7800, -1.0000], [-0.7600, -1.0000], [-0.7400, -1.0000], [-0.7200, -1.0000], [-0.7000, -1.0000], [-0.6800, -1.0000], [-0.6600, -1.0000], [-0.6400, -1.0000], [-0.6200, -1.0000], [-0.6000, -1.0000], [-0.5800, -1.0000], [-0.5600, -1.0000], [-0.5400, -1.0000], [-0.5200, -0.9999], [-0.5000, -0.9999], [-0.4800, -0.9999], [-0.4600, -0.9998], [-0.4400, -0.9997], [-0.4200, -0.9996], [-0.4000, -0.9993], [-0.3800, -0.9990], [-0.3600, -0.9985], [-0.3400, -0.9978], [-0.3200, -0.9967], [-0.3000, -0.9951], [-0.2800, -0.9926], [-0.2600, -0.9890], [-0.2400, -0.9837], [-0.2200, -0.9757], [-0.2000, -0.9640], [-0.1800, -0.9468], [-0.1600, -0.9217], [-0.1400, -0.8854], [-0.1200, -0.8337], [-0.1000, -0.7616], [-0.0800, -0.6640], [-0.0600, -0.5370], [-0.0400, -0.3799], [-0.0200, -0.1974], [0, 0], [0.0200, 0.1974], [0.0400, 0.3799], [0.0600, 0.5370], [0.0800, 0.6640], [0.1000, 0.7616], [0.1200, 0.8337], [0.1400, 0.8854], [0.1600, 0.9217], [0.1800, 0.9468], [0.2000, 0.9640], [0.2200, 0.9757], [0.2400, 0.9837], [0.2600, 0.9890], [0.2800, 0.9926], [0.3000, 0.9951], [0.3200, 0.9967], [0.3400, 0.9978], [0.3600, 0.9985], [0.3800, 0.9990], [0.4000, 0.9993], [0.4200, 0.9996], [0.4400, 0.9997], [0.4600, 0.9998], [0.4800, 0.9999], [0.5000, 0.9999], [0.5200, 0.9999], [0.5400, 1.0000], [0.5600, 1.0000], [0.5800, 1.0000], [0.6000, 1.0000], [0.6200, 1.0000], [0.6400, 1.0000], [0.6600, 1.0000], [0.6800, 1.0000], [0.7000, 1.0000], [0.7200, 1.0000], [0.7400, 1.0000], [0.7600, 1.0000], [0.7800, 1.0000], [0.8000, 1.0000], [0.8200, 1.0000], [0.8400, 1.0000], [0.8600, 1.0000], [0.8800, 1.0000], [0.9000, 1.0000], [0.9200, 1.0000], [0.9400, 1.0000], [0.9600, 1.0000], [0.9800, 1.0000], [1.0000, 1.0000]];

  /************************
    Global Variables
  *************************/

  //Threasholds for the fitness function
  var superHealthyThreshold = 0;
  var fitThreshold = 5; //This is a percentage of death. So 25 woul be 25% a fit solution will die.
  var averageThreshold = 30;
  var unFitThreshold = 50; //Same as above.

  //The rate of mutations
  //NB: this is % so that we can chose very small mutation rates
  $scope.mutationRate = 1;

  //This is the crossOverRate
  $scope.crossOverRate = 10;

  //This is the crossOverRate
  $scope.initialPopilationSize = 1;

  //This is the crossOverRate
  $scope.maxIterations = 1;

  //This is where I store the average error per population.
  //I do this only so that I can display the data if we wish to view it.
  var averageErrors = [];

  $scope.runTimeGrahA = [];
  $scope.runTimeGrahB = [];

  //This is what is set when a function select button is pressed
  var selected_data = null;

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

  var nullFunction = function nullFunction() {
    return 0;
  };

  var sigmoidExp = function sigmoidExp(input, constant) {
    input = input * constant;
    var temp = 2 / (1 + Math.pow(Math.E, -input)) - 1;
    //console.log("Exp Sigmoid: "+temp);
    return temp;
  };

  var sigmoidTanh = function sigmoidTanh(input, constant) {

    var temp = Math.tanh(constant * input);
    //console.log("Tanh Sigmoid i: "+temp);
    //console.log("Tanh Sigmoid o: "+temp);
    return temp;
  };

  var cosineFunction = function cosineFunction(input, constant) {

    var temp = Math.cos(constant * input);
    return temp;
  };

  var gaussian = function gaussian(input) {

    var temp = 10 * Math.exp(-input * input / 2) - 5;

    //console.log("Gaussian: " + temp);

    return temp;
  };

  /***************************************
              Perceptron Itself
  
      This is the code I used to build a
      perceptron function as a base to
      build the rest of the MLP.
      It is designed to be reusable.
  ****************************************/

  var perceptron = function perceptron(input, weights, activFunc) {

    //Reads and sets the weights and the input values, w() and x() in our perceptron
    this.x = [];
    this.x = input;

    this.w = [];
    this.w = weights;
    this.activFunc = activFunc;

    //TODO: bias set to 0 for now.
    var bias = 0;

    this.sum = input[0];
    var tempSum = 0;

    for (var i = 0; i < this.x.length; i++) {
      tempSum = tempSum + this.w[i] * this.x[i];
    };

    tempSum = tempSum + bias;
    this.sum = tempSum;

    switch (activFunc[0]) {
      case 0:
        this.output = nullFunction();
        break;
      case 1:
        this.output = sigmoidExp(this.sum, activFunc[1]);
        break;
      case 2:
        this.output = sigmoidTanh(this.sum, activFunc[1]);
        break;
      case 3:
        this.output = cosineFunction(this.sum, activFunc[1]);
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
  
      Since I didn't need to evolve the
      topology of the MLP these functions
      weren't designed to be flexible.
  ****************************************/

  var singleInputLayer = function singleInputLayer(input, w, aFunc) {

    var input_1 = new perceptron(input, w, aFunc[0]);

    return input_1;
  };

  var hiddenLayer = function hiddenLayer(inputNode, w, aFunc) {

    var hidden_1 = new perceptron([inputNode.output], w.splice(0, 1), aFunc[2]);
    var hidden_2 = new perceptron([inputNode.output], w.splice(0, 1), aFunc[3]);
    var hidden_3 = new perceptron([inputNode.output], w.splice(0, 1), aFunc[4]);
    var hidden_4 = new perceptron([inputNode.output], w.splice(0, 1), aFunc[5]);
    var hidden_5 = new perceptron([inputNode.output], w.splice(0, 1), aFunc[6]);

    var hiddenNodes = [hidden_1, hidden_2, hidden_3, hidden_4, hidden_5];

    return hiddenNodes;
  };

  var outputLayer = function outputLayer(hiddenNodes, w, aFunc) {

    var outerLayer = new perceptron([hiddenNodes[0].output, hiddenNodes[1].output, hiddenNodes[2].output, hiddenNodes[3].output, hiddenNodes[4].output], w, aFunc[7]);

    return outerLayer;
  };

  /*******************************************
    This function creates a random activation
    funtion and randomises it's settings.
  ********************************************/

  var createRandomAFunc = function createRandomAFunc() {

    var aFunc = [];

    var random0 = Math.floor(Math.random() * 10 / 2);
    aFunc.push(random0);
    var random1 = Math.floor(Math.random() * 10 / 2);
    aFunc.push(random1);

    return aFunc;
  };

  /****************************************
    This function creates a new MLP with
    random weights. This is used to create
    the initial population
  *****************************************/

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
    //This isn't yet the MSE this happens later.
    //I just needed to keep track of (di-ui)^2
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

  /****************************************
    This function creates a new MLP with
    pre-set weights. This is used to create
    children from parent nodes, where only
    the weights are evolved.
  *****************************************/

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
    //This isn't yet the MSE this happens later.
    //I just needed to keep track of (di-ui)^2
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

  var createNewMLPaf = function createNewMLPaf(input, aFunc) {

    var weights = [Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random()];

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
    //This isn't yet the MSE this happens later.
    //I just needed to keep track of (di-ui)^2
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

  var createNewMLPboth = function createNewMLPboth(input, weights, aFunc) {

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
    //This isn't yet the MSE this happens later.
    //I just needed to keep track of (di-ui)^2
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

  /*************************************
      This initialises a new population
      of size 'n'
  *************************************/

  var initializePopulation = function initializePopulation(n) {

    var size = n;

    var population = [];
    for (var i = 0; i < size; i++) {
      var temp = createNewRandMLP([1]);
      population.push(temp);
    }

    return population;
  };

  /***************************************
    This function returns the error
    information on the population passed
    It'll return an object containing
    the total, average,min, max error
    and an array of all the errors.
  ****************************************/

  var errorChecking = function errorChecking(population) {

    var size = population.length;
    if (size == 0) {
      alert("Trying to read an empty population");
      return;
    }
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
    $scope.testMLP = initializePopulation(50);
    samplePopulation(linear_data, $scope.testMLP);
  };

  var samplePopulation = function samplePopulation(data, population) {
    var size = population.length;
    console.log("Size: " + size);

    for (var i = 0; i < size; i++) {
      for (var d = 0; d < data.length; d++) {
        var tempArr = checkMLP([data[d][0]], data[d][1], d, population[i]);
        $scope.runTimeGrahA.push(tempArr);
        var tempMSE = 0;
        for (var s = 0; s < $scope.runTimeGrahA.length; s++) {
          tempMSE = tempMSE + Math.pow($scope.runTimeGrahA[s][0] - $scope.runTimeGrahA[s][1], 2);
        }
        tempMSE = tempMSE / $scope.runTimeGrahA.length;
        $scope.runTimeGrahB.push(tempMSE);
      }
      var totalErr = population[i].error;
      var mse = totalErr / data.length;
      population[i].error = mse;
      console.log("MSE: " + mse);
    }
  };

  $scope.selectFunction = function (func) {

    switch (func) {
      case 0:
        selected_data = linear_data;
        break;
      case 1:
        selected_data = cubic_data;
        break;
      case 2:
        selected_data = sine_data;
        break;
      case 3:
        selected_data = tanh_data;
        break;
      default:
        alert("Error in selecting your data!");
    }
  };
  $scope.secGen;

  $scope.test = function (popSize, iterations) {

    if (selected_data == null) {
      alert("You have not selected a function!!");
    } else {
      $scope.runTimeGrahA = [];
      $scope.runTimeGrahB = [];
      $scope.newpop = initializePopulation(popSize);
      console.log("Debug1: ");
      samplePopulation(selected_data, $scope.newpop);

      $scope.secGen = fitnessFunction($scope.newpop);

      var difference = popSize - $scope.secGen.length;
      $scope.secGen = crossOverWeights($scope.secGen, difference);

      samplePopulation(selected_data, $scope.secGen);

      for (var i = 1; i < iterations; i++) {
        $scope.secGen = fitnessFunction($scope.secGen);
        var difference = popSize - $scope.secGen.length;
        $scope.secGen = crossOverWeights($scope.secGen, difference);
        samplePopulation(selected_data, $scope.secGen);
        console.log("Iteration: " + i);
      }
      //console.log("Errors over populations: "+ averageErrors);
      var finalErrorStats = errorChecking($scope.secGen);
      var bestMLP = finalErrorStats.minError[1];
      console.log("Best Score: " + finalErrorStats.minError[0]);
      $scope.disp = $scope.secGen[bestMLP];
      var ctx = document.getElementById("myChart").getContext("2d");
      var myNewChart = new Chart(ctx).PolarArea($scope.runTimeGrahA);
    }
  };

  $scope.runWithAFunc = function (popSize, iterations) {

    if (selected_data == null) {
      alert("You have not selected a function!!");
    } else {
      $scope.runTimeGrahA = [];
      $scope.runTimeGrahB = [];
      $scope.newpop = initializePopulation(popSize);
      console.log("Debug1: ");
      samplePopulation(selected_data, $scope.newpop);

      $scope.secGen = fitnessFunction($scope.newpop);

      var difference = popSize - $scope.secGen.length;
      $scope.secGen = crossOverAFunc($scope.secGen, difference);

      samplePopulation(selected_data, $scope.secGen);

      for (var i = 1; i < iterations; i++) {
        $scope.secGen = fitnessFunction($scope.secGen);
        var difference = popSize - $scope.secGen.length;
        $scope.secGen = crossOverAFunc($scope.secGen, difference);
        samplePopulation(selected_data, $scope.secGen);
        console.log("Iteration: " + i);
      }
      var finalErrorStatsFunc = errorChecking($scope.secGen);
      var bestMLPFunc = finalErrorStatsFunc.minError[1];
      $scope.disp = $scope.secGen[bestMLPFunc];
    }
  };

  $scope.runWithBoth = function (popSize, iterations) {

    if (selected_data == null) {
      alert("You have not selected a function!!");
    } else {
      $scope.runTimeGrahA = [];
      $scope.runTimeGrahB = [];
      $scope.newpop = initializePopulation(popSize);
      console.log("Debug1: ");
      samplePopulation(selected_data, $scope.newpop);

      $scope.secGen = crossOverBoth($scope.newpop, popSize);

      $scope.secGen = fitnessFunction($scope.newpop);

      var difference = popSize - $scope.secGen.length;

      samplePopulation(selected_data, $scope.secGen);

      for (var i = 1; i < iterations; i++) {
        $scope.secGen = fitnessFunction($scope.secGen);
        var difference = popSize - $scope.secGen.length;
        $scope.secGen = crossOverBoth($scope.secGen, difference);
        samplePopulation(selected_data, $scope.secGen);
        console.log("Iteration: " + i);
      }

      var finalErrorStatsBoth = errorChecking($scope.secGen);
      var bestMLPBoth = finalErrorStatsBoth.minError[1];
      $scope.disp = $scope.secGen[bestMLPBoth];
    }
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
    var hLayer = hiddenLayer(iLayer, hiddenWeights, aFunc);
    var oLayer = outputLayer(hLayer, outputWeights, aFunc);

    mlp.inputLayer = iLayer;
    mlp.hiddenLayer = hLayer;
    mlp.outputLayer = oLayer;
    //error checking of the network.
    var error = (expected - oLayer.output) * (expected - oLayer.output);

    mlp.error = mlp.error + error;

    /*  {
      'weights': mlp.weights,
      'aFunc': mlp.aFunc,
      'inputLayer': mlp.iLayer,
      'hiddenLayer': mlp.hLayer,
      'outputLayer': mlp.oLayer,
      'error': mlp.error
    };*/
    var myArray = [expected, oLayer.output];
    return myArray;
  };

  /*************************************************
      The following 3 funtion splits two parents into
      two parts and creates one child from two of those
      One does weight, one does activation function and
      an other does both.
  **************************************************/

  /*****************************************************
  *
  *       This function Crosses over both the activation
  *       and the weights
  *
  *
  ******************************************************/

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
    for (var i = 0; i < $scope.crossOverRate; i++) {

      var ran1 = Math.floor(Math.random() * 100) % numParents;
      var ran2 = Math.floor(Math.random() * 100) % numParents;
      var ran3 = Math.floor(Math.random() * 100) % weightsSize;
      var ran4 = Math.floor(Math.random() * 100) + 1;
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
      if (ran4 < $scope.mutationRate) {
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

  /*****************************************************
  *
  *       This function Crosses over both the activation
  *       and the weights
  *
  *
  ******************************************************/

  var crossOverBoth = function crossOverBoth(population, difference) {

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
    var aFuncSize = 8;
    //copy over parents
    for (var i = 0; i < numParents; i++) {
      parents[i] = population[i];
    }

    //whilst there is still space, randomly select two adults and splice
    for (var i = 0; i < $scope.crossOverRate; i++) {

      var ran1 = Math.floor(Math.random() * 100) % numParents;
      var ran2 = Math.floor(Math.random() * 100) % numParents;
      var ran3 = Math.floor(Math.random() * 100) % weightsSize;
      var ran4 = Math.floor(Math.random() * 100) + 1;
      var ran5 = Math.floor(Math.random() * 100) + 1;
      var temp1w = [];
      var temp2w = [];
      var temp1f = [];
      var temp2f = [];

      for (var j = 0; j < weightsSize; j++) {
        temp1w[j] = parents[ran1].weights[j];
        temp2w[j] = parents[ran2].weights[j];
      }
      for (var j = 0; j < weightsSize; j++) {
        temp1f[j] = parents[ran1].aFunc[j];
        temp2f[j] = parents[ran2].aFunc[j];
      }
      //added to a new list so that the babies don't become parents in the same generation
      var babysWeights = [];
      if (ran1 % 5 < 1) {
        for (var k = 0; k < ran3; k++) {
          babysWeights[k] = temp1w[k];
        }
        for (var k = ran3; k < weightsSize; k++) {
          babysWeights[k] = temp2w[k];
        }
      } else {
        for (var k = 0; k < weightsSize; k++) {
          babysWeights[k] = temp1w[k];
          babysWeights[k + 1] = temp2w[+1];
        }
      }
      var babysAFunc = [];
      if (ran2 % 5 < 1) {
        for (var k = 0; k < ran3; k++) {
          babysAFunc[k] = temp1f[k];
        }
        for (var k = ran3; k < weightsSize; k++) {
          babysAFunc[k] = temp2f[k];
        }
      } else {
        for (var k = 0; k < weightsSize; k++) {
          babysAFunc[k] = temp1f[k];
          babysAFunc[k + 1] = temp2f[+1];
        }
      }

      //this randomly mutates one of the weights based on the mutation rate.
      if (ran4 < $scope.mutationRate) {
        ran4 = ran4 % 12;
        babysWeights[ran4] = Math.random();
        console.log("Mutation Occured!");
      }
      if (ran5 < $scope.mutationRate) {
        ran4 = ran4 % 12;
        babysAFunc[ran4] = Math.random();
        console.log("Mutation Occured!");
      }

      babies.push(createNewMLPboth([Math.random()], babysWeights, babysAFunc));
    }

    //combine the two lists.
    for (var s = 0; s < difference; s++) {
      parents.push(babies[s]);
    }
    return parents;
  };

  /*****************************************************
  *
  *  This function Crosses over both the activation only
  *
  ******************************************************/

  var crossOverAFunc = function crossOverAFunc(population, difference) {

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

    var aFuncSize = 8;
    //copy over parents
    for (var i = 0; i < numParents; i++) {
      parents[i] = population[i];
    }

    //whilst there is still space, randomly select two adults and splice
    for (var i = 0; i < $scope.crossOverRate; i++) {

      var ran1 = Math.floor(Math.random() * 100) % numParents;
      var ran2 = Math.floor(Math.random() * 100) % numParents;
      var ran3 = Math.floor(Math.random() * 100) % aFuncSize;
      var ran4 = Math.floor(Math.random() * 100) + 1;
      var temp1 = [];
      var temp2 = [];

      for (var j = 0; j < aFuncSize; j++) {
        temp1[j] = parents[ran1].aFunc[j];
        temp2[j] = parents[ran2].aFunc[j];
      }
      //added to a new list so that the babies don't become parents in the same generation
      var babysAFunc = [];
      if (ran1 % 5 < 1) {
        for (var k = 0; k < ran3; k++) {
          babysAFunc[k] = temp1[k];
        }
        for (var k = ran3; k < aFuncSize; k++) {
          babysAFunc[k] = temp2[k];
        }
      } else {
        for (var k = 0; k < aFuncSize; k++) {
          babysAFunc[k] = temp1[k];
          babysAFunc[k + 1] = temp2[+1];
        }
      }

      //this randomly mutates one of the weights based on the mutation rate.
      if (ran4 < $scope.mutationRate) {
        ran4 = ran4 % 12;
        babysAFunc[ran4] = Math.random();
        console.log("Mutation Occured!");
      }

      babies.push(createNewMLPaf([Math.random()], babysAFunc));
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

  /*
  var margin = {top: 20, right: 20, bottom: 30, left: 50},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;
  
  var parseDate = d3.time.format("%d-%b-%y").parse;
  
  var x = d3.time.scale()
      .range([0, width]);
  
  var y = d3.scale.linear()
      .range([height, 0]);
  
  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");
  
  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");
  
  var line = d3.svg.line()
      .x(function(d) { return x(d.date); })
      .y(function(d) { return y(d.close); });
  
  var svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  
    x.domain(d3.extent($scope.secGen, function(d) { return $scope.secGen; }));
    y.domain(d3.extent(data, function(d) { return d.close; }));
  
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);
  
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Price ($)");
  
    svg.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line);
  });*/
});

},{}]},{},[1])
//# sourceMappingURL=bundle.js.map
