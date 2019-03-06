class Matrix {
  /**
   * 
   * @param {number} rows - The number or rows in the matrix
   * @param {*} cols - The number of columns in the matrix
   */
  constructor (rows, cols) {
    this.rows = rows
    this.cols = cols
    this.data = []
    for (let i = 0; i < this.rows; i++) {
      this.data[i] = []
      for (let j = 0; j < this.cols; j++) {
        this.data[i][j] = 0
      }
    }
  }
  
  randomize () {
    this.map(_item => Math.floor(Math.random() * 10))
    return this
  }

  print () {
    console.table(this.data)
    return this
  }

  add (n) {
    if (n instanceof Matrix) {
      this.map((item, i, j) => n.data[i][j] + item)
    } else if (typeof n === 'number') {
      this.map(item => item + n)
    } else {
      throw new Error('number is not valid')
    }
    return this
  }
  /**
   * Returns the dot-product matrix of two other matrices
   * @param {Matrix} a - First matrix
   * @param {Matrix} b - Second matrix
   */
  static multiply (a, b) {
    if (a.rows !== b.cols) {
      throw new Error('first matrix rows must equal second matrix cols')
    }
    let result = new Matrix(a.rows, b.cols)
    for (let i = 0; i < result.rows; i++) {
      for (let j = 0; j < result.cols; j++) {
        let sum = 0
        for (let k = 0; k < a.cols; k++) {
          sum += a.data[i][k] * b.data[k][j]
        }
        result.data[i][j] = sum
      }
    }
    return result
  }

  multiply (n) {
    try { 
      if (n instanceof Matrix) {
        this.map((item, i, j) => n.data[i][j] * item)
      } else if (typeof n === 'number') {
        this.map(item => item * n)
      } else {
        throw new Error('number is not valid')
      }
    } catch (error) {
      console.error(error)
    }
  }

  map (func) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.data[i][j] = func(this.data[i][j], i, j)
      }
    }
    return this
  }

  transpose () {
    let result = new Matrix(this.cols, this.rows)
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        result.data[i][j] = this.data[i][j]
      }
    }
    return result
  }
}

// test function
// ;(function testMatrix () {
//   let m1 = new Matrix(4, 4)
//   let m2 = new Matrix(4, 4)
//   m1.randomize().print().add(1).print()
//   m2.randomize().print().add(m1).print()
//   Matrix.multiply(m1, m2).print()
// })()