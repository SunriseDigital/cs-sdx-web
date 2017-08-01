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
      this.parentPanel._addButton(this.$button)
      this.$button.on('click', () => {
        this.display()
        if(this.carousel.isRunning){
          this.carousel._next()
        }
      })
    }

    this.childPanels = []
    this.$element.find('> .sdx-carousel-panel').each((key, elem) => {
      this.childPanels.push(new Panel(carousel, $(elem), this))
    })
  }

  get isLeaf(){
    return this.childPanels.length === 0
  }

  assembleDirectParents(parents){
    let parent = this.parentPanel
    while(parent){
      parents.push(parent)
      parent = parent.parentPanel
    }
  }

  get rootPanel(){
    const parents = []
    this.assembleDirectParents(parents)
    if(parents.length === 0){
      return this
    }

    return parents[parents.length - 1]
  }

  _addButton($button){
    this.$buttonsWrapper.append($button)
  }

  ascend(callback){
    const parents = []
    this.assembleDirectParents(parents)
    $.each(parents, (key, panel) => {
      callback(panel)
    })
  }

  descend(index, callback){
    if(this.childPanels[index]){
      callback(this.childPanels[index])
      this.childPanels[index].descend(index, callback)
    }
  }

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
    const $currents = this.rootPanel.$element.find('.sdx-carousel-current')
    $currents.filter('.sdx-carousel-panel').css({zIndex: ''})
    $currents.removeClass('sdx-carousel-current')

    this._show()
    this.ascend(panel => panel._show())
    this.descend(0, panel => panel._show())
  }

  assembleLeafs(leafs){
    if(this.isLeaf){
      leafs.push(this)
    }

    $.each(this.childPanels, (key, panel) => panel.assembleLeafs(leafs))
  }
}