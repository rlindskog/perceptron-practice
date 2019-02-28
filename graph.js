export default class Graph {
  /**
   * A class for mapping points and lines to a a cartesian plane
   * @param {*} param0 
   */
  constructor ({
    length = 100,
    backgroundColor = 'white',
    pointColor = 'black',
    lineColor = 'black',
    mountingPoint = document.body,
    pointRadius = 2,
    includeAxis = true
  } = {}) {
    this.length = length
    this.backgroundColor = backgroundColor
    this.pointColor = pointColor
    this.lineColor = lineColor
    this.canvas = document.createElement('canvas')
    this.canvas.style.border = '1px solid black'
    this.canvas.width = this.length
    this.canvas.height = this.length
    this.pointRadius = pointRadius
    mountingPoint.appendChild(this.canvas)
    this.context = this.canvas.getContext('2d')
    this.context.beginPath()
    this.context.rect(0, 0, this.length, this.length)
    this.context.fillStyle = this.backgroundColor
    this.context.fill()
    this.points = []
    this.includeAxis = includeAxis
    if (this.includeAxis) {
      this.drawLine(-this.length / 2, 0, this.length / 2, 0, { dotted: true, color: 'grey' })
      this.drawLine(0, -this.length / 2, 0, this.length / 2, { dotted: true, color: 'grey' })
    }
  }
  _cartesianToGraphic(x, y) {
    let newX = this.length / 2 + x
    let newY = this.length / 2 - y
    return [newX, newY]
  }
  /**
   * Coordinates of a point you would like to draw on the graph
   * @param {number} x - X coordinate of the point you want to draw
   * @param {number} y - Y coordinate of the point you want to draw
   */
  drawPoint (x, y, { color = this.pointColor } = {}) {
    this.context.beginPath()
    this.context.fillStyle = color
    this.context.ellipse(...this._cartesianToGraphic(x, y), this.pointRadius, this.pointRadius, 0, Math.PI * 2, 0)
    this.context.stroke()
    this.context.fill()
    this.points.push([x, y])
  }

  /**
   * 
   * @param {number} x1 - First x-coordinate of the line
   * @param {number} y1 - First y-coordinate of the line
   * @param {number} x2 - Second x-coordinate of the line
   * @param {number} y2 - Second y-coordinate of the line
   * @param {string} color - The color of the line
   */
  drawLine (x1, y1, x2, y2, { color = this.lineColor, dotted = false } = {}) {
    this.context.beginPath()
    this.context.strokeStyle = color
    if (dotted) {
      this.context.setLineDash([5, 15]);
    }
    this.context.moveTo(...this._cartesianToGraphic(x1, y1))
    this.context.lineTo(...this._cartesianToGraphic(x2, y2))
    this.context.stroke()
    if (dotted) {
      this.context.setLineDash([])
    }
  }
}