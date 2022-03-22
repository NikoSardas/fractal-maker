window.addEventListener('load', function () {
  const canvas = document.getElementById('canvas1')
  const ctx = canvas.getContext('2d')

  canvas.width = 500
  canvas.height = 500

  ctx.lineWidth = 30
  ctx.lineCap = 'round'
  ctx.strokeStyle = 'lightblue'
  ctx.fillStyle = 'blue'

  class Fractal {
    constructor(canvasWidth, canvasHeight) {
      this.canvasWidth = canvasWidth
      this.canvasHeight = canvasHeight
      this.size = canvasWidth * 0.2
      this.sides = 4
      this.maxLevel = 7
      this.scale = 0.6
      this.angle = 1
      this.branches = 1
    }
    draw(context) {
      context.save()
      context.translate(this.canvasWidth / 2, this.canvasHeight / 2)
      context.scale(1, 1)

      for (let i = 0; i < this.sides; i++) {
        this.#drawLine(context, 0)
        context.rotate((Math.PI * 2) / this.sides)
      }
      context.restore()
    }
    #drawLine(context, level) {
      if (level > this.maxLevel) return

      // inital line
      context.beginPath()
      context.moveTo(0, 0)
      context.lineTo(this.size, 0)
      context.stroke()

      for (let i = 0; i < this.branches; i++) {
        context.save()
        context.translate(this.size, 0)
        context.scale(this.scale, this.scale)

        context.save()
        context.rotate(this.angle)
        this.#drawLine(context, level + 1)
        context.restore()

        context.save()
        context.rotate(-this.angle)
        this.#drawLine(context, level + 1)
        context.restore()
      }

      context.restore()
    }
  }

  const fractal1 = new Fractal(canvas.width, canvas.height)
  fractal1.draw(ctx)

  class Particle {}
  class Rain {}
})
