const rand = () => Math.random() * 2 - 1

export default class Perceptron {
  constructor (length = 2, learningRate = 0.1) {
    this.learningRate = learningRate
    // input weights
    this.weights = new Array(length)
    for (let i = 0; i < length; i++) {
      this.weights[i] = rand()
    }
  }

  /**
   * 
   * @param {Array<number>} inputs - Array of inputs that we're trying to classify
   * @param {number} target - The known answer
   */
  train (inputs, target) {
    const guess = this.feedforward(inputs)
    const error = target - guess
    for (let i in this.weights) {
      this.weights[i] += error * inputs[i] * this.learningRate
    }
  }

  /**
   * calculates (weight1 * input2) + (weight2 * input2) ...  (weightN * inputN)
   * Once weighted sum of inputs is found, it is passed to this.active(sum)
   * @param {Array<number>} inputs - Inputs
   */
  feedforward (inputs) {
    const sum = this.weights.reduce((sum, weight, i) => sum + inputs[i] * weight, 0)
    return this.activate(sum)
  }

  /**
   * 
   * @param {numbner} sum - result of the sign of the sum.
   */
  activate (sum) {
    return sum >= 0 ? 1 : -1
  }
}