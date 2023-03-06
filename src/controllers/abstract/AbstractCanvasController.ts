export abstract class AbstractCanvasController {
  public abstract init(): void
  public abstract update(...args: unknown[]): void
  public abstract draw(): void

  protected canvasWidth: number
  protected canvasHeight: number

  constructor(protected context: CanvasRenderingContext2D) {
    this.canvasWidth = context.canvas.width
    this.canvasHeight = context.canvas.height
  }

  public render(...args: unknown[]) {
    this.update(...args)
    this.draw()
  }
}
