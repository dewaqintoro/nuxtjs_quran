<template>
<!-- <span></span> -->
<span >
  <Navbar />
  <div v-if="!loadingTheme" class="main" :style="{ background: storeTheme.background, color: storeTheme.color }">
    <div class="font-arabic">
      <div class="title rounded-lg text-center" :style="{ boxShadow: storeTheme.boxShadow  }">
        <div class="text-3xl font-bold">Do'a Harian</div>
      </div>

      <div class="search flex justify-center text-center">
        <input class="input-search focus:outline-none" :style="{ boxShadow: storeTheme.boxShadow }" id="username" type="search" v-model="search" @change="searchFilter" placeholder="Cari Surah. . .">

        <button @click="searchFilter()" class="btn-search focus:outline-none" :style="{ boxShadow: storeTheme.boxShadow }" type="button">
          Cari
        </button>
      </div>
        
      <div v-if="loading">
        <Loading :theme="storeTheme" />
      </div>
      <div v-else>
        <div class="item" v-for="(doa, index) in pageOfItems" :key="index">
          <Cardcomp :theme="storeTheme" :doa="doa" :index="index+1" />
        </div>
      </div>
        
    </div>
    <div class="text-center py-3">
      <jw-pagination :items="allData" @changePage="onChangePage"></jw-pagination>
    </div>
        
  </div>
</span>
</template>

<script>
import { computed, ref, useAsync, useContext } from '@nuxtjs/composition-api'
import Navbar from '~/components/quran/Navbar.vue'
import Loading from '~/components/quran/Loading.vue'
import dataJson from '~/data/daily-doa.json'
import Cardcomp from '~/components/doa/harianCardComp.vue'

export default {
  name: 'Quran',
  components: {
    Navbar,
    Loading,
    Cardcomp
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

    searchFilter()

    return {
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

    function searchFilter(){
      
      setTimeout(function () {
        const result = dataDoa.data.filter(doa =>
          doa.title.toLowerCase().includes(search.value.toLowerCase())
        );
        allData.value = result
        loading.value = false
      }, 1000);
      
    }

    async function cek(){
      console.log('dataJson', dataJson)
    }

    function onChangePage(data = any){
      pageOfItems.value = data
      window.smoothscroll()
    }

  }
}
</script>
<style lang="postcss" scoped>
.search {
  @apply px-4 my-8;
}
.main {
  @apply pt-4 min-h-screen;
}
.title {
  @apply py-4;
  margin: 0 11rem;
}

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

.input-search {
  @apply appearance-none border rounded-lg px-4 py-4 text-gray-700 leading-tight;
}
.btn-search {
  @apply text-white font-bold py-2 px-4 rounded-lg ml-4;
  /* background-color: #4497eb; */
  background-color: #115394;
}
.btn-search:hover {
  /* background-color: #2187ec; */
  background-color: #1b63ac;

}

.item {
  @apply px-8 mx-36;
}
@screen tablet {
  .content {
    @apply pt-20;
  }
}
@screen mobile {
  .main {
      @apply pt-24;
    }
  .item {
    @apply mx-2 px-2 pt-2;
  }
  .content {
    @apply pt-16;
  }
  .back {
    @apply ml-4;
  }
  .title {
    @apply mx-4;
  }
  .input-search {
    @apply my-2;
    max-width: 220px;
  }
  .btn-search {
    @apply my-2;
  }
}
</style>