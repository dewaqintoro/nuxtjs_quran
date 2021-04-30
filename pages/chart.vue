<template>
  <div class="analitik">
    <!-- <AnalitikDropdown /> -->
    <div class="chart-title">Analitik 2</div>
    <button @click="cek">cek</button>
    
    <div v-if="global_Cases.confirmed">
      <div>confirmed: {{global_Cases.confirmed.value}}</div>
      <div>recovered: {{global_Cases.recovered.value}}</div>
      <div>deaths: {{global_Cases.deaths.value}}</div>
    </div>
    <!-- <div class="myChart">
      <ClientOnly>
        <div id="chart">
          <apexchart type="line" height="350" :options="chartOptions" :series="series"></apexchart>
        </div>
      </ClientOnly>
    </div> -->
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
      // console.log('global_Confirmed.value', global_Confirmed.value)
      // globalConfirmed()
      // globalRecovered()
      // globalDeaths()
      globalCases()
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
        console.log('global_Confirmed.value', global_Confirmed.value)
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
.analitik {
  .chart-title {
    @apply py-4;
  }
  .myChart {
    @apply p-4;
    height: 100%;
    background: #fff;
    box-shadow: 0.1px 2px 6px rgba(195, 199, 204, 0.5);
    border-radius: 6px;
  }
}
</style>
