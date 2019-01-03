const view = document.getElementById('view')
const form = document.createElement('form')
const selectFirst = document.createElement('select')
selectFirst.setAttribute('id', 'selectFirst')
selectFirst.classList.add('select')
const selectSecond = document.createElement('select')
selectSecond.setAttribute('id', 'selectSecond')
selectSecond.classList.add('select')
const info = document.createElement('div')
info.setAttribute('id', 'info')
view.appendChild(form)
form.appendChild(selectFirst)
form.appendChild(selectSecond)
// options
function showSelects(e){
    // collect County with no repeat
    let obj = e
    let countyOringin = []
    let countyPicked = []
    for (let i=0, l=e.length; i<l; i++){
        countyOringin.push(e[i].County)
        if (countyOringin.indexOf(countyOringin[i]) == i){
            countyPicked.push(countyOringin[i])
        }
    }
    countyPicked.sort()
    // options content
    for (let i=0, l=countyPicked.length; i<l; i++){
        let optionFirst = document.createElement('option')
        optionFirst.setAttribute('value', i)
        optionFirst.classList.add('county')
        selectFirst.appendChild(optionFirst)
        optionFirst.textContent = countyPicked[i]
    }
    /*
    for (let i=0, l = e.length; i<l; i++){
        let optionSecond = document.createElement('option')
        optionSecond.setAttribute('value', i)
        optionSecond.classList.add('sitename')
        selectSecond.appendChild(optionSecond)
        optionSecond.textContent = e[i].SiteName
    }
    */
    let selectSecondPicked = []
    for (let i=0, l=obj.County.length; i<l; i++){
        for (let n=0, d=countyPicked.length; n<d; n++){
            if (obj[i].County == countyPicked[n]){
                let optionSecondPicked = document.createElement('option')
                optionSecondPicked.textContent = obj[i].SiteName
                selectSecondPicked[n] = optionSecondPicked
            }
        }
    }
    
    /*
    selectFirst.addEventListener('change', function(e){
        let selectSecondPicked = []
        for (let i=0, l=obj.County.length; i<l; i++){
            for (let n=0, d=countyPicked.length; n<d; n++){
                if (obj[i].County == countyPicked[n]){
                    let optionSecondPicked = document.createElement('option')
                    optionSecondPicked.textContent = obj[i].SiteName
                    selectSecondPicked[n] = optionSecondPicked
                }
            }
        }
    }, false)
    */
}
// cards content
function cardContent(e){
    for (let i=0, l = e.length; i<l; i++){
        let card = document.createElement('div')
        card.classList.add('card', 'card'+i)
        view.appendChild(card)
        card.innerHTML = '<div class="header">PM2.5測站數值</div><div>測站：' + e[i].SiteName + '<br>縣市：' + e[i].County + '<br>濃度：<span class="con"><b>' + e[i].Concentration + '</b></span><br>監測時間：' + e[i].MonitorDate + '</div>'
    }
    let firstCard = document.querySelector('.card0')
    firstCard.style.display = 'block'
    view.appendChild(info)
    info.innerHTML = 'PM2.5數值說明：<br><span class="low">[低]0~35：正常戶外活動</span><br><span class="medium">[中]36~53：一般民眾正常戶外活動，敏感性族群建議減少戶外活動</span><br><span class="high">[高]54~70：若感到不適請減少戶外活動</span><br><span class="veryhigh">[非常高]>71：應減少戶外活動</span>'
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
// select changed
/*
selectFirst.addEventListener('change', function(e){
    // let obj = fetch.json
    console.log(responseObj)
    for (let i=0, l=obj.County.length; i<l; i++){
        if (obj[i].County = e.target.value){
            let optionSecondPicked = document.createElement('option')
            optionSecondPicked.textContent = obj[i].SiteName
            selectSecond.appenChild(optionSecondPicked)
        }
    }
}, false)
*/
selectSecond.addEventListener('change', function(e){
    // show specific card
    let card = document.querySelectorAll('.card')
    for (let i=0, l=card.length; i<l; i++){
        card[i].style.display = 'none'
    }
    card[e.target.value].style.display = 'block'
    // change font color depend on PM2.5
    let con = card[e.target.value].querySelector('.con')
    let conValue = con.childNodes[0].childNodes[0].nodeValue
    let conNumber = parseInt(conValue)
    if (!conNumber){
        con.textContent = '不明'
    } else if (conNumber < 36){
        con.innerHTML += ' &mu;g/m<sup>3</sup>'
        con.style.color = 'green'
    } else if (conNumber < 54){
        con.innerHTML += ' &mu;g/m<sup>3</sup>'
        con.style.color = 'orange'
    } else if (conNumber < 71){
        con.innerHTML += ' &mu;g/m<sup>3</sup>'
        con.style.color = 'red'
    } else {
        con.innerHTML += ' &mu;g/m<sup>3</sup>'
        con.style.color = 'purple'
    }
}, false)