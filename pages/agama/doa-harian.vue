<template>
<span >
  <Navbar to="/agama" />
  <div v-if="!loadingTheme" class="main text-center" :style="{ background: storeTheme.background, color: storeTheme.color }">
    <SearchComp @search="searchFilter" :fields='dataFields' :data='dataDoa.data'/>
    <div class="item text-center">
      <p class="sum" :style="{ boxShadow: storeTheme.boxShadow  }">{{allData.length}} data</p>
    </div>
    <div class="min-h-screen font-arabic">
      <div v-if="loading">
        <Loading :theme="storeTheme" />
      </div>
      <div v-else>
        <div class="item" v-for="(doa, index) in pageOfItems" :key="index">
          <Cardcomp :theme="storeTheme" :doa="doa" :index="index+1" />
        </div>
      </div>
      <div v-if="pageOfItems.length === 0" class="text-center text-2xl font-bold mt-16">
        --- Data tidak ditemukan ---
      </div>
      <div class="text-center py-3">
        <jw-pagination :items="allData" @changePage="onChangePage"></jw-pagination>
      </div>
        
    </div>
  </div>
</span>
</template>

<script>
import { computed, ref, useAsync, useContext } from '@nuxtjs/composition-api'
import Navbar from '~/components/Navbar.vue'
import Loading from '@/components/Loading.vue'
import dataJson from '~/data/daily-doa.json'
import Cardcomp from '~/components/doa/harianCardComp.vue'
// import SearchComp from '~/components/SearchComp.vue'
import SearchComp from '~/components/SearchNewComp.vue'

export default {
  name: 'DoaHarian',
  components: {
    Navbar,
    Loading,
    Cardcomp,
    SearchComp
  },
  setup(_, {emit}){
    const { app, store } = useContext()
    const dataDoa = dataJson
    const search = ref('')
    const allData = ref([])
    const pageOfItems = ref([])
    const loadingTheme = computed(() => store.state.loadingTheme)
    const loading = ref(true)
    const storeTheme = computed(() => store.state.theme)
    const dataFields= {value: 'title'}
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
    // searchFilter()

    return {
      search,
      allData,
      dataFields,
      storeTheme,
      pageOfItems,
      loadingTheme,
      loading,
      dataDoa,
      cek,
      onChangePage,
      searchFilter,
      bgId
    }

    function searchFilter(data){
      if(data === null ){
        data = ''
      }
      // setTimeout(function () {
        const result = dataDoa.data.filter(doa =>
          doa.title.toLowerCase().includes(data.toLowerCase())
        );
        allData.value = result
        // loading.value = false
      // }, 200);
      
    }

    async function cek(){
      console.log('search.value', search.value)
    }

    function onChangePage(data = any){
      pageOfItems.value = data
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