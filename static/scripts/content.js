// let reloadDelay = 1000 * 60 * 60 // 1 hour in milliseconds

let environments = {
  'http://localhost:4000': {
    'api_url': 'http://localhost:3000/api/promos',
    'screen_delay': 1000 * 5 // seconds
  },
  'https://soviut.github.io': {
    'api_url': 'https://meltdown-cms-prod.herokuapp.com/api/promos',
    'screen_delay': 1000 * 20 // seconds
  }
}
let settings = environments[window.location.origin]

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
  }, settings.screen_delay)
}

function fetchSchedule() {
  // TODO: temporary until we have data (day, title, subtitle, icons[])
  return [];
}

function fetchPromos() {
  let req = new Request(settings.api_url)

  return fetch(req)
    .then(res => res.json())
    // only keep promos with promo_poster_url assets
    .then(data => data.promos.filter(promo => promo.assets.promo_poster_url))
    .catch(err => {
      console.error(err)
      // TODO: display a default poster if fetch fails
      return []
    })
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
