import { KeyController } from './key-controller'
import { FlightController } from './flight-controller'
import { BackgroundController } from './background-controller'
import { MissileController } from './missile-controller'
import { EnemyController } from './enemy-controller'

export class GameController {
  private context: CanvasRenderingContext2D

  private backgroundController: BackgroundController
  private flightController: FlightController
  private enemyController: EnemyController
  private missileController: MissileController
  private keyController: KeyController

  private readonly FLIGHT_SPEED = 3

  constructor(private readonly canvas: HTMLCanvasElement) {
    this.adjustCanvasSize()
    const canvasContext = canvas.getContext('2d')
    if (!canvasContext) throw new Error('Failed to initialized canvas context')
    this.context = canvasContext
    this.backgroundController = new BackgroundController(this.context)
    this.flightController = new FlightController(this.context)
    this.enemyController = new EnemyController(this.context)
    this.missileController = new MissileController(this.context)
    this.keyController = new KeyController()

    this.render()
  }

  private adjustCanvasSize() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
  }

  private clearCanvas() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  private render() {
    this.clearCanvas()

    this.backgroundController.render()

    let x = 0
    let y = 0

    if (this.keyController.getKey('ArrowUp')) y -= this.FLIGHT_SPEED
    if (this.keyController.getKey('ArrowDown')) y += this.FLIGHT_SPEED
    if (this.keyController.getKey('ArrowLeft')) x -= this.FLIGHT_SPEED
    if (this.keyController.getKey('ArrowRight')) x += this.FLIGHT_SPEED

    if (this.keyController.getKey('Space')) {
      const { x, y } = this.flightController.position
      this.missileController.fire(x, y, this.flightController.FLIGHT_WIDTH)
    }

    this.flightController.render(x, y)
    this.missileController.render(this.enemyController.enemies)
    this.enemyController.render(this.missileController.missiles)

    requestAnimationFrame(this.render.bind(this))
  }
}
