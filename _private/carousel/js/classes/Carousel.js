import Panel from './Panel'

export default class Carousel
{
  constructor($elem) {
    this.$elem = $elem
    this.$elem.css({position: 'relative'})

    this.panel = new Panel($elem)
    this.panel.display()
  }

  set height(value){
    this.$elem.height(value)
    this.$elem.css({
      overflow: 'hidden'
    })
  }

  run(){
    console.log()
  }
}