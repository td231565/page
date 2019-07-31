const view = document.querySelector('.view')
const selectBox = document.querySelector('.select-box')
const currCity = document.querySelector('#currCity')
const citySelections = document.querySelector('.city-selections')
const aqiBox = document.querySelector('.aqi-box')
const coverLayer = document.querySelector('.cover-layer')
let aqiData = null
// call AJAX from opendata
;(function() {
  // let url = 'https://cors-anywhere.herokuapp.com/opendata.epa.gov.tw/api/v1/AQI?%24skip=0&%24top=1000&%24format=json'
  let url = 'https://script.google.com/macros/s/AKfycbxVs_7NhpX-zUbz4LhovuhZ9E4u-VRzSr9IFBZhsrD9hMSoObi8/exec?url=https://opendata.epa.gov.tw/api/v1/AQI?%24skip=0&%24top=1000&%24format=json'
  fetch(url)
    .then(res => res.json())
    .then(json => {
      aqiData = json
      showCitySelectOpts(json)
      // showContent(json)
      coverLayer.classList.add('hide')
    })
    .catch(err => {
      console.log(err)
    })
})()
// options
function showCitySelectOpts(source) {
  // console.log(source)
  // we don't want repeat options
  let cityOpts = []
  source.map(item => {
    if (!cityOpts.includes(item.County)){
      cityOpts.push(item.County)
    }
  })
  cityOpts.sort().map(city => {
    citySelections.innerHTML += `<p class="opts-city">${city}</p>`
  })
}
// show pm2.5 content cards
function showContent(source, cityName) {
  aqiBox.innerHTML = ''
  // show specific card
  source.forEach(item => {
    if (item.County === cityName){
      let level = ''
      if (0 <= item.AQI && item.AQI <= 50) level = 'level-1'
      if (51 <= item.AQI && item.AQI <= 100) level = 'level-2'
      if (101 <= item.AQI && item.AQI <= 150) level = 'level-3'
      if (151 <= item.AQI && item.AQI <= 200) level = 'level-4'
      if (201 <= item.AQI && item.AQI <= 250) level = 'level-5'
      if (251 <= item.AQI && item.AQI <= 300) level = 'level-6'
      aqiBox.innerHTML += `
      <a class="card">
        <p
          data-name="${item.SiteName}"
          data-aqi="${item.AQI}"
          data-o3="${item.O3}"
          data-pm10="${item.PM10}"
          data-pm25="${item['PM2.5']}"
          data-co="${item.CO}"
          data-so2="${item.SO2}"
          data-no2="${item.NO2}"
        ><span>${item.SiteName}</span></p>
        <p class="${level}"><span>${item.AQI}</span></p>
      </a>
      `
    }
  })
}
// 關聯 city select
window.addEventListener('click', (e) => {
  // console.log(e.target)
  if (e.target.id === 'currCity' || e.target.className === 'select-box'){
    selectBox.classList.toggle('active')
  } else {
    selectBox.classList.remove('active')
  }
  if (e.target.className === 'opts-city'){
    currCity.textContent = e.target.textContent
    selectBox.classList.remove('active')
    showContent(aqiData, currCity.textContent)
  }
})
// 建立 aqi 說明
window.addEventListener('load', () => {
  let aqiInfo = [
    {
      class: 'level-1',
      text: '良好',
      num: '0 ~ 50'
    },
    {
      class: 'level-2',
      text: '普通',
      num: '51 ~ 100'
    },
    {
      class: 'level-3',
      text: '對敏感族群不健康',
      num: '101 ~ 150'
    },
    {
      class: 'level-4',
      text: '對所有族群不健康',
      num: '151 ~ 200'
    },
    {
      class: 'level-5',
      text: '非常不健康',
      num: '201 ~ 250'
    },
    {
      class: 'level-6',
      text: '危害',
      num: '251 ~ 300'
    },
  ]
  for (let item of aqiInfo){
    document.querySelector('.header-right').innerHTML += `
    <li class="aqi-list">
      <p class="${item.class}">${item.num}</p>
      <p><span>${item.text}</span></p>
    </li>
    `
  }
}, false)
//
aqiBox.addEventListener('click', (e) => {
  let siteData = null
  switch (e.target.tagName.toLowerCase()) {
    case 'p':
      siteData = e.target.parentNode.querySelector('p')
      break
    case 'span':
      siteData = e.target.parentNode.parentNode.querySelector('p')
      break
  }
  document.querySelector('#cityName').textContent = siteData.dataset.name
  document.querySelector('#aqiValue').textContent = siteData.dataset.aqi
  document.querySelector('#o3Value').textContent = siteData.dataset.o3
  document.querySelector('#pm10Value').textContent = siteData.dataset.pm10
  document.querySelector('#pm25Value').textContent = siteData.dataset.pm25
  document.querySelector('#coValue').textContent = siteData.dataset.co
  document.querySelector('#so2Value').textContent = siteData.dataset.so2
  document.querySelector('#no2Value').textContent = siteData.dataset.no2
  let level = ''
  let aqi = siteData.dataset.aqi
  if (0 <= aqi && aqi <= 50) level = 'level-1'
  if (51 <= aqi && aqi <= 100) level = 'level-2'
  if (101 <= aqi && aqi <= 150) level = 'level-3'
  if (151 <= aqi && aqi <= 200) level = 'level-4'
  if (201 <= aqi && aqi <= 250) level = 'level-5'
  if (251 <= aqi && aqi <= 300) level = 'level-6'
  document.querySelector('#aqiValue').className = level
})