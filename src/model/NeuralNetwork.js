import Matrix from './Matrix.js';

class NeuralNetwork {
    constructor (inputNodes, hiddenNodes, outputNodes) {
        this.inputNodes = inputNodes;
        this.hiddenNodes = hiddenNodes;
        this.outputNodes = outputNodes;

        this.weights_ih = new Matrix(this.hiddenNodes, this.inputNodes);
        this.weights_ho = new Matrix(this.outputNodes, this.hiddenNodes);
        this.weights_ih.randomize();
        this.weights_ho.randomize();

        this.bias_h = new Matrix(this.hiddenNodes, 1);
        this.bias_o = new Matrix(this.outputNodes, 1);
        this.bias_h.randomize();
        this.bias_o.randomize();

        this.learningRate = 0.1;
    }

    static sigmoid(x) {
        return 1 / (1 + Math.exp(-x));
    }

    static dsigmoid(y) {
        return y * (1 - y);
    }

    feedforward(inputArray) {
        let inputs = Matrix.fromArray(inputArray);
        let hidden = Matrix.dot(this.weights_ih, inputs);
        hidden.add(this.bias_h);
        hidden = Matrix.map(hidden, NeuralNetwork.sigmoid);

        let output = Matrix.dot(this.weights_ho, hidden);
        output.add(this.bias_o);
        output = Matrix.map(output, NeuralNetwork.sigmoid);

        return Matrix.toArray(output);
    }

    train(inputArray, targetArray) {
        let inputs = Matrix.fromArray(inputArray);
        let hidden = Matrix.dot(this.weights_ih, inputs);
        hidden.add(this.bias_h);
        hidden = Matrix.map(hidden, NeuralNetwork.sigmoid);

        let output = Matrix.dot(this.weights_ho, hidden);
        output.add(this.bias_o);
        output = Matrix.map(output, NeuralNetwork.sigmoid);

        let targets = Matrix.fromArray(targetArray);

        let outputErrors = Matrix.subtract(targets, output);

        let outputGradients = Matrix.map(output, NeuralNetwork.dsigmoid);
        outputGradients = Matrix.multiply(outputGradients, outputErrors);
        // outputGradients = Matrix.scalarMultiply(outputGradients, 2);
        outputGradients = Matrix.scalarMultiply(outputGradients, this.learningRate);

        let hiddenT = Matrix.transpose(hidden);
        let deltaWeightsHO = Matrix.dot(outputGradients, hiddenT);
        this.weights_ho.add(deltaWeightsHO);
        this.bias_o.add(outputGradients);

        let weightsHOT = Matrix.transpose(this.weights_ho);
        let hiddenErrors = Matrix.dot(weightsHOT, outputErrors);

        let hiddenGradients = Matrix.map(hidden, NeuralNetwork.dsigmoid);
        hiddenGradients = Matrix.multiply(hiddenGradients, hiddenErrors);
        hiddenGradients = Matrix.scalarMultiply(hiddenGradients, this.learningRate);

        let inputsT = Matrix.transpose(inputs);
        let deltaWeightsIH = Matrix.dot(hiddenGradients, inputsT);
        this.weights_ih.add(deltaWeightsIH);
        this.bias_h.add(hiddenGradients);
    }

    setLearning(lr) {
        this.learningRate = lr;
    }

    printParams() {
        console.log("Weight matrix for input and hidden layer");
        this.weights_ih.printMatrix();
        console.log("\n");
        console.log("Weight matrix for hidden and output layer");
        this.weights_ho.printMatrix();
        console.log("\n");
        console.log("Bias matrix for hidden layer");
        this.bias_h.printMatrix();
        console.log("\n");
        console.log("Bias matrix for ouput layer");
        this.bias_o.printMatrix();
    }
}

export default NeuralNetwork;