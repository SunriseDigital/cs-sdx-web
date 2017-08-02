export default class Panel
{
  constructor(carousel, $elem, parentPanel) {
    this.carousel = carousel
    this.$element = $elem

    this.$buttonsWrapper = this.$element.find('> .sdx-carousel-btnWrapper')
    
    this.parentPanel = parentPanel
    if(this.parentPanel){
      this.$element.css({
        position: 'absolute',
        width: '100%'
      })
      this.$button = this.$element.find('> .sdx-carousel-btn')
      //ボタンは親のラッパーに突っ込みます。押した時にまるっと子パネルを入れ替えるからです。
      this.parentPanel.$buttonsWrapper.append(this.$button)

      //ボタンのクリックイベント登録。
      this.$button.on('click', () => {
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

  //直系の親パネルを集める。
  assembleDirectParents(parents){
    let parent = this.parentPanel
    while(parent){
      parents.push(parent)
      parent = parent.parentPanel
    }
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
    const parents = []
    this.assembleDirectParents(parents)
    if(parents.length === 0){
      return this
    }

    return parents[parents.length - 1]
  }

  //直系の親パネルに対して順にメソッドを実行する。
  ascend(callback){
    const parents = []
    this.assembleDirectParents(parents)
    $.each(parents, (key, panel) => {
      callback(panel)
    })
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
    this.$element.css({zIndex: 1})
    this.$element.addClass('sdx-carousel-current')
    if(this.$button){
      this.$button.addClass('sdx-carousel-current')
    }

    if(this.isLeaf){
      this.carousel._currentLeaf = this;
    }
  }

  display(){
    //sdx-carousel-currentのz-indexをクリアしてクラスを外す。
    const $currents = this.rootPanel.$element.find('.sdx-carousel-current')
    $currents.filter('.sdx-carousel-panel').css({zIndex: ''})
    $currents.removeClass('sdx-carousel-current')

    //各パネルのエレメントを表示状態へ
    this._show()
    this.ascend(panel => panel._show())
    this.descend(0, panel => panel._show())
  }
}