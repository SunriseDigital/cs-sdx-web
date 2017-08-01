import Carousel from './classes/Carousel'

$(() => {
  $('.wrapper').each(function(){
    const $wrapper = $(this)
    const $elem = $wrapper.find('.sdx-carousel')
    const carousel = new Carousel($elem)
    carousel.height = $elem.attr('data-height')
    carousel.run(1000);

    $wrapper.find('.btn.start').on('click', () => carousel.run(1000))
    $wrapper.find('.btn.stop').on('click', () => carousel.stop())
  })
})