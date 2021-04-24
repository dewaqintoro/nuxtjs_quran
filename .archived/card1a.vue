<template>
  <div class="main">
    <div class="content">
      <!-- <SearchComp @search="searchFilter" :fields='dataFields' :data='dataCity'/>
      <h1>Lokasi v2</h1>
      <p v-if="weather.app_temp">{{weather.app_temp}}</p>
      <p v-if="weather.city_name">{{weather.city_name}} </p>
      <button @click="cek">cek</button> -->
      <div class="container">
        <div class="my-item">
          <h2>Login my-item</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, useAsync, useContext } from '@nuxtjs/composition-api'
import dataJson from '~/data/csvjson.json'
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
    const dataFields= {value: 'name'}
    const weather = ref([])
    const selectedCity = ref([])

    // searchFilter(search.value)
    // searchFilter()

    return {
      search,
      dataCity,
      weather,
      allData,
      dataFields,
      searchFilter,
      cek,
      cekCuaca,
    }

    async function cekCuaca(){
      console.log('selectedCity', selectedCity.value[0])
       const params = {
        lat : selectedCity.value[0]?.latitude,
        long : selectedCity.value[0]?.longitude,
      }

      // const url = `http://localhost:5000/api/v1/cuaca`
      const url = `https://ngodingbentar-be.herokuapp.com/api/v1/cuaca`

      if(selectedCity.value[0] !== 'undefined'){
        const result = await axios.get(url, {params});
        weather.value = result?.data?.data[0]
        console.log('result v2', result?.data?.data[0])
      } else {
        console.log('selectedCity undefined', selectedCity)
      }
           
    }

    function searchFilter(data){
      // console.log('key search', data)
      if(data === null ){
        data = ''
      }
      const result = dataCity.filter(doa =>
        doa.name.toLowerCase().includes(data.toLowerCase())
      );
      allData.value = result
      if(result.length === 1){
        selectedCity.value = result
        cekCuaca()
      }
      // console.log('hasil pilihan',result)
    }

    async function cek(){
      console.log('weather.value', weather.value)
      // console.log('temperature', weather.value?.current?.temperature)
    }



    async function cekWeather1(){
      console.log('cekWeather')
      // const params = {
      //   access_key: '260d5d4d9750bca976a2fca0d279b280',
      //   query: data+', Indonesia',
      // }

      // const url = `http://api.weatherstack.com/current`
      const url = `https://ngodingbentar-be.herokuapp.com/api/v1/cuaca`
      
      // const result = await axios.get(`${url}`, {params});
      const result = await axios.get(url);
      weather.value = result.data
      console.log('result v2', result.data.current.temperature)
      // province.value = data?.data?.rajaongkir?.results
    }

    async function cekWeather(){
      const lat = 58.7984;
      const lng = 17.8081;
      const params = 'waveHeight,airTemperature';

      fetch(`https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=${params}`, {
        headers: {
          'Authorization': 'example-api-key'
        }
      }).then((response) => response.json()).then((jsonData) => {
      });
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
  padding: 40px;
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

.box{
  position: relative;
}
.box .square {
  position: absolute;
  backdrop-filter: blur(5px);
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  animation: animate 10s linear infinite;
  animation-delay: calc(-1s * var(--i));
}
@keyframes animate {
  0%, 100%{
    transmy-item: translateY(-40px);
  }
  50%{
    transmy-item: translateY(40px);
  }
}

.box .square:nth-child(1){
  top: 50px;
  right: 30vw;
  width: 100px;
  height: 100px;
  z-index: 2;
  background: greenyellow;
}
.box .square:nth-child(2){
  top: 150px;
  left: -100px;
  width: 120px;
  height: 120px;
  z-index: 2;
  background: rgb(92, 255, 187);
}
.box .square:nth-child(3){
  bottom: 50px;
  right: -60px;
  width: 80px;
  height: 80px;
  z-index: 2;
  background: rgb(164, 178, 255);
}
.box .square:nth-child(4){
  bottom: -40px;
  right: -10vw;
  width: 50px;
  height: 50px;
  background: rgb(255, 47, 193);
}
.box .square:nth-child(5){
  top: -80px;
  left: -40vw;
  width: 60px;
  height: 60px;
  background: rgb(255, 47, 47);
}

@screen tablet {
  .box .square:nth-child(1){
    top: 50px;
    right: 30vw;
    width: 100px;
    height: 100px;
    z-index: 2;
    background: greenyellow;
  }
  .box .square:nth-child(2){
    top: 150px;
    left: -100px;
    width: 120px;
    height: 120px;
    z-index: 2;
    background: rgb(92, 255, 187);
  }
  .box .square:nth-child(3){
    bottom: 50px;
    right: -60px;
    width: 80px;
    height: 80px;
    z-index: 2;
    background: rgb(164, 178, 255);
  }
  .box .square:nth-child(4){
    bottom: -40px;
    right: -10vw;
    width: 50px;
    height: 50px;
    background: rgb(255, 47, 193);
  }
  .box .square:nth-child(5){
    top: -80px;
    left: -40vw;
    width: 60px;
    height: 60px;
    background: rgb(255, 47, 47);
  }

}


@screen mobile {
  /* .box .square:nth-child(1){
    top: 50px;
    right: 50vw;
    width: 100px;
    height: 100px;
    z-index: 2;
    background: greenyellow;
  }
  .box .square:nth-child(2){
    top: 150px;
    left: -100px;
    width: 120px;
    height: 120px;
    z-index: 2;
    background: rgb(92, 255, 187);
  }
  .box .square:nth-child(3){
    bottom: 50px;
    right: -5vw;
    width: 80px;
    height: 80px;
    z-index: 2;
    background: rgb(164, 178, 255);
  }
  .box .square:nth-child(4){
    bottom: -40px;
    right: 4vw;
    width: 50px;
    height: 50px;
    background: rgb(255, 47, 193);
  }
  .box .square:nth-child(5){
    top: 150px;
    right: 50vw;
    width: 100px;
    height: 100px;
    z-index: 2;
    background: rgb(255, 47, 47);
  } */
}
</style>