// 父層呼叫 ajax 得到資料後，再行渲染 component，資料可重複利用
Vue.component('city-component', {
  // template: `
  // <div class="city">
  //   <p id="currCity"></p>
  //   <p
  //     v-for="(city, index) of cityName"
  //     :key="index"
  //   >{{ city }}</p>
  // </div>
  // `,
  template: '<div></div>',
  props: {
    'parentData': {
      type: [Array]
    }
  },
  data() {
    return {
      cityName: []
    }
  },
  computed: {
    cityNameSorted() {
      return this.cityName.sort()
    }
  },
  watch: {
    parentData() {
      let result = new Set()
      this.parentData.forEach(item => {
        result.has(item.County) ? '' : result.add(item.County)
      })
      console.log(result)
      this.cityName = [...result]
    }
  }
})

const app = new Vue({
  el: '#app',
  template: '#container-component',
  data: {
    aqiData: null,
    aqiURL: 'https://cors-anywhere.herokuapp.com/opendata.epa.gov.tw/webapi/api/rest/datastore/355000000I-000259?sort=County&offset=0&limit=1000',
    cityList: [
      "基隆市","新北市","臺北市","桃園市","新竹縣","新竹市","苗栗縣","臺中市","彰化縣","雲林縣","嘉義縣",
      "嘉義市","南投縣","臺南市","高雄市","屏東縣","宜蘭縣","花蓮縣","臺東縣","澎湖縣","連江縣","金門縣"
    ]
  },
  methods: {
    fetchData(url) {
      fetch (url, {method: 'GET'})
      .then (res => {
        return res.json()
      }).then (data => {
        this.aqiData = data.result.records
      })
    }
  },
  created() {
    this.fetchData(this.aqiURL)
  },
  watch: {
    aqiData() {
      console.log(this.aqiData.length)
    }
  }
})

// 可能要在 vue.CLI才能用(?)
// Vue.config.devtools = true;