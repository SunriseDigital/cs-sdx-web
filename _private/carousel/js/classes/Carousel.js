import Panel from './Panel'

export default class Carousel
{
  constructor($elem) {
    this.$elem = $elem
    this.panel = new Panel($elem)
  }

  set height(value){
    this.$elem.height(value)
    this.$elem.css({
      overflow: 'hidden'
    })
  }

  run(){
    console.log(this.panel)
  }
}