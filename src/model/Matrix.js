// File containing the essential matrix operations

class Matrix {
    constructor (rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.data = Array(this.rows).fill().map(() => Array(this.cols).fill(0));
    }

    // for random initialization
    randomize() {
        const limit = Math.sqrt(6 / (this.rows + this.cols)); // Xavier initialization
        this.data = this.data.map(row => row.map(() => (Math.random() * 2 - 1) * limit));
    }

    // Matrix addition
    add (n) {
        // Addition of Matrices
        if (n instanceof Matrix) {
            if (this.rows !== n.rows || this.cols !== n.cols) {
                console.error("Matrices must have the same dimension");
                return;
            }
            this.data = this.data.map((row, i) => row.map((element, j) => element + n.data[i][j]));
        
        // Addition of a constant to a matrix
        } else {
            this.data = this.data.map(row => row.map(element => element + n));
        }
    }

    static fromArray(arr) {
        const m = new Matrix(arr.length, 1);
        m.data = arr.map(e => [e]);
        return m;
    }

    static toArray(m) {
        let arr = [];
        for (let i = 0; i < m.rows; i++) {
            for (let j = 0; j < m.cols; j++) {
                arr.push(m.data[i][j]);
            }
        }
        return arr;
    }

    static dot(a, b) {
        if (a.cols !== b.rows) {
            console.error("Column count of matrix A should match row count of matrix B");
            return;
        }
        let result = new Matrix(a.rows, b.cols);
        result.data = result.data.map((row, i) => row.map((element, j) => {
            let sum = 0;
            for (let k = 0; k < b.rows; k++) {
                sum += a.data[i][k] * b.data[k][j];
            }
            return sum;
        }));
        return result;
    }

    static transpose(m) {
        let result = new Matrix(m.cols, m.rows);
        result.data = result.data.map((row, i) => row.map((element, j) => m.data[j][i]));
        return result;
    }

    static subtract(a, b) {
        if (a.rows !== b.rows || a.cols !== b.cols) {
            console.error("Dimensions of matrices should be same for subtraction");
            return;
        }
        let result = new Matrix(a.rows, b.cols);
        result.data = result.data.map((row, i) => row.map((element, j) => a.data[i][j] - b.data[i][j]));
        return result;
    }

    // element-wise matrix product
    static multiply(a, b) {
        if (a.rows !== b.rows || a.cols !== b.cols) {
            console.error("Dimensions of matrices should be same for subtraction");
            return;
        }
        let result = new Matrix(a.rows, b.cols);
        result.data = result.data.map((row, i) => row.map((element, j) => a.data[i][j] * b.data[i][j]));
        return result;
    }

    static scalarMultiply(m, n) {
        let result = new Matrix(m.rows, m.cols);
        result.data = m.data.map((row) => row.map((element) => element * n));
        return result;
    }

    static map(matrix, func) {
        let result = new Matrix(matrix.rows, matrix.cols);
        result.data = matrix.data.map((row, i) => row.map((element, j) => func(element, i, j)));
        return result;
    }

    printMatrix() {
    console.log("==".repeat(20));

    for (let i = 0; i < this.rows; i++) {
        let rowStr = "";
        for (let j = 0; j < this.cols; j++) {
            rowStr += this.data[i][j].toFixed(3) + " ";
        }
        console.log(rowStr.trim());
    }

    console.log("==".repeat(20));
}


}

export default Matrix;