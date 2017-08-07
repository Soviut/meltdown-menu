$(function() {
  let current = 0
  let delay = 5000

  let screens = $('.screen')

  function switchScreen(i) {
    screens.removeClass('screen--current')
    screens.eq(i).addClass('screen--current')
  }
  switchScreen(current)

  setInterval(function() {
    // wrap index if it exceeds the total number of screens
    current = current + 1 >= screens.length ? 0 : current + 1
    switchScreen(current)
  }, delay)
})
