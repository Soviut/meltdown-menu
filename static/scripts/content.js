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
