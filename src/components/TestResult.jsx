import React from 'react';
import { Info } from 'lucide-react';

const TestResult = ({ neuralNetwork, networkReady }) => {
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
        <div>
            {neuralNetwork?.current && networkReady && (
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center gap-3 mb-3">
                        <Info className="w-5 h-5 text-gray-600" />
                        <h3 className="font-semibold text-gray-800">Current Predictions</h3>
                    </div>
                    <div className="space-y-2">
                        {testNetworkPredictions().map((test, idx) => (
                            <div key={idx} className="flex justify-between items-center text-sm bg-white p-2 rounded">
                                <span>XOR({test.input[0]}, {test.input[1]})</span>
                                <span>Expected: {test.expected}</span>
                                <span>Got: {test.predicted.toFixed(3)}</span>
                                <span className={test.accuracy === "✓" ? "text-green-600" : "text-red-600"}>
                                    {test.accuracy}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>        
    );
};

export default TestResult;