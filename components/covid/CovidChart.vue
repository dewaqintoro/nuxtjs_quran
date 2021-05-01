<template>
  <div class="analitik">
    <div class="chart-title">Analitik</div>
    <button @click="cek">cek</button>
    <div class="myChart">
      <ClientOnly>
        <div id="chart">
          <apexchart type="line" height="350" :options="chartOptions" :series="series"></apexchart>
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
export default {
  name: 'Chart',
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
    daysData: {
      type: Array,
      required: true,
    },
    daysDeath: {
      type: Array,
      required: true,
    },
  },
  setup(props, {emit}){
    const { app, store } = useContext()
    const myDate = props.daysDate.map((p) => {
      return p.day
    })
    const myData = props.daysData.map((p) => {
      return p.positif.value
    })
    // const series= [{
    //   name: "Kasus",
    //   data: myData
    // }]
    const series= [
      {
        name: "Positif",
        data: myData
      },
      {
        name: "Meninggal",
        data: props.daysDeath
      }
    ]
    const chartOptions= {
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: true
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      // title: {
      //   text: 'Perkembangan Kasus Terkonfirmasi Positif Covid-19 Per-Hari',
      //   align: 'left'
      // },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        },
      },
      xaxis: {
        type: 'datetime',
        categories: myDate,
        tickAmount: 6,
      },
    }
    return {
      series,
      chartOptions,
      cek
    }
    function cek(){
      // console.log('myDate', myDate)
      console.log('props.daysDeath', props.daysDeath)
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
