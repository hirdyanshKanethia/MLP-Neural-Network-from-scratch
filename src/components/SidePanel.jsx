import React from 'react';
import { X, Brain, Target, TrendingUp, Layers, Zap, Info, BookOpen, Settings, TestTube, Lightbulb } from 'lucide-react';

import xorgraph from '../assets/xor-graph.png';
import perceptron from '../assets/perceptron.png';
import xorsolution from '../assets/xor-solution.png';

const SidePanel = ({ isOpen, onClose, neuralNetwork, lossData, isTraining, hiddenCount }) => {
  const getNetworkStatus = () => {
    if (isTraining) return "Training in Progress";
    if (lossData.length > 0) return "Training Complete";
    return "Ready to Train";
  };

  const getCurrentLoss = () => {
    if (lossData.length === 0) return "N/A";
    return lossData[lossData.length - 1].loss.toFixed(6);
  };

  const getTrainingProgress = () => {
    if (lossData.length === 0) return 0;
    const latestEpoch = lossData[lossData.length - 1].epoch;
    return latestEpoch;
  };

  const testNetworkPredictions = () => {
    if (!neuralNetwork?.current) return [];
    
    const testCases = [
      { input: [0, 0], expected: 0 },
      { input: [0, 1], expected: 1 },
      { input: [1, 0], expected: 1 },
      { input: [1, 1], expected: 0 }
    ];

    return testCases.map(test => {
      const output = neuralNetwork.current.feedforward(test.input);
      return {
        ...test,
        predicted: output[0],
        accuracy: Math.abs(test.expected - output[0]) < 0.1 ? "✓" : "✗"
      };
    });
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}
      
      {/* Sliding Panel */}
      <div className={`
        fixed top-0 right-0 h-full w-3/4 bg-white shadow-2xl z-50 
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        overflow-y-auto
      `}>
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 flex justify-between items-center sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <Brain className="w-6 h-6" />
            <h2 className="text-xl font-bold">Project Overview</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Network Status */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
            <div className="flex items-center gap-3 mb-2">
              <Zap className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-gray-800">Current Status</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Status:</span>
                <span className="ml-2 font-medium">{getNetworkStatus()}</span>
              </div>
              <div>
                <span className="text-gray-600">Hidden Neurons:</span>
                <span className="ml-2 font-medium">{hiddenCount}</span>
              </div>
              <div>
                <span className="text-gray-600">Current Loss:</span>
                <span className="ml-2 font-medium">{getCurrentLoss()}</span>
              </div>
              <div>
                <span className="text-gray-600">Epochs:</span>
                <span className="ml-2 font-medium">{getTrainingProgress().toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Problem Overview */}
          <div className="bg-orange-50 rounded-lg p-6 border border-orange-200">
            <div className="bg-white rounded p-4 mt-4">
              <h4 className="font-medium text-gray-800 mb-2">XOR Truth Table:</h4>
                <div className="grid grid-cols-3 gap-2 text-center text-sm">
                  <div className="font-semibold bg-gray-100 p-2 rounded">A</div>
                  <div className="font-semibold bg-gray-100 p-2 rounded">B</div>
                  <div className="font-semibold bg-gray-100 p-2 rounded">XOR</div>
                  <div className="p-2">0</div><div className="p-2">0</div><div className="p-2 font-medium text-red-600">0</div>
                  <div className="p-2">0</div><div className="p-2">1</div><div className="p-2 font-medium text-green-600">1</div>
                  <div className="p-2">1</div><div className="p-2">0</div><div className="p-2 font-medium text-green-600">1</div>
                  <div className="p-2">1</div><div className="p-2">1</div><div className="p-2 font-medium text-red-600">0</div>
                </div>
              </div>
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-5 h-5 text-orange-600" />
              <h3 className="text-lg font-semibold text-gray-800">Problem Overview</h3>
            </div>
            <div className="prose prose-sm max-w-none text-gray-700">
              <p className="mb-4">
                The XOR (Exclusive OR) problem is a classic non-linearly separable classification task.
              </p>
              
              {/* XOR Graph Image */}
              <div className="my-4">
                <img 
                  src={xorgraph} 
                  alt="XOR Problem Visualization" 
                  className="w-3/4 mx-auto rounded-lg border shadow-sm"
                />
                <p className="text-xs text-gray-500 mt-2 text-center">XOR Problem: Non-linearly separable data points</p>
              </div>
              
              <p className="mb-4">
                What makes it special is that it is non-linearly separable. This makes it a slightly more complex problem that requires a hidden layer of <strong>perceptrons</strong> to learn the complex decision boundary.
              </p>
              
            </div>
          </div>

          {/* What is a Perceptron */}
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
            <div className="flex items-center gap-3 mb-4">
              <Brain className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-800">What is a Perceptron?</h3>
            </div>
            <div className="prose prose-sm max-w-none text-gray-700">
              <p className="mb-4">
                A perceptron is a very simple artificial neuron, inspired from the biological neurons in all of us. It works in a very similar way - takes input signals and gives output signals, but there's more to it.
              </p>
                            
              <p className="mb-4">
                The perceptron takes inputs (x₁, x₂, x₃...), multiplies them by weights (w₁, w₂, w₃...), adds a bias value (b), creating a linear function z = wᵀx + b. This z value is then passed through an activation function.
              </p>
              
              {/* Perceptron Diagram */}
              <div className="my-4">
                <img 
                  src={perceptron} 
                  alt="Perceptron Structure Diagram" 
                  className="w-3/4 mx-auto rounded-lg border shadow-sm bg-white p-4"
                />
                <p className="text-xs text-gray-500 mt-2 text-center">Basic structure of a perceptron with inputs, weights, and activation function</p>
              </div>
              <div className="bg-white rounded p-4 mt-4">
                <p className="font-medium text-gray-800 mb-2">Mathematical Formula:</p>
                <div className="bg-gray-100 p-3 rounded font-mono text-sm">
                  y = f(Σwᵢxᵢ + b)
                </div>
                <div className="mt-3 text-sm space-y-1">
                  <div><strong>xᵢ</strong> = inputs</div>
                  <div><strong>wᵢ</strong> = weights (how important each input is)</div>
                  <div><strong>b</strong> = bias (shifts decision boundary)</div>
                  <div><strong>f(·)</strong> = activation function (e.g., step, sigmoid, ReLU)</div>
                  <div><strong>y</strong> = output (often 0 or 1 for classification)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Solution Approach */}
          <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
            <div className="flex items-center gap-3 mb-4">
              <Layers className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-800">How We Solve the Problem</h3>
            </div>
            <div className="prose prose-sm max-w-none text-gray-700">
              <p className="mb-4">
                Adding hidden layers or hidden neurons to the network allows it to fit/adapt to more complex problems. These are referred to as <strong>Deep Neural Networks (DNNs)</strong>, because of their depth in hidden neurons and layers of neurons.
              </p>
              <p className="mb-4">
                In theory, a large enough DNN with nonlinear activations can theoretically approximate any continuous function.
              </p>
              
              {/* Network Solution Diagram */}
              <div className="my-4">
                <img 
                  src={xorsolution} 
                  alt="Neural Network Solution for XOR" 
                  className="w-2/4 mx-auto rounded-lg border shadow-sm bg-white p-2"
                />
                <p className="text-xs text-gray-500 mt-2 text-center">Neural network architecture solving the XOR problem</p>
              </div>
            </div>
          </div>

          {/* Backpropagation */}
          <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-200">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-5 h-5 text-indigo-600" />
              <h3 className="text-lg font-semibold text-gray-800">Neural Networks and Backpropagation</h3>
            </div>
            <div className="prose prose-sm max-w-none text-gray-700">
              <p className="mb-4">
                One big problem in neural network development was finding an algorithm to calculate gradients for each layer, neuron, weight, and bias, while updating them appropriately. This was solved with the <strong>Backpropagation algorithm</strong>.
              </p>
              <p className="mb-4">
                There are two major phases in backpropagation:
              </p>
              <div className="bg-white rounded p-4 space-y-3">
                <div>
                  <strong className="text-indigo-600">Forward Pass:</strong> Calculates the output value of each neuron up to the output layer.
                </div>
                <div>
                  <strong className="text-indigo-600">Backward Pass:</strong> Calculates gradients to minimize the cost function and updates parameters accordingly.
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-600">
                The mathematics involves complex methods like the chain rule of partial derivatives.
              </p>
            </div>
          </div>

          {/* Playground Explanation */}
          <div className="bg-emerald-50 rounded-lg p-6 border border-emerald-200">
            <div className="flex items-center gap-3 mb-4">
              <Settings className="w-5 h-5 text-emerald-600" />
              <h3 className="text-lg font-semibold text-gray-800">Playground Controls Explained</h3>
            </div>
            <div className="space-y-4">
              <div className="bg-white rounded p-4">
                <h4 className="font-semibold text-emerald-700 mb-2">Learning Rate</h4>
                <p className="text-sm text-gray-700 mb-2">
                  The learning rate refers to the size of the step taken down the slope in gradient descent. 
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Too large:</strong> Algorithm will never converge. <strong>Too small:</strong> Long training times.
                </p>
              </div>

              <div className="bg-white rounded p-4">
                <h4 className="font-semibold text-emerald-700 mb-2">Epochs</h4>
                <p className="text-sm text-gray-700 mb-2">
                  Epochs are the number of training iterations. Each epoch involves training on the data.
                </p>
                <p className="text-sm text-gray-700">
                  <strong>More epochs:</strong> Higher accuracy, longer training. <strong>Too few:</strong> Poor accuracy.
                </p>
              </div>

              <div className="bg-white rounded p-4">
                <h4 className="font-semibold text-emerald-700 mb-2">Refreshing the Network</h4>
                <p className="text-sm text-gray-700">
                  Randomizes weights and biases. Essential for proper functioning - symmetric networks can't learn complex patterns.
                </p>
              </div>

              <div className="bg-white rounded p-4">
                <h4 className="font-semibold text-emerald-700 mb-2">Loss Function</h4>
                <p className="text-sm text-gray-700">
                  Plots the model's accuracy loss against epochs, showing how the model converges to an acceptable solution.
                </p>
              </div>
            </div>
          </div>


          {/* What to Explore */}
          <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
            <div className="flex items-center gap-3 mb-4">
              <Lightbulb className="w-5 h-5 text-yellow-600" />
              <h3 className="text-lg font-semibold text-gray-800">What to Explore</h3>
            </div>
            <div className="space-y-4 text-sm text-gray-700">
              <div className="bg-white rounded p-4">
                <h4 className="font-semibold text-yellow-700 mb-2">🎛️ Learning Rate Experiments</h4>
                <p>Try setting a very small learning rate. You'll see the model converges slower (more epochs for lower loss). Too small and it may never reach its potential!</p>
              </div>
              
              <div className="bg-white rounded p-4">
                <h4 className="font-semibold text-yellow-700 mb-2">🧠 Hidden Layer Experiments</h4>
                <ul className="space-y-2 ml-4">
                  <li className="list-disc"><strong>Increase neurons:</strong> Model may converge faster with better accuracy</li>
                  <li className="list-disc"><strong>Decrease neurons:</strong> Slower convergence, slightly lower accuracy</li>
                  <li className="list-disc"><strong>Try just 1 neuron:</strong> Will never solve XOR properly - 2 is the bare minimum!</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidePanel;