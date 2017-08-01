import Panel from './Panel'


export default class Carousel
{
  constructor($elem) {
    this._running = false
    this._runInterval = undefined
    this._runTimeoutKey = -1
    this._currentLeaf = undefined

    this.$element = $elem
    this.$element.css({position: 'relative'})
    this.panel = new Panel(this, $elem)
  }

  get isRunning(){
    return this._running && this._runInterval !== undefined
  }

  set height(value){
    this.$element.height(value)
    this.$element.css({
      overflow: 'hidden'
    })
  }

  _next(){
    clearTimeout(this._runTimeoutKey)

    this._runTimeoutKey = setTimeout(() => {
      if(!this.isRunning){
        return
      }

      let nextIndex = this.leafs.indexOf(this._currentLeaf) + 1
      if(!this.leafs[nextIndex]){
        nextIndex = 0
      }
      this.leafs[nextIndex].display()

      this._next()

    }, this._runInterval)
  }

  stop(){
     this._running = false
  }

  restart(){
    this._running = true
    this._next()
  }

  /**
   * スライドショーをスタートさせる
   * @param {int} interval 
   */
  start(interval){
    this._running = true
    this.panel.display()
    this._runInterval = interval

    this.leafs = []
    this.panel.assembleLeafs(this.leafs);

    this._next()
  }
}