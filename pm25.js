const view = document.getElementById('view')
const select = document.getElementById('select')
const info = document.createElement('div')
info.setAttribute('id', 'info')
// options
function showSelects(e){
    for (let i=0, l = e.length; i<l; i++){
        const option = document.createElement('option')
        option.textContent = e[i].SiteName
        option.setAttribute('value', i)
        select.appendChild(option)
    }
}
// card text content
function cardContent(e){
    for (let i=0, l = e.length; i<l; i++){
        const card = document.createElement('div')
        card.classList.add('card', 'card'+i)
        view.appendChild(card)
        card.innerHTML = '<div class="header">空氣品質AQI</div><div>測站：' + e[i].SiteName + '<br>縣市：' + e[i].County + '<br>濃度：<span class="con"><b>' + e[i].Concentration + '</b></span> &mu;g/m<sup>3</sup><br>監測時間：' + e[i].MonitorDate + '</div>'
    }
    let firstCard = document.querySelector('.card0')
    firstCard.style.display = 'block'
    view.appendChild(info)
    info.innerHTML = 'PM2.5數值說明：<br>[低]0~35：正常戶外活動<br>[中]36~53：一般民眾正常戶外活動，敏感性族群建議減少戶外活動<br>[高]54~70：若感到不適請減少戶外活動<br>[非常高]>71：應減少戶外活動'
}
// AJAX
function processStatus(response){
    if (response.status === 200 || response.status === 0){
        return Promise.resolve(response)
    } else {
        return Promise.reject(new Error(response.statusText))
    }
}
function showContent(){
    let url = 'https://cors-anywhere.herokuapp.com/opendata.epa.gov.tw/api/v1/ATM00766?%24skip=0&%24top=1000&%24format=json'
    fetch(url, {method: 'GET'})
    .then(processStatus)
    .then(function(response){ 
        return response.json()
    }).then(function(json){
        cardContent(json)
        showSelects(json)
    }).catch(function(err){
        view.innerHTML = err
    })
}
showContent()

select.addEventListener('change', function(e){
    // show specific card
    let card = document.querySelectorAll('.card')
    for (let i=0, l=card.length; i<l; i++){
        card[i].style.display = 'none'
    }
    card[e.target.value].style.display = 'table'
    // change font color depend on PM2.5
    let con = card[e.target.value].querySelector('.con')
    let conValue = con.childNodes[0].childNodes[0].nodeValue
    let conNumber = parseInt(conValue)
    if (conNumber < 36){
        con.style.color = 'green'
    } else if (conNumber < 54){
        con.style.color = 'orange'
    } else if (conNumber < 71){
        con.style.color = 'red'
    } else {
        con.style.color = 'purple'
    }
}, false)