import Perceptron from './perceptron.js'
import Graph from './graph.js'

const graphLength = 500
const g = new Graph({ length: graphLength})

const brain = new Perceptron(0.3, 2)

const NUM_POINTS = 1000
let trainingData = []

// generating random training data
for (let i = 0; i < NUM_POINTS; i++) {
  let x = Math.random() * 2 - 1
  let y = Math.random() * 2 - 1
  let color = 'black'
  let answer = -1
  if (x >= y) {
    color = 'white'
    answer = 1
  }
  // draw the points to the graph
  trainingData.push({ inputs: [x, y, 1], answer })
  g.drawPoint(x * graphLength, y * graphLength, { color })
}

// draw out the untrained points
trainingData.forEach(({ inputs, answer }) => {
  const guess = brain.feedForward(inputs)
  const color = guess === answer ? 'green' : 'red'
  g.drawPoint(inputs[0] * graphLength, inputs[1] * graphLength, { color })
})

// tain / giess with new weights
document.body.addEventListener('click', e => {
  for (let { inputs, answer } of trainingData) {
    brain.train(inputs, answer)
    // guess with new weights
    const guess = brain.feedForward(inputs)
    const color = guess === answer ? 'green' : 'red'
    g.drawPoint(inputs[0] * graphLength, inputs[1] * graphLength, { color })
  }
  console.log('new weights', brain.weights)
})


// uncomment this to train one point per click
// let trainingIndex = 0
// document.body.addEventListener('click', () => {
//   let { inputs, answer } = trainingData[trainingIndex]
//   brain.train(inputs, answer)
//   // console.log(brain.weights)
//   const guess = brain.feedForward(inputs)
//   if (guess === answer) {
//     g.drawPoint(inputs[0] * graphLength, inputs[1] * graphLength, 'green')
//   } else {
//     g.drawPoint(inputs[0] * graphLength, inputs[1] * graphLength, 'red')
//   }
//   trainingIndex++
//   if (trainingIndex === trainingData.length) {
//     trainingIndex = 0
//   }
// })

// a line that signifies the activation function (where a points point.x >=  point.y)
g.drawLine(-250, -250, 250, 250, { color: 'grey' })
