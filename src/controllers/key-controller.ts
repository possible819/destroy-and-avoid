export class KeyController {
  private keys: Set<string> = new Set()

  constructor() {
    document.addEventListener('keydown', (event) => {
      this.keys.add(event.code)
    })

    document.addEventListener('keyup', (event) => {
      this.keys.delete(event.code)
    })
  }

  public getKey(key: string) {
    return this.keys.has(key)
  }
}
