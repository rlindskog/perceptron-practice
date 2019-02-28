const rand = () => Math.random() * 2 - 1

export default class Perceptron {
  constructor (learningRate = 0.1, length = 2) {
    this.learningRate = learningRate
    // input weights
    this.weights = new Array(length)
    for (let i in [...this.weights]) {
      this.weights[i] = rand()
    }
  }

  /**
   * 
   * @param {Array<number>} inputs - Array of inputs that we're trying to classify
   * @param {number} label - The known answer of those inputs
   */
  train (inputs, label) {
    const guess = this.feedForward(inputs)
    const error = label - guess
    for (let i in this.weights) {
      this.weights[i] += error * inputs[i] * this.learningRate
    }
  }

  /**
   * calculates (weight1 * input2) + (weight2 * input2) ...  (weightN * inputN)
   * Once weighted sum of inputs is found, it is passed to this.active(sum)
   * @param {Array<number>} inputs - Inputs
   */
  feedForward (inputs) {
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