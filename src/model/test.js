import NeuralNetwork from './NeuralNetwork.js'

const trainingData = [
  { inputs: [0, 0], targets: [0] },
  { inputs: [0, 1], targets: [1] },
  { inputs: [1, 0], targets: [1] },
  { inputs: [1, 1], targets: [0] }
];

let NN = new NeuralNetwork(2, 1, 1);
NN.learningRate = 0.05;

let epochs = 100000;

for (let i = 0; i < epochs; i++) {
  for (let i = 0; i < trainingData.length; ++i) {
    NN.train(trainingData[i].inputs, trainingData[i].targets);
  }
}

NN.printParams();

// Test the trained network
console.log("----------------------------------------");
console.log("Testing trained network:");
console.log("----------------------------------------");

for (const data of trainingData) {
  const prediction = NN.feedforward(data.inputs);
  const formattedPrediction = prediction[0].toFixed(4); // Format to 4 decimal places
  console.log(`Input: [${data.inputs[0]}, ${data.inputs[1]}] -> Target: ${data.targets[0]} -> Prediction: ${formattedPrediction}`);
}