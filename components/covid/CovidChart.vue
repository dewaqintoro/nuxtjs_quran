<template>
  <div class="analitik">
    <div class="chart-title">Analitik</div>
    <div class="myChart">
      <ClientOnly>
        <div id="chart">
          <apexchart type="area" height="350" :options="chartOptions" :series="series"></apexchart>
        </div>
      </ClientOnly>

    </div>
  </div>
</template>

<script>
import { computed, ref, useAsync, useContext } from '@nuxtjs/composition-api'
export default {
  name: 'Chart',
  // components: {
  // },
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
    const series= [
      {
        name: "Positif",
        data: props.daysPositif
      },
      {
        name: "Sembuh",
        data: props.daysRecovered
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
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5
        },
      },
      xaxis: {
        type: 'datetime',
        categories: props.daysDate,
        tickAmount: 6,
      },
    }
    return {
      series,
      chartOptions,
      cek
    }
    function cek(){
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
