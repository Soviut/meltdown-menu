$(function() {
  let current = 0
  let delay = 1000 * 60 * 2 // minutes as milliseconds

  let slides = $('.carousel__slide')

  function switchScreen(i) {
    slides.removeClass('carousel__slide--current')
    slides.eq(i).addClass('carousel__slide--current')
  }
  switchScreen(current)

  setInterval(function() {
    // wrap index if it exceeds the total number of slides
    current = current + 1 >= slides.length ? 0 : current + 1
    switchScreen(current)
  }, delay)
})
