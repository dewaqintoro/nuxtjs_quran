<template>
  <div class="analitik">
    <div class="chart-title">Analitik</div>
    <select v-if="prov" v-model="selected" @change="seleckProv()" name="top" id="top" class="focus:outline-none">
      <option value="NASIONAL">NASIONAL</option>
      <option v-for="(item, index) in prov" :key="index" :value="item">{{item}}</option>
    </select>
    <p>{{selected}}</p>

    <div class="myChart">
      <ClientOnly>
        <div id="chart">
          <apexchart v-if="!isProv" type="area" height="350" :options="chartOptions" :series="series"></apexchart>
        </div>
      </ClientOnly>

    </div>
  </div>
</template>

<script>
import { computed, ref, useAsync, useContext } from '@nuxtjs/composition-api'
import axios from 'axios'
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
    prov: {
      type: Array,
      required: true,
    },
    
  },
  setup(props, {emit}){
    const { app, store } = useContext()
    const loadingChart = ref(true)
    const provPositif = ref([])
    const isProv = ref(false)
    const series= computed(() => 
      [
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
    ) 
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
    const selected = ref('NASIONAL')
    getData()
    
    return {
      isProv,
      series,
      chartOptions,
      selected,
      seleckProv,
      loadingChart,
      cek
    }
    function cek(){
      console.log('props.daysDeath', props.daysDeath)
    }

    async function getData(){
      loadingChart.value = true
      if(selected.value !== 'NASIONAL'){
        isProv.value = true
        setTimeout(function () {
          loadingChart.value = false
        }, 1000);
        // loadingChart.value = false
      }else {
        isProv.value = false
        setTimeout(function () {
          loadingChart.value = false
        }, 1000);
        // loadingChart.value = false
      }
    }
    async function seleckProv(){
      var str = selected.value 
      str = str.replace(/\s+/g, '_')

      if(selected.value !== 'NASIONAL'){
        try {
          const url = `https://ngodingbentar-be.herokuapp.com/api/v1/covid/prov/${str}`
          const result = await axios.get(url);
          const listPerkembangan = result.data?.result?.list_perkembangan
          provPositif.value = listPerkembangan.map((p) => {
            return p.KASUS
          })
          console.log('provPositif.value', provPositif.value);
        } catch(err){
          console.log(err)
        }

      }else {
        console.log('e')
      }
      getData()
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
