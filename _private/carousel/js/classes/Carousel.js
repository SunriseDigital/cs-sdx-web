import Panel from './Panel'

export default class Carousel
{
  constructor($elem) {
    this.running = false
    this.runInterval = undefined
    this.runTimeoutKey = -1
    this.currentLeaf = undefined
    this.$elem = $elem
    this.$elem.css({position: 'relative'})

    this.panel = new Panel(this, $elem)
  }

  get isRunning(){
    return this.running && this.runInterval !== undefined
  }

  set height(value){
    this.$elem.height(value)
    this.$elem.css({
      overflow: 'hidden'
    })
  }

  next(){
    clearTimeout(this.runTimeoutKey)

    this.runTimeoutKey = setTimeout(() => {
      if(!this.isRunning){
        return
      }

      let nextIndex = this.leafs.indexOf(this.currentLeaf) + 1
      if(!this.leafs[nextIndex]){
        nextIndex = 0
      }
      this.leafs[nextIndex].display()

      this.next()

    }, this.runInterval)
  }

  stop(){
     this.running = false
  }

  restart(){
    this.running = true
    this.next()
  }

  /**
   * スライドショーをスタートさせる
   * @param {int} interval 
   */
  start(interval){
    this.running = true
    this.panel.display()
    this.runInterval = interval

    this.leafs = []
    this.panel.assembleLeafs(this.leafs);

    this.next()
  }
}