<template>
<!-- <span></span> -->
<span >
  <Navbar />
  <div v-if="!loadingTheme" class="main" :style="{ background: storeTheme.background, color: storeTheme.color }">
    <div class="search text-center">
      <input class="input-search focus:outline-none" :style="{ boxShadow: storeTheme.boxShadow }" id="username" type="search" v-model="search" @change="searchFilter" placeholder="Cari Surah. . .">

      <button @click="searchFilter()" class="btn-search focus:outline-none" :style="{ boxShadow: storeTheme.boxShadow }" type="button">
        Cari
      </button>
    </div>
    <div class="font-arabic">
      <div v-if="loading">
        <Loading :theme="storeTheme" />
      </div>
      <div v-else>
        <div class="item" :class="bgId" v-for="(surah, index) in pageOfItems" :key="index">
          <nuxt-link :to="'/surah/'+surah.index">
            <div class="card" :style="{ boxShadow: storeTheme.boxShadow }">
              <div class="">
                <div class="idSurah" :style="{ boxShadow: storeTheme.boxShadow  }">{{surah.index}}</div>
                <div class="nameSurah">
                  <p>{{surah.arabic}}</p>
                  <p class="mt-4">{{surah.latin}}</p>
                  <p class="italic text-base">( {{surah.translation}} : {{surah.ayah_count}} ayat )</p>
                </div>
              </div>
            </div>
          </nuxt-link>
        </div>
      </div>

      <div class="text-center py-3">
				<jw-pagination :items="allSurah" @changePage="onChangePage"></jw-pagination>
			</div>
        
    </div>
  </div>
</span>
</template>

<script>
import { computed, ref, useAsync, useContext } from '@nuxtjs/composition-api'
import Navbar from '~/components/Navbar.vue'
import Loading from '@/components/Loading.vue'
import json from '~/data/surah-info.json'
import SearchComp from '~/components/SearchComp.vue'


export default {
  name: 'Quran',
  components: {
    Navbar,
    Loading,
    SearchComp
  },
  setup(_, {emit}){
    const { app, store } = useContext()
    const data = json
    const search = ref('')
    const allSurah = ref([])
    const pageOfItems = ref([])
    const loading = ref(true)
    const loadingTheme = computed(() => store.state.loadingTheme)
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
      allSurah,
      bgId,
      pageOfItems,
      loading,
      cek,
      searchFilter,
      onChangePage,
      loadingTheme,
      storeTheme
    }
    async function cek(){
    }

    function onChangePage(data = any){
      pageOfItems.value = data
      window.smoothscroll()
    }
    function searchFilter(){
      setTimeout(function () {
          const result = data.surah_info.filter(surat =>
            surat.latin.toLowerCase().includes(search.value.toLowerCase())
          );
          allSurah.value = result
          loading.value = false
      }, 1000);
      
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
  @apply pt-8 min-h-screen;
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
  @apply appearance-none border rounded-lg py-2 px-8 text-gray-700 leading-tight;
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
  @apply px-8 mx-36 my-8;
}
.card {
  @apply text-3xl p-4 rounded-lg;
  /* box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.15); */
  .idSurah {
    @apply text-center text-lg items-center justify-center flex font-bold rounded-full;
    width: 40px;
    height: 40px;
  }
  .nameSurah {
    @apply px-4 text-right w-full;
  }
  
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
  .surat {
    @apply text-2xl;
  }
  .idSurah {
    @apply text-sm;
    width: 30px;
    height: 30px;
  }
  .input-search {
    @apply my-2;
  }
  .btn-search {
    @apply my-2;
  }
  .input-search {
    @apply px-4;
  }
}
</style>