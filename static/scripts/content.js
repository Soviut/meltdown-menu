let apiKey = 'AIzaSyCaY54phJEa6e2CtRZtmDt66XsicmmZRas'
let spreadsheetId = '1SLjvtSUp4aacbUO7_2KymP-_Wtye07JWfEkm-oAdxpA'
let range = 'menu!A2:C10' // line 1 is column titles, skip

function fetchData(range) {
  let url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`

  $(function() {
    $.ajax({
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
  })
}

fetchData(range)

var app = new Vue({
  el: '#specials',
  data: {
    items: [
      {
        title: 'Mill St. Pints',
        description: 'Organic Lager, Amber Lager, IPA, Stout',
        price: 800
      },
      {
        title: 'Bar Rails',
        description: 'Vodka, Rum, Gin, Whiskey, Scotch and Tequila',
        price: 500
      },
      {
        title: 'Super Meat Boy',
        description: 'A 4oz beef burger patty with cheese on two Jamaican beef patties for buns',
        price: 800
      }
    ]
    }
})
