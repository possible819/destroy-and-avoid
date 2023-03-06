import { AbstractCanvasController } from './abstract/AbstractCanvasController'
import flight from '../assets/images/flight.png'

export class FlightController extends AbstractCanvasController {
  public readonly FLIGHT_WIDTH: number = 30
  public readonly FLIGHT_HEIGHT: number = 30

  private flightImageElement: HTMLImageElement
  private x: number
  private y: number

  constructor(context: CanvasRenderingContext2D) {
    super(context)
    this.flightImageElement = document.createElement('img')

    const DEFAULT_X = this.canvasWidth / 2 - this.FLIGHT_WIDTH / 2
    const DEFAULT_Y = this.canvasHeight - this.FLIGHT_HEIGHT
    this.x = DEFAULT_X
    this.y = DEFAULT_Y

    this.flightImageElement.src = flight
  }

  public get position() {
    return { x: this.x, y: this.y }
  }

  public init(): void {
    this.render()
  }

  public update(x = 0, y = 0): void {
    this.x += x
    this.y += y
  }

  public draw(): void {
    this.context.drawImage(
      this.flightImageElement,
      this.x,
      this.y,
      this.FLIGHT_WIDTH,
      this.FLIGHT_HEIGHT,
    )
  }
}
