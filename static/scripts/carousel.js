$(function() {
  let screens = $('.screen')
  let current = 0;
  
  screens.removeClass('screen--current')
  screens.eq(current).addClass('screen--current')

  setInterval(function() {
    current++

    if (current >= screens.length) {
      current = 0
    }

    console.log(current)

    screens.removeClass('screen--current')
    screens.eq(current).addClass('screen--current')
  }, 5000)
})
