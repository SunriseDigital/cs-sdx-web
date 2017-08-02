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
    this._currentLeaf = undefined
    //DOM上のボタンを押すとmouseleaveが発生してしまうのでクリック時にフラグを立て発生を抑止。
    this._clickingButton = false

    this.$element = $elem
    //一番外枠はrelative。下層は全てabsolute
    this.$element.css({position: 'relative'})
    this.panel = new Panel(this, $elem)
    
    //外枠の高さを切り詰める
    const height = $elem.attr('data-height')
    if(!height){
      throw new Error("Missing data-height attribute in " + this._jqueryToString(this.$element))
    }
    this.$element.height(height)
    this.$element.css({
      overflow: 'hidden'
    })

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

      let nextIndex = this.leafs.indexOf(this._currentLeaf) + 1
      if(!this.leafs[nextIndex]){
        nextIndex = 0
      }
      this.leafs[nextIndex].display()

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