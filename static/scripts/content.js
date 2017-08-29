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

let specials = new Vue({
  el: '#specials',
  data: {
    items: []
  }
})

let schedule = new Vue({
  el: '#schedule',
  data: {
    items: []
  }
})

let promos = new Vue({
  el: '#promos',
  data: {
    items: []
  }
})

function fetchMenu() {
  // line 1 of the sheet is column titles, skip by starting at A2
  fetchData('menu!A2:C10').done(function(res) {
    // res.values is omitted if there are no items
    let values = res.values ? res.values : []
    specials.items = values.map(val => {
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
  fetchData('schedule!A2:F8').done(function(res) {
    // res.values is omitted if there are no items
    let values = res.values ? res.values : []
    schedule.items = values.map(val => {
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
  fetchData('promos!A2:B10').done(function(res) {
    // res.values is omitted if there are no items
    let values = res.values ? res.values : []
    promos.items = values.map(val => {
      return {
        name: val[0],
        imageUrl: val[1]
      }
    })
  })
}

function fetch() {
  fetchMenu()
  fetchSchedule()
  fetchPromos()
}

fetch()

// reload content periodically
setInterval(fetch, reloadDelay)
