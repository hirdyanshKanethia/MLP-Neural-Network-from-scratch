import React, { useState, useRef, useEffect } from "react";

const MLPDiagram = ({ hiddenCount, onHiddenCountChange }) => {
  const [neuronPositions, setNeuronPositions] = useState({});
  const containerRef = useRef(null);

  const inputCount = 2;
  const outputCount = 1;

  const addNeuron = () => {
    const newCount = Math.min(8, hiddenCount + 1);
    onHiddenCountChange(newCount);
  };
  
  const removeNeuron = () => {
    const newCount = Math.max(1, hiddenCount - 1);
    onHiddenCountChange(newCount);
  };

  // Calculate neuron positions after render
  useEffect(() => {
    const updatePositions = () => {
      if (containerRef.current) {
        const neurons = containerRef.current.querySelectorAll("[data-neuron]");
        const positions = {};

        neurons.forEach((neuron) => {
          const rect = neuron.getBoundingClientRect();
          const containerRect = containerRef.current.getBoundingClientRect();
          const layer = neuron.dataset.layer;
          const index = parseInt(neuron.dataset.index);

          if (!positions[layer]) positions[layer] = [];
          positions[layer][index] = {
            x: rect.left + rect.width / 2 - containerRect.left,
            y: rect.top + rect.height / 2 - containerRect.top,
          };
        });

        setNeuronPositions(positions);
      }
    };

    updatePositions();

    // Recalculate on resize too
    window.addEventListener("resize", updatePositions);
    return () => window.removeEventListener("resize", updatePositions);
  }, [hiddenCount]);

  const renderConnections = () => {
    if (!neuronPositions.input || !neuronPositions.hidden || !neuronPositions.output) {
      return null;
    }

    const connections = [];
    let key = 0;

    // Input to Hidden connections
    neuronPositions.input.forEach((inputPos, i) => {
      neuronPositions.hidden.forEach((hiddenPos, j) => {
        if (inputPos && hiddenPos) {
          connections.push(
            <line
              key={key++}
              x1={inputPos.x}
              y1={inputPos.y}
              x2={hiddenPos.x}
              y2={hiddenPos.y}
              stroke="#6366f1"
              strokeWidth="2"
              opacity="0.6"
            />
          );
        }
      });
    });

    // Hidden to Output connections
    neuronPositions.hidden.forEach((hiddenPos, i) => {
      neuronPositions.output.forEach((outputPos, j) => {
        if (hiddenPos && outputPos) {
          connections.push(
            <line
              key={key++}
              x1={hiddenPos.x}
              y1={hiddenPos.y}
              x2={outputPos.x}
              y2={outputPos.y}
              stroke="#6366f1"
              strokeWidth="2"
              opacity="0.6"
            />
          );
        }
      });
    });

    return connections;
  };

  const renderNeurons = (count, layer, extraClasses = "") => (
    <div className={`flex flex-col gap-6 items-center ${extraClasses}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          data-neuron
          data-layer={layer}
          data-index={i}
          className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center relative z-10 border-2 border-white shadow-lg"
        ></div>
      ))}
    </div>
  );

  return (
    <div className="p-4 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <div ref={containerRef} className="relative">
          {/* SVG for connections */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 1 }}
          >
            {renderConnections()}
          </svg>

          {/* Neural Network Layers */}
          <div className="flex justify-center gap-16 items-start py-8">
            {/* Input Layer */}
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">Input Layer</h3>
              {renderNeurons(inputCount, "input", "mt-20")}
            </div>

            {/* Hidden Layer */}
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">
                Hidden Layer ({hiddenCount} neurons)
              </h3>
              <div className="flex justify-center gap-4 mb-6">
                <button
                  onClick={addNeuron}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors shadow-md"
                >
                  +
                </button>
                <button
                  onClick={removeNeuron}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-md"
                >
                  -
                </button>
              </div>
              {renderNeurons(hiddenCount, "hidden")}
            </div>

            {/* Output Layer */}
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">Output Layer</h3>
              {renderNeurons(outputCount, "output", "mt-28")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MLPDiagram;