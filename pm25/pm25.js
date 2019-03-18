const header = document.getElementById('header')
const view = document.getElementById('view')
const select = document.getElementById('select')
const card = document.createElement('div')
const info = document.createElement('div')
const spaceBottom = document.createElement('div')
const spaceTop = document.createElement('div')
info.setAttribute('id', 'infoContainer')
info.innerHTML = '<div id="infoSource">資料來源：行政院環境保護署環境資源資料開放平台<br><a href="https://opendata.epa.gov.tw/" target="_blank">https://opendata.epa.gov.tw/</a></div>'
card.setAttribute('id', 'cardContainer')
card.innerHTML = '<div class="hello">PM2.5</div>'
spaceTop.setAttribute('class', 'spaceTop')
spaceBottom.setAttribute('class', 'spaceBottom')
view.appendChild(spaceTop)
view.appendChild(card)
view.appendChild(spaceBottom)
document.body.appendChild(info)
// options
function showSelects(e){
    // we don't want repeat options
    let optionOrigin = []
    let optionPicked = []
    for (let i=0, l=e.length; i<l; i++){
        optionOrigin.push(e[i].County)
        if (optionOrigin.indexOf(optionOrigin[i]) == i){
            optionPicked.push(optionOrigin[i])
        }
    }
    // create an initial option
    optionPicked.sort()
    let optionInit = document.createElement('option')
    optionInit.textContent = '請選擇'
    optionInit.setAttribute('value', '請選擇')
    select.appendChild(optionInit)
    // show options
    for (let i=0, l = optionPicked.length; i<l; i++){
        let option = document.createElement('option')
        option.textContent = optionPicked[i]
        option.setAttribute('value', optionPicked[i])
        select.appendChild(option)
    }
}
// show pm2.5 content cards
function showContent(json) {
    select.addEventListener('change', function(e){
        // show specific card
        let value = e.target.value
        if (value !== '請選擇'){
            card.innerHTML = ''
            for (let i=0, l = json.length; i<l; i++){
                if (value === json[i].County)
                // card.innerHTML += '<div class="card"><div class="cardHeader">空氣品質AQI</div><div class="cardContent">測站：' + json[i].SiteName + '<br>縣市：' + json[i].County + '<br>濃度：<span class="con"><b>' + json[i].Concentration + '</b></span> &mu;g/m<sup>3</sup> <img src="img/help.png" class="helpIcon" /><br>監測時間：<br>' + json[i].MonitorDate + '</div><div class="help">PM2.5數值說明：<br><span class="low">[低]0~35：可正常戶外活動</span><br><span class="medium">[中]36~53：一般民眾正常戶外活動，敏感性族群建議減少戶外活動</span><br><span class="high">[高]54~70：若感到不適請減少戶外活動</span><br><span class="reallyhigh">[非常高]>71：應減少戶外活動</span></div></div>'
                card.innerHTML += '<div class="card"><div class="cardHeader">空氣品質AQI</div><div class="cardContent">測站：' + json[i].SiteName + '<br>縣市：' + json[i].County + '<br>濃度：<span class="con"><b>' + json[i].Concentration + '</b></span> &mu;g/m<sup>3</sup> <img src="img/help.png" class="helpIcon" /><br>監測時間：<br>' + json[i].MonitorDate + '<div class="help">PM2.5數值說明：<br><span class="low">[低]0~35：可正常戶外活動</span><br><span class="medium">[中]36~53：一般民眾正常戶外活動，敏感性族群建議減少戶外活動</span><br><span class="high">[高]54~70：若感到不適請減少戶外活動</span><br><span class="reallyhigh">[非常高]>71：應減少戶外活動</span></div></div></div>'
            }
        }
        // change font color depend on PM2.5
        let con = card.querySelectorAll('.con')
        for (let i=0, l=con.length; i<l; i++){
            let conValue = con[i].childNodes[0].childNodes[0].nodeValue
            let conNumber = parseInt(conValue)
            if (conNumber < 36){
                con[i].style.color = 'green'
            } else if (conNumber < 54){
                con[i].style.color = 'orange'
            } else if (conNumber < 71){
                con[i].style.color = 'red'
            } else {
                con[i].style.color = 'purple'
            }
        }
    }, false)
}
// AJAX
function processStatus(response){
    if (response.status === 200 || response.status === 0){
        return Promise.resolve(response)
    } else {
        return Promise.reject(new Error(response.statusText))
    }
}
function getInformation(){
    let url = 'https://cors-anywhere.herokuapp.com/opendata.epa.gov.tw/api/v1/ATM00766?%24skip=0&%24top=1000&%24format=json'
    fetch(url, {method: 'GET'})
    .then(processStatus)
    .then(function(response){ 
        return response.json()
    }).then(function(json){
        showSelects(json)
        showContent(json)
    }).catch(function(err){
        view.innerHTML = err
    })
}
getInformation()