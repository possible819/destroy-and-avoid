import { GameController } from './controllers/game-controller'
import './assets/styles/global.scss'

const bootstrap = () => {
  const canvasElement = document.createElement('canvas')
  const mainElement = document.querySelector<HTMLElement>('main')
  if (!mainElement) throw new Error('Failed to find main element')
  mainElement.append(canvasElement)
  new GameController(canvasElement)
}

bootstrap()
