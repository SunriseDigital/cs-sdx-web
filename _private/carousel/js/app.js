import Carousel from './classes/Carousel'

$(() => {
  $('.sdx-carousel').each(function(){
    const $elem = $(this)
    const carousel = new Carousel($elem)

    const interval = $elem.attr('data-interval')
    if(interval){
      carousel.start()
    } else {
      carousel.panel.display()
    }

    $elem.data('sdxCarousel', carousel)
  })
})