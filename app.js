import Perceptron from './perceptron.js'
import Graph from './graph.js'

const graphLength = 500
const g = new Graph({ length: graphLength, pointRadius: 5 })

const brain = new Perceptron(2, 0.5)

let trainingData = []

// generating random training data
for (let i = 0; i < 100; i++) {
  let x = Math.random()
  let y = Math.random()
  let color
  let answer
  if (x >= y) {
    color = 'white'
    answer = 1
  } else {
    color = 'black'
    answer = -1
  }

  // draw the points to the graph
  trainingData.push({ inputs: [x, y, 1], answer })
  g.drawPoint(x * graphLength, y * graphLength, color)
}

// draw out the untrained points
trainingData.forEach(({ inputs, answer }) => {
  const guess = brain.feedforward(inputs)
  if (guess === answer) {
    g.drawPoint(inputs[0] * graphLength, inputs[1] * graphLength, 'green')
  } else {
    g.drawPoint(inputs[0] * graphLength, inputs[1] * graphLength, 'red')
  }
})

document.body.addEventListener('click', e => {
  for (let { inputs, answer } of trainingData) {
    brain.train(inputs, answer)
    const guess = brain.feedforward(inputs)
    if (guess === answer) {
      g.drawPoint(inputs[0] * graphLength, inputs[1] * graphLength, 'green')
    } else {
      g.drawPoint(inputs[0] * graphLength, inputs[1] * graphLength, 'red')
    }
  }
  console.log("new weights", brain.weights)
})


// uncomment this to train one point per click
// let trainingIndex = 0
// document.body.addEventListener('click', () => {
//   let { inputs, answer } = trainingData[trainingIndex]
//   brain.train(inputs, answer)
//   // console.log(brain.weights)
//   const guess = brain.feedforward(inputs)
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

g.drawLine(0, 0, 500, 500, 'grey')
