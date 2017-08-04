export default class Panel
{
  constructor(carousel, $elem, parentPanel) {
    this.carousel = carousel
    this.$element = $elem

    this.$element.on('transitionend', (e) => {
      this.$element.removeClass('sdx-carousel-ready')
      this.$element.removeClass('sdx-carousel-start')
      this._clearBefore();
    })

    // this.showing = false
    this._beforePanels = []

    this.$buttonsWrapper = this.$element.find('> .sdx-carousel-btnWrapper')
    
    this.parentPanel = parentPanel
    if(this.parentPanel){
      this.$button = this.$element.find('> .sdx-carousel-btn')
      //ボタンは親のラッパーに突っ込みます。押した時にまるっと子パネルを入れ替えるからです。
      this.parentPanel.$buttonsWrapper.append(this.$button)

      //ボタンのクリックイベント登録。
      this.$button.on('click', (e) => {
        e.preventDefault()
        //mouseleaveの誤発火防止用フラグをON
        this.carousel._clickingButton = true
        //自分を表示
        this.display()
        //スライドショーが動いていたら
        if(this.carousel.isRunning){
          this.carousel._next()
        }
        //mouseleaveの誤発火防止用フラグをOFF
        setTimeout(() => {
          this.carousel._clickingButton = false
        }, 0)

        return false
      })
    }

    //子パネルを生成。
    this.childPanels = []
    this.$element.find('> .sdx-carousel-panel').each((key, elem) => {
      this.childPanels.push(new Panel(carousel, $(elem), this))
    })
  }

  //枝葉パネルかどうかのチェック。
  get isLeaf(){
    return this.childPanels.length === 0
  }

  get isRoot(){
    return this.parentPanel === undefined
  }

  //直系の子要素を集める。
  assembleLeafs(leafs){
    if(this.isLeaf){
      leafs.push(this)
    }

    $.each(this.childPanels, (key, panel) => panel.assembleLeafs(leafs))
  }

  //ルートのパネル
  get rootPanel(){
    if(!this.parentPanel){
      return this
    }

    let parent = this.parentPanel
    while(parent.parentPanel){
      parent = parent.parentPanel
    }

    return parent
  }

  //直系の親パネルに対して順にメソッドを実行する。
  ascend(callback){
    let parent = this.parentPanel
    while(parent){
      callback(parent)
      parent = parent.parentPanel
    }
  }

  //指定したインデックスの子パネルに対して順にメソッドを実行する
  descend(index, callback){
    if(this.childPanels[index]){
      callback(this.childPanels[index])
      this.childPanels[index].descend(index, callback)
    }
  }

  //エレメントを見える状態にしてクラスを付与。
  _show(){
    this.carousel._currentPanels.push(this)
    this.$element.addClass('sdx-carousel-current')
    if(this.$button){
      this.$button.addClass('sdx-carousel-current')
    }
  }

  _startShow(callback){
    // this.showing = true
    this.$element.addClass('sdx-carousel-ready')
    this._show()
    this.descend(0, panel => panel._show())

    setTimeout(() => {
      this.$element.addClass('sdx-carousel-start')
    }, 80)
  }

  _clearBefore(){
    $.each(this._beforePanels, (key, panel) => {
      if(this.carousel._currentPanels.indexOf(panel) === -1){
        panel.$element.removeClass('sdx-carousel-current')
        panel.$button.removeClass('sdx-carousel-current')
      }
    })

    this._beforePanels = []
  }

  display(){
    if(this._beforePanels.length){
      return
    }
    
    this._beforePanels = this.carousel._currentPanels
    this.carousel._currentPanels = []

    //各パネルのエレメントを表示状態へ
    this.ascend(panel => panel._show())

    if(this.isRoot){
      this._show()
      this.descend(0, panel => panel._show())
      this._clearBefore()
    } else {
      this._startShow(() => {
        this._clearBefore()
      })
    }
  }
}