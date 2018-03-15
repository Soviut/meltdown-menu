let apiKey = 'AIzaSyCaY54phJEa6e2CtRZtmDt66XsicmmZRas'
let spreadsheetId = '1SLjvtSUp4aacbUO7_2KymP-_Wtye07JWfEkm-oAdxpA'
let reloadDelay = 1000 * 60 * 60 // 1 hour in milliseconds
let screenDelay = 1000 * 20 // seconds
// let screenDelay = 1000 * 5 // seconds

function fetchData(range) {
  let url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`

  return $.ajax({
    url: url,
    method: 'GET',
    dataType: 'json'
  })
  .done(function(res) {
    console.log(res)
  })
  .fail(function(err) {
    console.log(err)
  })
}

let site = new Vue({
  el: '#page',
  data: {
    specials: [],
    schedule: [],
    promos: [],

    screens: [], // screens are named so this will be a list of strings

    currentScreen: null // will eventually be a string
  },
  created: function() {
    fetch()
    .then((data) => {
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

function fetchMenu() {
  // line 1 of the sheet is column titles, skip by starting at A2
  return fetchData('menu!A2:C10').done(function(res) {
    // res.values is omitted if there are no items
    let values = res.values ? res.values : []
    site.specials = values.map(val => {
      return {
        title: val[0],
        price: val[1],
        description: val[2]
      }
    })
  })
}

function fetchSchedule() {
  // line 1 of the sheet is column titles, skip by starting at A2
  return fetchData('schedule!A2:F8').done(function(res) {
    // res.values is omitted if there are no items
    let values = res.values ? res.values : []
    site.schedule = values.map(val => {
      return {
        day: val[0],
        title: val[1],
        subtitle: val[2],
        icons: val.slice(3)
      }
    })
  })
}

function fetchPromos() {
  // line 1 of the sheet is column titles, skip by starting at A2
  return fetchData('promos!A2:B10').done(function(res) {
    // res.values is omitted if there are no items
    let values = res.values ? res.values : []
    site.promos = values.map(val => {
      return {
        name: normalizeName(val[0]),
        imageUrl: val[1]
      }
    })
  })
}

function fetch() {
  return Promise.all([
    fetchMenu(),
    fetchSchedule(),
    fetchPromos()
  ])
  .then(function(data) {
    [specials, schedule, promos] = data

    if (specials.values.length > 0) {
      site.screens.push('specials')
    }

    if (schedule.values.length > 0) {
      site.screens.push('schedule')
    }

    if (promos.values.length > 0) {
      site.promos.forEach(promo => site.screens.push(`promo-${promo.name}`))
    }
  })
}

// lowercase, only alphanumeric characters, spaces become dashes
function normalizeName(name) {
  return name.toLowerCase().replace(/\s/g, '-').replace('/[^a-z0-9-]/g', '')
}

// reload content periodically
setInterval(fetch, reloadDelay)
