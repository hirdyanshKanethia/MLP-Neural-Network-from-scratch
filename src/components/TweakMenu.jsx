import React, { useState } from "react";


const TweakMenu = ({ onStartTraining, onStopTraining, onRefresh, isTraining }) => {
  // State for the learning rate and number of epochs remains local to this component.
  const [learningRate, setLearningRate] = useState(0.05);
  const [epochs, setEpochs] = useState(50000);

  // The local `isTraining` state has been removed.

  // This handler now just calls the functions passed down from the parent.
  // The parent component is responsible for changing the `isTraining` state.
  const handleToggleTraining = () => {
    if (isTraining) {
      onStopTraining();
    } else {
      onStartTraining(learningRate, epochs);
    }
  };

  return (
    <div className="p-6 bg-gray-50 font-inter flex items-start justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg border border-gray-200">
        {/* Learning Rate Input */}
        <div className="mb-4">
          <label htmlFor="learningRate" className="block text-sm font-medium text-gray-700">
            Learning Rate
          </label>
          <input
            type="number"
            id="learningRate"
            value={learningRate}
            onChange={(e) => setLearningRate(parseFloat(e.target.value))}
            step="0.01"
            className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          />
        </div>

        {/* Epochs Input */}
        <div className="mb-6">
          <label htmlFor="epochs" className="block text-sm font-medium text-gray-700">
            Number of Epochs
          </label>
          <input
            type="number"
            id="epochs"
            value={epochs}
            onChange={(e) => setEpochs(parseInt(e.target.value))}
            step="1000"
            className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          />
        </div>

        {/* Control Buttons */}
        <div className="flex flex-col space-y-4">
          {/* Start/Stop Training Toggle */}
          <button
            onClick={handleToggleTraining}
            className={`w-full py-3 rounded-lg text-white font-semibold transition-all duration-300 transform hover:scale-105 shadow-md
              ${isTraining ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"}`}
          >
            {isTraining ? "Stop Training" : "Start Training"}
          </button>

          {/* Refresh Button - onRefresh is passed from App.jsx and already contains the logic to stop training. */}
          <button
            onClick={onRefresh}
            className="w-full py-3 bg-indigo-500 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:bg-indigo-600 shadow-md"
          >
            Refresh Network
          </button>
        </div>
      </div>
    </div>
  );
};

export default TweakMenu;
