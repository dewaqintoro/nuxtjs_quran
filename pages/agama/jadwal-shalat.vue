<template>
<span >
  <Navbar />
  <div v-if="!loadingTheme" class="main text-center" :style="{ background: storeTheme.background, color: storeTheme.color }">
    <SearchComp @search="searchFilter" :fields='dataFields' :data='provJson'/>
    <p>Jadwal Shalat</p>
    <button @click="cek">cek</button>
    <div class="item text-center">
      <p class="sum" :style="{ boxShadow: storeTheme.boxShadow  }">{{jadwalAll.length}} Jadwal</p>
    </div>
    <div class="min-h-screen font-arabic">
      <div v-if="loading">
        <Loading :theme="storeTheme" />
      </div>
      <div v-else>
        <div class="item" v-for="(doa, index) in jadwalAll" :key="index">
          <p>{{doa.tanggal}}</p>
          <!-- <Cardcomp :theme="storeTheme" :doa="doa" :index="index+1" /> -->
        </div>
      </div>
    </div>
  </div>
</span>
</template>

<script>
import { computed, ref, useAsync, useContext } from '@nuxtjs/composition-api'
import Navbar from '~/components/Navbar.vue'
import Loading from '@/components/Loading.vue'
import dataJson from '~/data/jadwal-shalat/semua_kota.json'
import Cardcomp from '~/components/jadwal/jadwalCardComp.vue'
// import SearchComp from '~/components/SearchComp.vue'
import SearchComp from '~/components/SearchNewComp.vue'
import axios from 'axios'

export default {
  name: 'JadwalShalat',
  components: {
    Navbar,
    Loading,
    Cardcomp,
    SearchComp
  },
  setup(_, {emit}){
    const { app, store } = useContext()
    const provJson = dataJson
    const search = ref('')
    const jadwalAll = ref([])
    const provList = ref([])
    const provSelected = ref({})
    const loadingTheme = computed(() => store.state.loadingTheme)
    const loading = ref(true)
    const storeTheme = computed(() => store.state.theme)
    const dataFields= {value: 'lokasi'}
    const bgId = computed(() => {
      if(storeTheme.value?.darktheme){
        return 'darkTheme'
      } else {
        return 'lightTheme'
      }
    })

    if (process.browser){
      window.smoothscroll = () => {
        let currentScroll = document.documentElement.scrollTop || document.body.scrollTop
        if (currentScroll > 0) {
          window.requestAnimationFrame(window.smoothscroll)
          window.scrollTo(0, Math.floor(currentScroll - (currentScroll / 5)))
        }
      }
    }

    setTimeout(function () {
      loading.value = false
    }, 500);

    searchFilter(search.value)

    return {
      search,
      provJson,
      jadwalAll,
      provList,
      dataFields,
      storeTheme,
      loadingTheme,
      loading,
      cek,
      onChangePage,
      searchFilter,
      bgId
    }

    function searchFilter(dataSearch){
      if((dataSearch === null) || (dataSearch === '') ){
        dataSearch = 'all'
        console.log('dataSearch 1', dataSearch)
      } else if(dataSearch !== 'all'){
        const result = provJson.filter(doa =>
          doa.lokasi.toLowerCase().includes(dataSearch.toLowerCase())
        );
        // console.log('result', result)
        if(result.length === 1){
          provSelected.value = result
          getJadwal()
        } else {
          result.map(hasil => {
            if(hasil.lokasi.length === dataSearch.length){
              provSelected.value = result
              getJadwal()
            } else {
              console.log('Pilih data yang spesifik')
            }
          })
        }
      } else {
        console.log('All prov')
        console.log('dataSearch 2', dataSearch)
      }
    }

    async function getJadwal(){
      console.log('getJadwal')
      try {
        const url = `https://api.myquran.com/v1/sholat/jadwal/${provSelected.value[0].id}/2021/05`
        const result = await axios.get(`${url}`);
        console.log('result', result?.data?.data?.jadwal)
        jadwalAll.value = result?.data?.data?.jadwal
      } catch(err){
        console.log(err)
      }
    }

    async function cek(){
      console.log('provSelected.value', provSelected.value)
    }

    function onChangePage(data = any){
      window.smoothscroll()
    }

  }
}
</script>

<style lang="postcss" scoped>
.sum {
  @apply py-2 px-4 rounded-lg;
  max-width: 120px;
}
.main {
  @apply pt-24 min-h-screen;
}
@font-face {
  font-family: "lpmq";
  src: url(/fonts/lpmq.otf) format("opentype");
  font-display: swap;
}
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
.font-arabic{
  font-family: "lpmq", Arial, sans-serif;
  line-height: 2;
}
.item {
  @apply px-8 mx-36 my-4;
}
.card {
  @apply text-3xl p-4 rounded-lg;
}
@screen tablet {
  .main {
    @apply pt-28;
  }
}
@screen mobile {
  .main {
    @apply pt-20;
  }
  .item {
    @apply mx-2 px-2;
  }
}
</style>