let apiKey = 'AIzaSyCaY54phJEa6e2CtRZtmDt66XsicmmZRas'
let spreadsheetId = '1SLjvtSUp4aacbUO7_2KymP-_Wtye07JWfEkm-oAdxpA'
let reloadDelay = 1000 * 60 * 60 // 1 hour in milliseconds

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

    currentSlide: 0,
    totalSlides: 3
  },
  created: function() {
    fetch()
  },
  advanceSlide: function() {
    
  }
})

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
        name: val[0],
        imageUrl: val[1]
      }
    })
  })
}

function fetch() {
  Promise.all([
    fetchMenu(),
    fetchSchedule(),
    fetchPromos()
  ])
  .then(function(data) {
    [specials, schedule, promos] = data
    totalSlides = 0
    totalSlides = specials.values.length > 0 ? totalSlides + 1 : totalSlides
    totalSlides = schedule.values.length > 0 ? totalSlides + 1 : totalSlides
    totalSlides = promos.values.length > 0 ? totalSlides + 1 : totalSlides
    site.totalSlides = totalSlides
  })
}

// reload content periodically
setInterval(fetch, reloadDelay)
