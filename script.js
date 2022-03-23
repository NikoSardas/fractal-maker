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
  ctx.shadowBlur = 10

  const canvas2 = document.getElementById('canvas2')
  const ctx2 = canvas2.getContext('2d')
  canvas2.width = window.innerWidth
  canvas2.height = window.innerHeight
  ctx2.lineWidth = 10
  ctx2.lineCap = 'round'
  ctx2.shadowColor = 'black'
  ctx2.shadowOffsetX = 5
  ctx2.shadowOffsetY = 10
  ctx2.shadowBlur = 10

  class Fractal {
    constructor(canvasWidth, canvasHeight) {
      this.canvasWidth = canvasWidth
      this.canvasHeight = canvasHeight
      this.size = canvasWidth * 0.25
      this.sides = 6
      this.maxLevel = 5
      this.scale = 0.5
      this.angle = Math.random() * 2.8 + 0.1
      this.branches = 2
      this.color = `hsl(${Math.random() * 100},100%,50%)`
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

  class Particle {
    constructor(canvasWidth, canvasHeight, image) {
      this.canvasWidth = canvasWidth
      this.canvasHeight = canvasHeight
      this.image = image
      this.x = Math.random() * this.canvasWidth
      this.y = Math.random() * this.canvasHeight
      this.sizeModifier = Math.random() * 0.2 + 0.1
      this.width = (this.image.width / 4) * this.sizeModifier
      this.height = (this.image.height / 4) * this.sizeModifier
      this.speed = Math.random() * 1 + 0.8
      this.angle = 0
      this.angleVelocity = Math.random() * 0.01 - 0.005
    }
    update() {
      this.angle += this.angleVelocity
      this.x += this.speed
      if (this.x > this.canvasWidth + this.width) this.x = -this.width
      this.y += this.speed
      if (this.y > this.canvasHeight + this.height) this.y = -this.height
    }
    draw(context) {
      context.save()
      context.translate(this.x, this.y)
      context.rotate(this.angle)
      context.drawImage(
        this.image,
        -this.width / 2,
        -this.height / 2,
        this.width,
        this.height
      )
      context.restore()
    }
  }

  class Rain {
    constructor(canvasWidth, canvasHeight, image) {
      this.canvasWidth = canvasWidth
      this.canvasHeight = canvasHeight
      this.image = image
      this.numberOfParticles = 20
      this.particles = []
      this.#initialize()
    }
    #initialize() {
      for (let i = 0; i < this.numberOfParticles; i++) {
        this.particles.push(
          new Particle(this.canvasWidth, this.canvasHeight, this.image)
        )
      }
    }
    run(context) {
      this.particles.forEach((particle) => {
        particle.draw(context)
        particle.update()
      })
    }
  }

  const fractal1 = new Fractal(canvas.width, canvas.height)
  fractal1.draw(ctx)
  const fractalImage = new Image()
  fractalImage.src = canvas.toDataURL()

  fractalImage.onload = function () {
    const rainEffect = new Rain(canvas2.width, canvas2.height, fractalImage)

    function animate() {
      ctx2.clearRect(0, 0, canvas2.width, canvas2.height)
      rainEffect.run(ctx2)
      requestAnimationFrame(animate)
    }
    animate()
  }
})
