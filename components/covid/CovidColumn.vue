<template>
  <div class="analitik">
      <ClientOnly>
        <button @click="cek">cek</button>
        <div id="chart">
          <apexchart type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
        </div>
      </ClientOnly>
  </div>
</template>

<script>
import { computed, ref, useAsync, useContext } from '@nuxtjs/composition-api'
import Loading from '@/components/Loading.vue'

export default {
  name: 'CovidColumn',
  components: {
  },
  props: {
    ProvData: {
      required: true,
    }
  },
  setup(props, {emit}){
    const { app, store } = useContext()

    const PositifL = computed(() => props.ProvData?.kasus?.jenis_kelamin?.list_data[0].doc_count)

    const series=[
      {
        name: 'Laki',
        data: [44, 55, 57]
      }, {
        name: 'Perempuan',
        data: [76, 85, 101]
      }
    ]
    const chartOptions = {
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded'
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: ['Kasus', 'Sembuh', 'Meninggal'],
      },
      yaxis: {
        title: {
          text: '$ (thousands)'
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "$ " + val + " thousands"
          }
        }
      }
    }
    
    
    return {
      series,
      chartOptions,
      cek
    }
    async function cek(){
      console.log('props.ProvData', props.ProvData)
      console.log('PositifL.value', PositifL.value)
      console.log(typeof props.ProvData)
    }

  }
}
</script>

<style lang="postcss" scoped>
.switch {
  @apply px-4 py-2 text-center m-auto focus:outline-none rounded-xl;
}
.isTen {
  background: rgb(168, 8, 142) ;
  color: white;
}
.isAll {
  background: rgb(90, 90, 255) ;
  color: white;
}
.recoveredActive, .positifActive, .deathActive, .treatedActive {
  background: rgb(90, 90, 255) ;
  color: white;
}
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
