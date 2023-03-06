import { AbstractCanvasController } from './abstract/AbstractCanvasController'
import bg01 from '../assets/images/bg-01.jpg'

export class BackgroundController extends AbstractCanvasController {
  private imageElement: HTMLImageElement

  constructor(context: CanvasRenderingContext2D) {
    super(context)
    this.imageElement = document.createElement('img')
    this.imageElement.src = bg01
    this.imageElement.onload = () => {
      this.init()
    }
  }

  public init() {
    this.render()
  }

  public update() {
    console.log('Update background')
  }

  public draw() {
    this.context.drawImage(
      this.imageElement,
      0,
      0,
      this.canvasWidth,
      this.canvasHeight,
    )
  }
}
