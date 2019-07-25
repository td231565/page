const view = document.querySelector('.view')
const selectBox = document.querySelector('.select-box')
const currCity = document.querySelector('#currCity')
const citySelect = document.querySelector('#citySelect')
const card = document.querySelector('#cardContainer')
const coverLayer = document.querySelector('.cover-layer')
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
    citySelect.innerHTML += `<p class="opts-city">${city}</p>`
  })
}
// show pm2.5 content cards
function showContent(json) {
  citySelect.addEventListener('change', function (e) {
    // show specific card
    let value = e.target.value
    if (value !== '請選擇') {
      card.innerHTML = ''
      for (let i = 0, l = json.length; i < l; i++) {
        if (value === json[i].County)
          card.innerHTML += `
          <div class="card">
            <div class="cardHeader">空氣品質AQI</div>
            <div class="cardContent">
              測站：${json[i].SiteName}<br>
              縣市：${json[i].County}<br>
              濃度：<span class="con"><b>${json[i].Concentration}</b></span> &mu;g/m<sup>3</sup> <img src="./src/img/help.png" class="helpIcon" /><br>
              監測時間：<br>${json[i].MonitorDate}
              <div class="help">PM2.5數值說明：<br>
                <span class="low">[低]0~35：可正常戶外活動</span><br>
                <span class="medium">[中]36~53：一般民眾正常戶外活動，敏感性族群建議減少戶外活動</span><br>
                <span class="high">[高]54~70：若感到不適請減少戶外活動</span><br>
                <span class="reallyhigh">[非常高]>71：應減少戶外活動</span>
              </div>
            </div>
          </div>
          `
      }
    }
    // change font color depend on PM2.5
    let con = card.querySelectorAll('.con')
    for (let i = 0, l = con.length; i < l; i++) {
      let conValue = con[i].childNodes[0].childNodes[0].nodeValue
      let conNumber = parseInt(conValue)
      if (conNumber < 36) {
        con[i].style.color = 'green'
      } else if (conNumber < 54) {
        con[i].style.color = 'orange'
      } else if (conNumber < 71) {
        con[i].style.color = 'red'
      } else {
        con[i].style.color = 'purple'
      }
    }
  }, false)
}
// AJAX
function processStatus(response) {
  if (response.status === 200 || response.status === 0) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}
function getInformation() {
  let url = 'https://cors-anywhere.herokuapp.com/opendata.epa.gov.tw/api/v1/ATM00766?%24skip=0&%24top=1000&%24format=json'
  fetch(url, { method: 'GET' })
    .then(processStatus)
    .then(function (response) {
      return response.json()
    }).then(function (json) {
      showCitySelectOpts(json)
      // showContent(json)
      coverLayer.textContent = '讀取完畢！'
      coverLayer.classList.add('hide')
    }).catch(function (err) {
      view.innerHTML = err
    })
}
getInformation()
// 建立 loader page 的 DOM
window.addEventListener('DOMContentLoaded', () => {
  let loaderAnimation = document.querySelector('.loader')
  for (let i=0; i<5; i++){
    let dot = document.createElement('div')
    dot.className = 'dot'
    loaderAnimation.appendChild(dot)
  }
})
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
  }
})