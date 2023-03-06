import { Missile } from './missile-controller'
import { AbstractCanvasController } from './abstract/AbstractCanvasController'
import enemy from '../assets/images/enemy.png'

export interface Enemy {
  x: number
  y: number
  accX: number
  accY: number
  hp: number
  width: number
  height: number
}

export class EnemyController extends AbstractCanvasController {
  public readonly ENEMY_WIDTH = 30
  public readonly ENEMY_HEIGHT = 30
  private readonly ENEMY_MAX_COUNT: number = 10
  private readonly ENEMY_MIN_ACC_X = 0
  private readonly ENEMY_MAX_ACC_X = 8
  private readonly ENEMY_MIN_ACC_Y = 5
  private readonly ENEMY_MAX_ACC_Y = 10

  private enemyImageElement: HTMLImageElement = new Image()
  private generateDelay: number = 0.2 * 1000
  private lastGeneratedAt = 0
  private _enemies: Enemy[] = []

  public get enemies() {
    return this._enemies
  }

  public set enemies(enemies: Enemy[]) {
    this._enemies = enemies
  }

  constructor(context: CanvasRenderingContext2D) {
    super(context)
    this.enemyImageElement.src = enemy
  }

  public init(): void {
    this.render()
  }

  private respawnEnemy() {
    if (this.enemies.length >= this.ENEMY_MAX_COUNT) return

    const now = Date.now()
    if (now - this.lastGeneratedAt < this.generateDelay) return

    this.enemies.push({
      x: Math.floor(Math.random() * (this.canvasWidth - this.ENEMY_WIDTH)),
      y: 0,
      accX: Math.floor(
        (Math.random() - 0.5) *
          2 *
          (Math.random() * this.ENEMY_MAX_ACC_X + this.ENEMY_MIN_ACC_X),
      ),
      accY: Math.floor(
        Math.random() * this.ENEMY_MAX_ACC_Y + this.ENEMY_MIN_ACC_Y,
      ),
      hp: 5,
      width: this.ENEMY_WIDTH,
      height: this.ENEMY_HEIGHT,
    })

    this.lastGeneratedAt = now
  }

  public update(missiles: Missile[]): void {
    this.respawnEnemy()
    this.enemies = this.enemies
      .filter((enemy) => {
        return !this.isOutBoundary(enemy)
      })
      .filter(
        ({ x: enemyX, y: enemyY, width: enemyWidth, height: enemyHeight }) => {
          return !missiles.some(
            ({
              x: missileX,
              y: missileY,
              width: missileWidth,
              height: missileHeight,
            }) => {
              const isAxisXCollapsed =
                missileX + missileWidth >= enemyX &&
                missileX <= enemyX + enemyWidth

              const isAxisYCollapsed =
                missileY <= enemyY + enemyHeight &&
                missileY + missileHeight >= enemyY

              return isAxisXCollapsed && isAxisYCollapsed
            },
          )
        },
      )
      .map((enemy) => {
        enemy.x += enemy.accX
        enemy.y += enemy.accY
        return enemy
      })
  }

  public draw(): void {
    this.enemies.forEach(({ x, y, width, height }) => {
      this.context.drawImage(this.enemyImageElement, x, y, width, height)
    })
  }

  private isOutBoundary({ y }: Enemy) {
    return y > this.canvasHeight
  }
}
