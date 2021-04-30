<template>
  <div class="main">
    <div class="one">
      <div class="header font-bold">
        <div class="text-center text-3xl">Covid</div>
        <!-- <button @click="cek">cek</button> -->
        <p class="text-xl">Statistik</p>
      </div>
      <div class="statistik">
        <div class="switch">
          <div class="bg-gray-100">
            <div class="box">
              <input type="checkbox" class="toggle-btn" />
              <div class="signup"></div>
              <div class="login"></div>
            </div>
          </div>
        </div>
        <div class="case mt-14">
          <div class="p-10 sm:p-16 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 lg:gap-6 ">
            <div class="positif text-white text-center text-5xl py-4 rounded-lg">5</div>
            <div class="meninggal text-white text-center text-5xl py-4 rounded-lg">6</div>
            <div class="tiga bg-blue-500 text-white text-center text-5xl py-4 rounded-lg sm:col-span-2 md:col-span-1">7</div>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, useAsync, useContext } from '@nuxtjs/composition-api'
import axios from 'axios'
import Loading from '@/components/Loading.vue'

export default {
  name: 'Chart',
  components: {
    Loading
  },
  setup(_, {emit}){
    const { app, store } = useContext()
    const global_Confirmed = ref([])
    const global_Recovered = ref([])
    const global_Deaths = ref([])
    const global_Cases = ref({})

    const series= [
      {
        name: "High - 2013",
        data: [28, 29, 33, 36, 32, 32, 33]
      },
      {
        name: "med - 2013",
        data: [12, 11, 14, 18, 17, 13, 13]
      },
      {
        name: "Low - 2013",
        data: [21, 15, 24, 12, 27, 23, 13]
      }
    ]

    const chartOptions= {
      chart: {
        height: 350,
        type: 'line',
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2
        },
        toolbar: {
          show: false
        }
      },
      colors: ['#77B6EA', '#545454'],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: 'smooth'
      },
      title: {
        text: 'Average High & Low Temperature',
        align: 'left'
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        },
      },
      markers: {
        size: 1
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        title: {
          text: 'Month'
        }
      },
      yaxis: {
        title: {
          text: 'Temperature'
        },
        min: 5,
        max: 40
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -5
      }
    }
    // globalCases()
    indoCases()
    return {
      series,
      chartOptions,
      global_Cases,
      global_Confirmed,
      global_Recovered,
      global_Deaths,
      cek,
      globalConfirmed,
      globalRecovered,
      globalDeaths
    }

    async function cek(){
      console.log("11"+1);
      console.log("11"-1);
    }

    async function indoCases(){
      try{
        const url = `https://data.covid19.go.id/public/api/update.json`
        const result = await axios.get(url);
        // global_Cases.value = result.data

        console.log('result', result)
      } catch (err){
        console.log('err', err)
      }
    }

    async function globalCases(){
      try{
        const url = `https://covid19.mathdro.id/api`
        const result = await axios.get(url);
        global_Cases.value = result.data

        console.log('global_Cases.value', global_Cases.value)
      } catch (err){
        console.log('err', err)
      }
    }

    async function globalConfirmed(){
      try{
        const url = `https://covid19.mathdro.id/api/confirmed`
        const result = await axios.get(url);
        global_Confirmed.value = result.data
      } catch (err){
        console.log('err', err)
      }
    }

    async function globalRecovered(){
      try{
        const url = `https://covid19.mathdro.id/api/recovered`
        const result = await axios.get(url);
        global_Recovered.value = result.data
        console.log('global_Recovered.value', global_Recovered.value)
      } catch (err){
        console.log('err', err)
      }
    }

    async function globalDeaths(){
      try{
        const url = `https://covid19.mathdro.id/api/deaths`
        const result = await axios.get(url);
        global_Deaths.value = result.data
        console.log('global_Deaths.value', global_Deaths.value)
      } catch (err){
        console.log('err', err)
      }
    }

  }
}
</script>

<style lang="postcss" scoped>
.positif {
  background: rgb(253, 166, 4);
}

.meninggal {
  background: rgb(223, 43, 43);
}
.toggle-btn {
  -webkit-appearance: none;
  width: 250px;
  height: 40px;
  border: 1px solid gray;
  position: absolute;
  top: 12%;
  left: calc(50% - 125px);
  border-radius: 100px;
}

.toggle-btn:before{
  @apply grid text-black font-bold place-items-center;
  content: 'Indonesia';
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  background: white;
  border-radius: 100px;
  transition: 0.5s;
}

.toggle-btn:checked:before{
  content: 'Global';
  left: 50%;
}
.one {
  @apply text-white;
  min-height: 300px;
  background: rgb(48, 6, 126);
}
.case {
  @apply w-full;
}

@media (max-width: 500px) {
  .tiga{
    @apply col-span-2;
  }
}
</style>
