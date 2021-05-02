<template>
<span >
  <Navbar />
  <div v-if="!loadingTheme" class="main text-center" :style="{ background: storeTheme.background, color: storeTheme.color }">
    <SearchComp @search="searchFilter" :fields='dataFields' :data='dataDoa.data'/>
    <div class="font-arabic">
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
import dataJson from '~/data/tahlil.json'
import Cardcomp from '~/components/doa/harianCardComp.vue'
import SearchComp from '~/components/SearchNewComp.vue'

export default {
  name: 'Quran',
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
    const dataFields= {value: 'title'}
    const allData = ref([])
    const pageOfItems = ref([])
    const loadingTheme = computed(() => store.state.loadingTheme)
    const loading = ref(true)
    const storeTheme = computed(() => store.state.theme)
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

    searchFilter(search.value)

    return {
      dataFields,
      search,
      allData,
      storeTheme,
      pageOfItems,
      loadingTheme,
      loading,
      dataDoa,
      cek,
      onChangePage,
      searchFilter
    }

    function searchFilter(dataSearch){
      if(dataSearch === null ){
        dataSearch = ''
      }
      setTimeout(function () {
        const result = dataDoa.data.filter(doa =>
          doa.title.toLowerCase().includes(dataSearch.toLowerCase())
        );
        allData.value = result
        loading.value = false
      }, 200);
      
    }

    async function cek(search){
      console.log('dew', search)
    }

    function onChangePage(data = any){
      pageOfItems.value = data
      window.smoothscroll()
    }

  }
}
</script>

<style lang="postcss" scoped>
.darkTheme{
  /* color: rgb(61, 81, 94); */
  .card:hover{
    background: rgb(61, 81, 94);
  }
}
.lightTheme{
  .card:hover {
    background: #f1f1f1;
  }
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