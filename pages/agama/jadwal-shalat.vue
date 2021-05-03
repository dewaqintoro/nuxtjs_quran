<template>
<span >
  <Navbar />
  <div v-if="!loadingTheme" class="main text-center" :style="{ background: storeTheme.background, color: storeTheme.color }">
    <SearchComp @search="searchFilter" :fields='dataFields' :data='provJson'/>
    <p>Jadwal Shalat</p>
    <!-- <div class="item text-center">
      <p class="sum" :style="{ boxShadow: storeTheme.boxShadow  }">{{jadwalAll.length}} data</p>
    </div>
    <div class="min-h-screen font-arabic">
      <div v-if="loading">
        <Loading :theme="storeTheme" />
      </div>
      <div v-else>
        <div class="item" v-for="(doa, index) in jadwalAll" :key="index">
          <Cardcomp :theme="storeTheme" :doa="doa" :index="index+1" />
        </div>
      </div>
    </div> -->
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
      if(dataSearch === null ){
        dataSearch = ''
      }
      console.log('dataSearch', dataSearch)
    }

    async function cek(){
      console.log('search.value', search.value)
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
  width: 100px;
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