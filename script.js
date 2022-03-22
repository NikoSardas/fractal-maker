window.addEventListener('load', function () {
  const canvas = document.getElementById('canvas1')
  const ctx = canvas.getContext('2d')

  canvas.width = 500
  canvas.height = 500

  console.log(ctx)
  ctx.lineWidth = 20
  ctx.lineCap = 'round'
  ctx.strokeStyle = 'green'
  ctx.fillStyle = 'blue'

  class Fractal {
    constructor(canvasWidth, canvasHeight) {
      this.canvasWidth = canvasWidth
      this.canvasHeight = canvasHeight
      this.size = canvasWidth * 0.5
    }
    draw(context) {
      context.fillRect(20, 20, 20, 20)
      context.beginPath()
      context.moveTo(100, 300)
      context.lineTo(this.size, 200)
      context.stroke()
    }
  }
  const fractal1 = new Fractal(canvas.width, canvas.height)
  fractal1.draw(ctx)

  class Particle {}
  class Rain {}
})
