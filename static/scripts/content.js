// let reloadDelay = 1000 * 60 * 60 // 1 hour in milliseconds
let screenDelay = 1000 * 20 // seconds
// let screenDelay = 1000 * 5 // seconds

let site = new Vue({
  el: '#page',
  data: {
    screens: [],

    currentScreen: null
  },

  created: function() {
    fetchAll()
    .then((screens) => {
      this.screens = screens
      if (this.screens.length > 0) {
        this.currentScreen = this.screens[0]
        startTimer()
      }
    })
  },

  methods: {
    advanceScreen() {
      let index = this.screens.indexOf(this.currentScreen)
      index++
      index = index > this.screens.length - 1 ? 0 : index
      this.currentScreen = this.screens[index]
    }
  }
})

function startTimer() {
  return setInterval(function() {
    site.advanceScreen()
  }, screenDelay)
}

function fetchSchedule() {
  // TODO: temporary until we have data (day, title, subtitle, icons[])
  return [];
}

function fetchPromos() {
  return [
    { type: 'promo', name: 'openmic',      imageUrl: 'https://s3.ca-central-1.amazonaws.com/menu-cms-dev/Promo-Tall---Open-Mic-01.png' },
    { type: 'promo', name: 'karaoke',      imageUrl: 'https://s3.ca-central-1.amazonaws.com/menu-cms-dev/Promo-Tall---Karaoke-Night-01.png' },
    { type: 'promo', name: 'jackbox',      imageUrl: 'https://s3.ca-central-1.amazonaws.com/menu-cms-dev/Promo-Tall---Jackbox-01.png' },
    { type: 'promo', name: 'triviacamp',   imageUrl: 'https://s3.ca-central-1.amazonaws.com/menu-cms-dev/Promo-Tall---Trivia-Night-Camp-Camp-01.png' },
    { type: 'promo', name: 'triviabojack', imageUrl: 'https://s3.ca-central-1.amazonaws.com/menu-cms-dev/Promo-Tall---Trivia-Night-Bojack-Horseman-01.png' },
    { type: 'promo', name: 'triviasunny',  imageUrl: 'https://s3.ca-central-1.amazonaws.com/menu-cms-dev/Promo-Tall---Trivia-Night-Always-Sunny-01.png' }
  ]
}

function fetchAll() {
  return Promise.all([
    fetchSchedule(),
    fetchPromos()
  ])
  .then(([schedule, promos]) => {
    // TODO: use spread operator if supported
    let screens = []
    screens = screens.concat(schedule)
    screens = screens.concat(promos)
    return screens
  })
}

// reload content periodically
// setInterval(fetch, reloadDelay)
