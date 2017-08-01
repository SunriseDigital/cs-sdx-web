export default class Panel
{
  constructor($elem, parentPanel) {
    this.$elem = $elem

    this.$buttonsWrapper = this.$elem.find('> .sdx-carousel-btnWrapper')
    
    this.parentPanel = parentPanel
    if(this.parentPanel){
      this.$elem.css({
        position: 'absolute',
        width: '100%'
      })
      this.$button = this.$elem.find('> .sdx-carousel-btn')
      this.parentPanel.addButton(this.$button)
      this.$button.on('click', () => {
        this.display()
      })
    }

    this.childPanels = []
    this.$elem.find('> .sdx-carousel-panel').each((key, elem) => {
      this.childPanels.push(new Panel($(elem), this))
    })
  }

  get parents(){
    const parents = []
    let parent = this.parentPanel
    while(parent){
      parents.push(parent)
      parent = parent.parentPanel
    }

    return parents
  }

  get rootPanel(){
    const parents = this.parents
    if(parents.length === 0){
      return this
    }

    return parents[parents.length - 1]
  }

  addButton($button){
    this.$buttonsWrapper.append($button)
  }

  rise(callback){
    callback(this)
    $.each(this.parents, (key, panel) => {
      callback(panel)
    })
  }

  cascade(callback){
    callback(this)
    $.each(this.childPanels, (key, panel) => {
      panel.cascade(callback)
    })
  }

  fall(index, callback){
    if(this.childPanels[index]){
      callback(this.childPanels[index])
      this.childPanels[index].fall(index, callback)
    }
  }

  hide(){
    this.$elem.css({zIndex: -1})
    if(this.$button){
      this.$button.removeClass('sdx-carousel-current')
    }
  }

  show(){
    this.$elem.css({zIndex: 1})
    if(this.$button){
      this.$button.addClass('sdx-carousel-current')
    }
  }

  display(){
    this.rootPanel.cascade(panel => panel.hide())
    this.rise(panel => panel.show())
    this.fall(0, panel => panel.show())
  }
}