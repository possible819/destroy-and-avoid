import { GameController } from './controllers/game-controller'
import './assets/styles/global.scss'

const bootstrap = () => {
  const canvasElement = document.createElement('canvas')
  document.body.append(canvasElement)
  new GameController(canvasElement)
}

bootstrap()
