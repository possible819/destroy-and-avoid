import { AbstractCanvasController } from './abstract/AbstractCanvasController'
import machineGun from '../assets/images/machine-gun.png'
import { Enemy } from './enemy-controller'

export enum MissileType {
  MachineGun,
  Laser,
}

export const MISSILE_SPEED: Record<MissileType, number> = {
  [MissileType.MachineGun]: 10,
  [MissileType.Laser]: 15,
}

export interface Missile {
  type: MissileType
  x: number
  y: number
  width: number
  height: number
}

export class MissileController extends AbstractCanvasController {
  private readonly FIRE_DELAY = 0.1 * 1000
  private readonly MISSILE_WIDTH = 2
  private readonly MISSILE_HEIGHT = 8

  private missileType: MissileType = MissileType.MachineGun
  private lastFiredAt = 0
  private missileImageElement: HTMLImageElement = new Image()
  private _missiles: Missile[] = []

  public get missiles() {
    return this._missiles
  }

  public set missiles(missiles: Missile[]) {
    this._missiles = missiles
  }

  constructor(context: CanvasRenderingContext2D) {
    super(context)
    this.init()
  }

  public init(): void {
    this.missileImageElement.src = machineGun
  }

  public fire(flightX: number, flightY: number, flightWidth: number) {
    const now = Date.now()
    if (now - this.lastFiredAt < this.FIRE_DELAY) return

    this.lastFiredAt = now
    this.missiles.push({
      type: this.missileType,
      x: flightX + flightWidth / 2,
      y: flightY,
      width: this.MISSILE_WIDTH,
      height: this.MISSILE_HEIGHT,
    })
  }

  public update(enemies: Enemy[]): void {
    this.missiles = this.missiles
      .filter((missile) => missile.y >= 0)
      .filter(
        ({
          x: missileX,
          y: missileY,
          width: missileWidth,
          height: missileHeight,
        }) => {
          return !enemies.some(
            ({
              x: enemyX,
              y: enemyY,
              width: enemyWidth,
              height: enemyHeight,
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
      .map((missile) => {
        missile.y -= MISSILE_SPEED[missile.type]
        return missile
      })
  }
  public draw(): void {
    this.missiles.forEach(({ x, y, width, height }) => {
      this.context.drawImage(this.missileImageElement, x, y, width, height)
    })
  }
}
