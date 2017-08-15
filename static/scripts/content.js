let apiKey = 'AIzaSyCaY54phJEa6e2CtRZtmDt66XsicmmZRas'
let spreadsheetId = '1SLjvtSUp4aacbUO7_2KymP-_Wtye07JWfEkm-oAdxpA'

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

function fetchMenu() {
  // line 1 of the sheet is column titles, skip by starting at A2
  fetchData('menu!A2:C10').done(function(res) {
    specials.items = res.values.map(val => {
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
    schedule.items = res.values.map(val => {
      return {
        day: val[0],
        title: val[1],
        subtitle: val[2],
        icons: val.slice(3)
      }
    })
  })
}

function fetch() {
  fetchMenu()
  fetchSchedule()
}

fetch()
