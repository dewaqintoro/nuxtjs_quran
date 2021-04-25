<template>
  <div class="main">
    <div class="content">
      
      <div class="container">
        <div class="my-item">
          <p>v1e</p>
          <SearchComp @search="searchFilter" :fields='dataFields' :data='dataCity'/>
          <!-- <h1>Lokasi v2</h1> -->
          <p v-if="ifError">Data tidak tersedia</p>
          <div v-else>
            <div v-if="!loading">
              <p v-if="weather.weather">{{weather.city_name}}, {{selectedCity[0].admin_name}}</p>
              <p v-if="weather.weather">{{weather.weather.description}}</p>
              <p>{{weather.app_temp}}°C</p>
            </div>
          </div>
          <!-- <button @click="cek">cek</button> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, useAsync, useContext } from '@nuxtjs/composition-api'
import dataJson from '~/data/cityid.json'
import SearchComp from '~/components/SearchNewComp.vue'
import axios from 'axios'

export default {
  name: 'Quran',
  components: {
    SearchComp
  },
  setup(_, {emit}){
    const { app, store } = useContext()
    // const dataCity = dataJson.rajaongkir?.results
    const dataCity = dataJson
    const search = ref('')
    const allData = ref([])
    const dataFields= {value: 'city'}
    const weather = ref([])
    const minutely = ref([])
    const initialData = ({
        city: "Sleman",
        country: "Indonesia", 
        admin_name: "Yogyakarta",
    })
    const selectedCity = ref([initialData])
    const ifError = ref(false)
    const loading = ref (true)
    const author = `<a href='https://www.freepik.com/vectors/icons'>Icons vector created by anindyanfitri - www.freepik.com</a>`

    // searchFilter(search.value)
    // searchFilter()
    cekCuaca()

    return {
      search,
      dataCity,
      weather,
      selectedCity,
      minutely,
      allData,
      loading,
      dataFields,
      searchFilter,
      cek,
      cekCuaca,
      ifError
    }

    async function cekCuaca(){
      console.log('selectedCity', selectedCity.value)
      loading.value = true
       const params = {
        lat : selectedCity.value[0]?.lat || '-7.7156',
        long : selectedCity.value[0]?.lng || '110.3556',
        // city : selectedCity.value[0]?.city || 'Sleman',
      }

      // const url = `http://localhost:5000/api/v1/cuaca`
      const url = `https://ngodingbentar-be.herokuapp.com/api/v1/cuaca`
      // const url = `http://localhost:5000/api/v1/history`
      // const result = await axios.get(url, {params});
      // console.log('result v2', result)

      if(selectedCity.value[0] !== 'undefined'){
        const result = await axios.get(url, {params});
        weather.value = result?.data?.data[0]
        minutely.value = result.data?.minutely
        loading.value = false
        // console.log('result v2', result?.data)
      } else {
        console.log(selectedCity)
      }
           
    }

    function searchFilter(data){
      // console.log('key search', data)
      if(data === null ){
        data = ''
      }
      const result = dataCity.filter(doa =>
        doa.city.toLowerCase().includes(data.toLowerCase())
      );
      allData.value = result
      console.log(result.length)
      
      if(result.length === 1){
        selectedCity.value = result
        ifError.value = false
        cekCuaca()
      } else if (result.length === 8912) {
        ifError.value = false
      } else {
        if(result.length <=100){
          result.map(hasil => {
            if(hasil.city.length === data.length){
              selectedCity.value = result
              console.log('hasil', selectedCity.value)
              cekCuaca()
            } else {
              ifError.value = true
            }
          })
        } else {
          ifError.value = true
        }
      }
    }

    async function cek(){
      console.log('weather.value', weather.value)
      console.log('selectedCity.value[0] ', selectedCity.value[0] )
    }

  }
}
</script>

<style lang="postcss" scoped>
.main {
  @apply min-h-screen bg-gray-100 items-center flex justify-center;
}

.content {
  @apply bg-gray-300 text-center;
  z-index: 10;
}

.container{
  @apply w-full h-full;
  position: relative;
  max-width: 400px;
  max-height: 400px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(5px);
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.my-item {
  position: relative;
  width: 100%;
  height: 100%;
}
.my-item h2 {
  position: relative;
  color: #fff;
  font-size: 24px;
  font-weight: 600;
  letter-spacing: 1px;
  margin-bottom: 40px;
}

.my-item h2::before {
  content: '';
  position: absolute;
  left: 0;
  bottom: -10px;
  width: 80px;
  height: 4px;
  background: #fff;
}

.my-item .inputBox {
  width: 100%;
  margin-top: 20px;
}

.my-item .inputBox input {
  width: 100%;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  outline: none;
  padding: 10px 20px;
  border-radius: 35px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 16px;
  letter-spacing: 1px;
  color: #fff;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.my-item .inputBox input::placeholder {
  color: #fff;
}

.my-item .inputBox input[type="submit"]{
  background: #fff;
  color: #666;
  max-width: 100px;
  cursor: pointer;
  margin-bottom: 20px;
  font-weight: 600;
}

</style>