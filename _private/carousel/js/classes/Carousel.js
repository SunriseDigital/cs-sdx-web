import Panel from './Panel'

export default class Carousel
{
  constructor($elem) {
    this.runInterval = undefined
    this.runTimeoutKey = -1
    this.currentLeaf = undefined
    this.$elem = $elem
    this.$elem.css({position: 'relative'})

    this.panel = new Panel(this, $elem)
  }

  get isRunning(){
    return this.runInterval !== undefined
  }

  set height(value){
    this.$elem.height(value)
    this.$elem.css({
      overflow: 'hidden'
    })
  }

  next(){
    clearTimeout(this.runTimeoutKey)
    if(!this.isRunning){
      return
    }

    this.runTimeoutKey = setTimeout(() => {
      let nextIndex = this.leafs.indexOf(this.currentLeaf) + 1
      if(!this.leafs[nextIndex]){
        nextIndex = 0
      }
      this.leafs[nextIndex].display()

      this.next()

    }, this.runInterval)
  }

  stop(){
     this.runInterval = undefined
  }

  /**
   * スライドショーをスタートさせる
   * @param {int} interval 
   */
  run(interval){
    this.panel.display()
    this.runInterval = interval

    this.leafs = []
    this.panel.assembleLeafs(this.leafs);

    this.next()
  }
}