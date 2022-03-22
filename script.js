window.addEventListener('load', function () {
  const canvas = document.getElementById('canvas1')
  const ctx = canvas.getContext('2d')

  canvas.width = 500
  canvas.height = 500

  console.log(ctx)
  ctx.lineWidth = 20
  ctx.lineCap = 'round'
  ctx.strokeStyle = 'orange'
  ctx.fillStyle = 'blue'

  class Fractal {
    constructor(canvasWidth, canvasHeight) {
      this.canvasWidth = canvasWidth
      this.canvasHeight = canvasHeight
      this.size = canvasWidth / 8
    }
    draw(context) {
      context.save()
      context.scale(1, 1)

      for (let i = 0; i < 10; i++) {
        this.#drawLine(context)
        context.rotate(0.3)
      }

      context.restore()
    }
    #drawLine(context) {
      context.beginPath()
      context.moveTo(0, 0)
      context.lineTo(this.size, 0)
      context.stroke()
    }
  }

  const fractal1 = new Fractal(canvas.width, canvas.height)
  fractal1.draw(ctx)

  class Particle {}
  class Rain {}
})
