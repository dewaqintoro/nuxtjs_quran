<template>
  <div class="analitik">
    <div class="chart-title">Bar</div>
    <button @click="cek">cek</button>
    <div class="myChart">
      <ClientOnly>
        <div id="chart">
          <!-- <apexchart type="area" height="350" :options="chartOptions" :series="series"></apexchart> -->
          <apexchart type="bar" height="750" :options="chartOptions" :series="series"></apexchart>
        </div>
      </ClientOnly>

    </div>
  </div>
</template>

<script>
import { computed, ref, useAsync, useContext } from '@nuxtjs/composition-api'
import axios from 'axios'
import Loading from '@/components/Loading.vue'
import CovidStatistik from '@/components/covid/CovidStatistik.vue'
import CovidChart from '@/components/covid/CovidChart.vue'
import dataJson from '~/data/prov.json'

export default {
  name: 'Bar',
  components: {
    Loading,
    CovidStatistik,
    CovidChart
  },
  props: {
    daysDate: {
      type: Array,
      required: true,
    },
    daysPositif: {
      type: Array,
      required: true,
    },
    daysDeath: {
      type: Array,
      required: true,
    },
    daysRecovered: {
      type: Array,
      required: true,
    },
    
  },
  setup(props, {emit}){
    const { app, store } = useContext()
    const myProv = dataJson.list_data
    const prov = myProv.map((p) => {
      return p.key
    })
    const cases = myProv.map((p) => {
      return p.jumlah_kasus
    })
    const deaths = myProv.map((p) => {
      return p.jumlah_meninggal
    })
    const recovered = myProv.map((p) => {
      return p.jumlah_sembuh
    })
    const treated = myProv.map((p) => {
      return p.jumlah_dirawat
    })
    
    
    
    const series= [
      {
        name: 'Positif',
        data: cases
      },
      {
        name: 'Sembuh',
        data: recovered
      },
      {
        name: 'Dirawat',
        data: treated
      },
      {
        name: 'Meninggal',
        data: deaths
      }
    ]
    const chartOptions= {
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
        zoom: {
          enabled: true
        }
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      stroke: {
        width: 1,
        colors: ['#fff']
      },
      title: {
        text: 'Fiction Books Sales'
      },
      xaxis: {
        categories: prov,
        labels: {
          formatter: function (val) {
            return val + " kasus"
          }
        }
      },
      yaxis: {
        title: {
          text: undefined
        },
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + " Kasus"
          }
        }
      },
      fill: {
        opacity: 1
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
        offsetX: 40
      }
    }
    return {
      series,
      chartOptions,
      cek
    }
    function cek(){
      console.log('myProv', myProv)
      console.log('recovered', recovered)
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
