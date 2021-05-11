<template>
  <div class="analitik mt-8">
    <p>Jenis Kelamin Positif Covid-19</p>
    <div class="myChart">
      <ClientOnly>
        <!-- <button @click="cek">cek col</button> -->
        <div id="chart">
          <apexchart type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
        </div>
      </ClientOnly>
    </div>
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

    const PositifL = computed(() => props.ProvData?.kasus?.jenis_kelamin?.list_data[0].doc_count || '')
    const PositifP = computed(() => props.ProvData?.kasus?.jenis_kelamin?.list_data[1].doc_count || '')
    const MeninggalL = computed(() => props.ProvData?.meninggal?.jenis_kelamin?.list_data[0].doc_count || '')
    const MeninggalP = computed(() => props.ProvData?.meninggal?.jenis_kelamin?.list_data[1].doc_count || '')
    const SembuhL = computed(() => props.ProvData?.sembuh?.jenis_kelamin?.list_data[0].doc_count || '')
    const SembuhP = computed(() => props.ProvData?.sembuh?.jenis_kelamin?.list_data[1].doc_count || '')

    const series= computed(() => 
      [
        {
          name: 'Laki',
          data: [PositifL.value.toString().substring(0, 4) , SembuhL.value.toString().substring(0, 4), MeninggalL.value.toString().substring(0, 4)]
        }, {
          name: 'Perempuan',
          data: [PositifP.value.toString().substring(0, 4), SembuhP.value.toString().substring(0, 4), MeninggalP.value.toString().substring(0, 4)]
        }
      ]
    )
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
          text: 'Dalam %'
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + "%"
          }
        }
      }
    }
    
    
    return {
      series,
      chartOptions,
      PositifL,
      PositifP,
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
