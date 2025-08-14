import React, { useState, useEffect, useRef } from "react";
import NeuralNetwork from './model/NeuralNetwork';
import MLPDiagram from './components/MLPDiagram'
import TweakMenu from "./components/TweakMenu";
import LossGraph from "./components/LossGraph";
import TestResult from "./components/TestResult";
import xorData from './model/xorData';
import { Info } from "lucide-react";
import SidePanel from './components/SidePanel';


function App() {
  const neuralNetwork = useRef(null);
  
  const [epochs, setEpochs] = useState(50000);
  const [isTraining, setIsTraining] = useState(false);
  const [lossData, setLossData] = useState([]);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [hiddenCount, setHiddenCount] = useState(3);
  const [networkReady, setNetworkReady] = useState(false);

  // Initialize neural network
  useEffect(() => {
    neuralNetwork.current = new NeuralNetwork(2, hiddenCount, 1);
    setNetworkReady(true); // Trigger re-render when network is ready
    console.log(`Neural network created with ${hiddenCount} hidden neurons`);
  }, [hiddenCount]);

  // Training loop
  useEffect(() => {
    let animationFrameId;
    let currentEpoch = 0;

    const trainLoop = () => {
      for (let i = 0; i < 1000; i++) {
        const data = xorData[Math.floor(Math.random() * xorData.length)];
        neuralNetwork.current.train(data.inputs, data.targets);
        currentEpoch++;

        if (currentEpoch % 200 === 0) {
          const loss = calculateTotalError(neuralNetwork.current, xorData);
          setLossData(prevData => [...prevData, { epoch: currentEpoch, loss: loss }]);
        }
      }

      if (currentEpoch < epochs) {
        animationFrameId = requestAnimationFrame(trainLoop);
      } else {
        setIsTraining(false);
        console.log("Training complete!");
      }
    };

    if (isTraining) {
      trainLoop();
    } else {
      cancelAnimationFrame(animationFrameId);
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, [isTraining, epochs]);

  const calculateTotalError = (nn, data) => {
    let sumSquaredError = 0;
    for (const item of data) {
      const output = nn.feedforward(item.inputs);
      const error = item.targets[0] - output[0];
      sumSquaredError += error * error;
    }
    return sumSquaredError / data.length;
  };

  const handleStartTraining = (lr, numEpochs) => {
    neuralNetwork.current.setLearning(lr);
    setEpochs(numEpochs);
    setIsTraining(true);
  };

  const handleStopTraining = () => {
    setIsTraining(false);
  };

  const handleRefresh = () => {
    handleStopTraining();
    // Create new network with current hidden count
    neuralNetwork.current = new NeuralNetwork(2, hiddenCount, 1);
    setLossData([]);
    setIsTraining(false);
    setNetworkReady(true); // Ensure network ready state is set
  };

  // Handler for when hidden layer count changes
  const handleHiddenCountChange = (newCount) => {
    // Stop training if currently training
    if (isTraining) {
      setIsTraining(false);
    }
    
    // Update hidden count state
    setHiddenCount(newCount);
    
    // Clear previous training data since we're changing architecture
    setLossData([]);
    setNetworkReady(false); // Reset network ready state
    
    console.log(`Hidden layer count changed to: ${newCount}`);
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Neural Network Playground</h1>
                <p className="text-gray-600">XOR Classification Problem with Real-time Visualization</p>
              </div>
            </div>
            
            {/* Summary Panel Toggle Button */}
            <button
              onClick={() => setIsSummaryOpen(true)}
              className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-2 py-2 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              <Info className="w-6 h-6" />
              <span className="hidden sm:inline"></span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-8">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Controls Sidebar */}
          <div className="xl:col-span-2">
            <TweakMenu
              onStartTraining={handleStartTraining}
              onStopTraining={handleStopTraining}
              onRefresh={handleRefresh}
              isTraining={isTraining}
            />
          </div>
          
          {/* Network Visualization */}
          <div className="xl:col-span-2">
            <MLPDiagram 
              hiddenCount={hiddenCount}
              onHiddenCountChange={handleHiddenCountChange}
            />
          </div>
        </div>
        
        {/* Loss Graph and Test Results */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Loss Graph - Takes up 2/3 of the width */}
          <div className="lg:col-span-2">
            <LossGraph data={lossData} />
          </div>
          
          {/* Test Results - Takes up 1/3 of the width */}
          <div className="lg:col-span-1">
            <TestResult neuralNetwork={neuralNetwork} networkReady={networkReady} />
          </div>
        </div>
      </div>

      {/* Project Summary Panel */}
      <SidePanel
        isOpen={isSummaryOpen}
        onClose={() => setIsSummaryOpen(false)}
        neuralNetwork={neuralNetwork}
        lossData={lossData}
        isTraining={isTraining}
        hiddenCount={hiddenCount}
      />
    </div>
  );
}

export default App;