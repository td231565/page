const req = new Request('https://cors-anywhere.herokuapp.com/opendata.epa.gov.tw/api/v1/AQI?%24skip=0&%24top=1000&%24format=json', {method: 'GET'})
const carousel = document.getElementById('carousel')
const view = document.getElementById('view')
// card's content
function aqiContent(obj){
  for (let i=0, l=obj.length; i<l; i++){
    let card = document.createElement('div')
    let sitename = document.createElement('div')
    let county = document.createElement('div')
    let aqi = document.createElement('div')
    let status = document.createElement('div')
    let location = document.createElement('div')
    card.classList.add('card', i)
    sitename.classList.add('sitename', i)
    county.classList.add('county', i)
    aqi.classList.add('aqi', i)
    status.classList.add('status', i)
    location.classList.add('location', i)
    view.appendChild(card)
    card.appendChild(sitename)
    card.appendChild(county)
    card.appendChild(aqi)
    card.appendChild(status)
    card.appendChild(location)
    sitename.innerHTML = `測站：${obj[i].SiteName}`
    county.innerHTML = `縣市：${obj[i].County}`
    aqi.innerHTML = `AQI值：${obj[i].AQI}`
    status.innerHTML = `二氧化硫：${obj[i].SO2}、一氧化碳：${obj[i].CO}、臭氧：${obj[i].O3}、二氧化氮：${obj[i].NO2}、氮氧化物：${obj[i].NOx}、一氧化氮：${obj[i].NO}、懸浮微粒(PM10)：${obj[i].PM10}、狀態：${obj[i].Status}`
    location.innerHTML = `經度：${obj[i].Longitude}、緯度：${obj[i].Latitude}`
  }
}
// AJAX
fetch(req)
.then(function(response){
  return response.json()
}).then(function(jsonObj){
  aqiContent(jsonObj)
}).catch(function(error){
  view.innerHTML = 'loading error, please try again later.'
})