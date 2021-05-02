<template>
  <div class="analitik">
    <div class="chart-title">Perkembangan Kasus Terkonfirmasi Positif Covid-19 Per-Hari</div>
    <p>{{selected}}</p>
    <!-- <button @click="cek">cek</button> -->
    <select v-if="prov" v-model="selected" @change="seleckProv()" name="top" id="top" class="focus:outline-none">
      <option value="NASIONAL">NASIONAL</option>
      <option v-for="(item, index) in prov" :key="index" :value="item">{{item}}</option>
    </select>

    <div class="myChart">
      <ClientOnly>
        <div v-if="!loadingChart" id="chart">
          <p class="font-normal text-sm " v-if="dataProv && (selected !== 'NASIONAL')">Jumlah kasus : <b>{{dataProv.kasus_total}}</b>, Sembuh : <b>{{dataProv.sembuh_dengan_tgl}}</b>, Meninggal <b>{{dataProv.meninggal_dengan_tgl}}</b></p>
          <apexchart v-if="isProv" type="area" height="350" :options="chartOptionsProv" :series="seriesProv"></apexchart>
          <apexchart v-else type="area" height="350" :options="chartOptions" :series="series"></apexchart>
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
    const provSembuh = ref([])
    const provMeninggal = ref([])
    const dataProv = ref([])
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

    const seriesProv = computed(() => 
      [
        {
          name: "Positif",
          data: provPositif.value
        },
        {
          name: "Sembuh",
          data: provSembuh.value
        },
        {
          name: "Meninggal",
          data: provMeninggal.value
        }
      ]
    ) 
    const chartOptionsProv = {
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
    seleckProv()
    
    return {
      dataProv,
      isProv,
      series,
      seriesProv,
      chartOptions,
      chartOptionsProv,
      selected,
      seleckProv,
      loadingChart,
      cek
    }
    function cek(){
      console.log('dataProv.value', dataProv.value.kasus_total)
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
      loadingChart.value = true
      var str = selected.value 
      str = str.replace(/\s+/g, '_')
      console.log('seleckProv');

      if(selected.value !== 'NASIONAL'){
        console.log('Bukan Nasional');
        isProv.value = true
        try {
          const url = `https://ngodingbentar-be.herokuapp.com/api/v1/covid/prov/${str}`
          const result = await axios.get(url);
          console.log('result', result);
          const listPerkembangan = result.data?.result?.list_perkembangan
          dataProv.value = result.data.result

          provPositif.value = listPerkembangan.map((p) => {
            return p.KASUS
          })

          provSembuh.value = listPerkembangan.map((p) => {
            return p.SEMBUH
          })

          provMeninggal.value = listPerkembangan.map((p) => {
            return p.MENINGGAL
          })
          loadingChart.value = false
        } catch(err){
          console.log(err)
        }

      }else {
        isProv.value = false
        loadingChart.value = false
        console.log('e')
      }
      // getData()
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
