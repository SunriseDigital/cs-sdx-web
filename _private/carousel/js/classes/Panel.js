export default class Panel
{
  constructor(carousel, $elem, parentPanel) {
    this.carousel = carousel
    this.$element = $elem
 
    if(this.carousel._transitionDuration){
      
      this.$element.css({'transitionDuration': this.carousel._transitionDuration})
      this.$element.on('transitionend', (e) => {
        this.$element.removeClass('sdx-carousel-ready')
        this.$element.removeClass('sdx-carousel-start')
        this._clearBeforePanels();
      })
    }

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
    var parents = []
    let parent = this.parentPanel
    while(parent){
      parents.push(parent)
      parent = parent.parentPanel
    }

    for (var i = parents.length - 1; i >= 0; i--) {
      callback(parents[i])      
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
    this._show()
    this.descend(0, panel => panel._show())

    this.$element.addClass('sdx-carousel-ready')
    

    setTimeout(() => {
      this.$element.addClass('sdx-carousel-start')
    }, 100)
  }

  _clearBeforePanels(){
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
    
    //既に表示中で子供がいたら子供を表示。
    if(this.carousel._currentPanels.indexOf(this) >= 0 && this.childPanels[0]){
      this.childPanels[0].display()
    } else {
      const parents = []
      this.ascend(p => parents.push(p))

      //スライドショーの時表示されてない一番上の親を表示しないと親のパネルのz-indexが2にならないのでアニメーション時にボタン部分が見えない。
      //ただしそれが起こるのはスライドショーの時のみ。ボタンで切り替えるときは親パネルにボタンがあるので、親が見えないとクリックできない。
      const hiddenParents = parents.filter(p => !p.$element.is('.sdx-carousel-current'))
      if(hiddenParents.length){
        hiddenParents[0].display()
      } else {
        //クラスを外すので直前のパネルをとっておく。
        this._beforePanels = this.carousel._currentPanels
        //今回表示されるパネルを階層で保持。
        this.carousel._currentPanels = []

        //各パネルのエレメントを表示状態へ
        $.each(parents, (key, panel) => panel._show())

        if(this.isRoot){
          this._show()
          this.descend(0, panel => panel._show())
          this._clearBeforePanels()
        } else {
          this._startShow()
          if(!this.carousel._transitionDuration){
            this.$element.removeClass('sdx-carousel-ready')
            this.$element.removeClass('sdx-carousel-start')
            this._clearBeforePanels()
          }
        }
      }
    }
  }
}