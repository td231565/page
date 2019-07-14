// 子組件綁定 ajax，待資料回傳後，再行渲染
Vue.component('city-component', function (resolve){
  let url = 'https://cors-anywhere.herokuapp.com/opendata.epa.gov.tw/api/v1/AQI?%24skip=0&%24top=1000&%24format=json'
  fetch (url, {method: 'GET'})
  .then (res => {
    return res.json()
  }).then (data => {
    console.log(data.length)
    resolve({
      template: `
      <div class="city">
        <p v-for="item of aqiData">{{ item.County }}</p>
      </div>
      `,
      data() {
        return {
          aqiData: data
        }
      },
      created() {
        // 此時 aqiData == undefined
        // Q: 但此 component 應為 AJAX 回傳後才行渲染，所以 created 時應有資料才對
        // console.log(aqiData.length)
      }
    })
  })
})