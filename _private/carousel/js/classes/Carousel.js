import Panel from './Panel'


export default class Carousel
{
  constructor($elem) {
    //スライドショーが動いてるか、一時停止しているかのフラグ
    this._running = false
    //スライドショーのインターバル。スタートしてるか、止まっているかのフラグにも使っています。
    this._runInterval = undefined
    //スライドショーの繰り返しはインターバルではなくTimeoutを再帰的に読んで実現しています。そのクリア用のキー。
    this._runTimeoutKey = -1
    //現在表示中の枝葉パネルを保持しています。止まったとき続きから再生するため。
    // this._currentLeaf = undefined
    this._currentPanels = []
    //DOM上のボタンを押すとmouseleaveが発生してしまうのでクリック時にフラグを立て発生を抑止。
    this._clickingButton = false

    this.$element = $elem

    this._transitionDuration = this.$element.attr('data-transition-duration')

    this.panel = new Panel(this, $elem)

    //マウスオーバー時は止める
    //タッチ時にtouchstart>touchend>mouseenterという謎な順で発生し変な挙動になるので、タッチデバイスではやらない。
    if(!("ontouchstart" in document.documentElement)){
      this.$element.on('mouseenter', () => {
        this.pause()
      })

      this.$element.on('mouseleave', () => {
        if(!this._clickingButton){
          this.restart()
        }
      })
    }
  }

  /**
   * スライドショーが動いているどうか。ポーズでも停止でもどちらでもfalseです。
   */
  get isRunning(){
    return this._running && this._runInterval !== undefined
  }

  /**
   * スライドショー実行時に繰り返し呼ばれます。setIntervalは使わずにsetTimeoutの再帰呼び出しを使っています。
   */
  _next(){
    clearTimeout(this._runTimeoutKey)

    this._runTimeoutKey = setTimeout(() => {
      if(!this.isRunning){
        return
      }

      const currentLeaf = this._currentPanels[this._currentPanels.length - 1]
      let nextIndex = this.leafs.indexOf(currentLeaf) + 1
      if(this.leafs[nextIndex]){
        this.leafs[nextIndex].display()
      } else {
        this.panel.childPanels[0].display()
      }

      this._next()

    }, this._runInterval)
  }

  /**
   * スライドショーをポーズします。再スタートはrestartでお願いします。
   */
  pause(){
     this._running = false
  }

  /**
   * スライドショーポーズ時の再スタート
   */
  restart(){
    this._running = true
    this._next()
  }

  /**
   * スライドショーを停止します。
   */
  stop(){
     this._running = false
     this._runInterval = undefined
  }

  /**
   * スライドショーをスタートさせる。インターバルはdata-intervalから取ります。
   */
  start(){
    this._running = true
    this.panel.display()
    this._runInterval = this.$element.attr('data-interval')
    if(!this._runInterval){
      throw new Error("Missing data-interval attribute in " + this._jqueryToString(this.$element))
    }

    this.leafs = []
    this.panel.assembleLeafs(this.leafs);

    this._next()
  }

  _jqueryToString($elem){
    const html = $elem.get(0).outerHTML
    return html.substr(0, html.indexOf('>') + 1)
  }
}