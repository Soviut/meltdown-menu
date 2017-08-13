let apiKey = 'AIzaSyCaY54phJEa6e2CtRZtmDt66XsicmmZRas'
let spreadsheetId = '1SLjvtSUp4aacbUO7_2KymP-_Wtye07JWfEkm-oAdxpA'
let range = 'menu!A2:C10' // line 1 is column titles, skip

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

var specials = new Vue({
  el: '#specials',
  data: {
    items: []
  }
})

fetchData(range).done(function(res) {
  specials.items = res.values.map(val => {
    return {
      title: val[0],
      price: val[1],
      description: val[2],
    }
  })

  console.log(specials.items)
  //specials.$data.items = res.values
})