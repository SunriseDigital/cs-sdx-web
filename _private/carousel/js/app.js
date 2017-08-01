import Carousel from './classes/Carousel'

$(() => {
  $('.sdx-carousel').each(function(){
    const $elem = $(this)
    const carousel = new Carousel($elem)
    carousel.height = $elem.attr('data-height')
    carousel.run(1000);
  })
})