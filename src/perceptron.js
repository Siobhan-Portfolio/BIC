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

var perceptron = function(nodeID, activationFunction){

this.nodeID = nodeID;
this.activationFunction = activationFunction;

}

var buttonPress = function(){
var test = new perceptron("hello", "world");

console.log("ID: " + test.nodeID)
console.log("Func: " + test.activationFunction);
}