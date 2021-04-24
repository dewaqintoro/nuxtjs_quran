<template>
  <div class="main">
    <div class="content">
      <SearchComp @search="searchFilter" :fields='dataFields' :data='dataDoa'/>
      <h1>Lokasi v2</h1>
      <p v-if="weather.current">{{weather.current.temperature}}</p>
      <p v-if="weather.location">{{weather.location.name}}, {{weather.location.region}}, {{weather.location.country}} </p>
      <button @click="cek">cek</button>
    </div>
    <!-- <div class="box">
      <div class="square" style="--i:0"></div>
      <div class="square" style="--i:1"></div>
      <div class="square" style="--i:2"></div>
      <div class="square" style="--i:3"></div>
      <div class="square" style="--i:4"></div>
    </div> -->
  </div>
</template>

<script>
import { computed, ref, useAsync, useContext } from '@nuxtjs/composition-api'
import dataJson from '~/data/city.json'
import SearchComp from '~/components/SearchNewComp.vue'
import axios from 'axios'

export default {
  name: 'Quran',
  components: {
    SearchComp
  },
  setup(_, {emit}){
    const { app, store } = useContext()
    const dataDoa = dataJson.rajaongkir?.results
    const search = ref('')
    const allData = ref([])
    const dataFields= {value: 'city_name'}
    const weather = ref([])

    // searchFilter(search.value)
    // searchFilter()

    return {
      search,
      dataDoa,
      weather,
      allData,
      dataFields,
      searchFilter,
      cek,
    }

    function searchFilter(data){
      if(data === null ){
        data = ''
      }
        const result = dataDoa.filter(doa =>
          doa.city_name.toLowerCase().includes(data.toLowerCase())
        );
        allData.value = result
        console.log(result)
    }

    async function cek(){
      console.log('weather', weather.value)
      console.log('temperature', weather.value?.current?.temperature)
    }

    async function searchFilter(data){
      console.log('data v2', data)
      const params = {
        access_key: '260d5d4d9750bca976a2fca0d279b280',
        query: data+', Indonesia',
      }

      // const url = `http://api.weatherstack.com/current`
      const url = `https://ngodingbentar-be.herokuapp.com/api/v1/cuaca`
      
      // const result = await axios.get(`${url}`, {params});
      const result = await axios.get(url);
      weather.value = result.data
      console.log('result v2', result.data.current.temperature)
      // province.value = data?.data?.rajaongkir?.results
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
    transform: translateY(-40px);
  }
  50%{
    transform: translateY(40px);
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