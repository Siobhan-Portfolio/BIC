(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

/******************************************************************************************
                                         Angular Overhead
*******************************************************************************************/

'use strict';

var app = angular.module('myApp', []);

app.controller('myCtrl', function ($scope) {
  $scope.firstName = "John";
  $scope.lastName = "Doe";

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

  var stepFunction = function stepFunction(i) {
    if (i >= 0) {
      return 1;
    } else {
      return -1;
    }
  };

  var perceptron = function perceptron(input) {

    this.i = input;
    var weights = Math.random();
    var sum = input * weights;
    this.output = stepFunction(sum);
  };

  var one = 1;

  $scope.print = function () {
    $scope.pTest = new perceptron(-0.5);
    console.log($scope.pTest.output);
  };
});

},{}]},{},[1])
//# sourceMappingURL=bundle.js.map
