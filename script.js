window.addEventListener('load', function () {
  const canvas = document.getElementById('canvas1')
  const ctx = canvas.getContext('2d')

  canvas.width = 500
  canvas.height = 500

  ctx.lineWidth = 10
  ctx.lineCap = 'round'

  ctx.shadowColor = 'black'
  ctx.shadowOffsetX = 5
  ctx.shadowOffsetY = 10
  ctx.shadowBlur = 20

  class Fractal {
    constructor(canvasWidth, canvasHeight) {
      this.canvasWidth = canvasWidth
      this.canvasHeight = canvasHeight
      this.size = canvasWidth * 0.2
      this.sides = 6
      this.maxLevel = 3
      this.scale = 0.5
      this.angle = Math.random() * 2.8 + 0.1
      this.branches = 2
      this.color = `hsl(${Math.random() * 360},25%,50%)`
    }
    draw(context) {
      context.strokeStyle = this.color
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
        context.translate(this.size - (this.size / this.branches) * i, 0)
        context.scale(this.scale, this.scale)

        context.save()
        context.rotate(this.angle)
        this.#drawLine(context, level + 1)
        context.restore()

        context.save()
        context.rotate(-this.angle)
        this.#drawLine(context, level + 1)
        context.restore()
        context.restore()
      }
    }
  }

  const fractal1 = new Fractal(canvas.width, canvas.height)
  fractal1.draw(ctx)

  class Particle {}
  class Rain {}
})
