import Carousel from './classes/Carousel'

$(() => {
  $('.sdx-carousel').each(function(){
    const $elem = $(this)
    const carousel = new Carousel($elem)

    const height = $elem.attr('data-height')
    if(!height){
      throw new Error("data-height attribute is required.")
    }
    carousel.height = height

    const interval = $elem.attr('data-interval')
    if(interval){
      carousel.start(interval)
    } else {
      carousel.panel.display()
    }

    $elem.data('sdxCarousel', carousel)
  })
})