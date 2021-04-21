<template>
<!-- <span></span> -->
<span >
  <Navbar />
  <div v-if="!loadingTheme" class="main" :style="{ background: storeTheme.background, color: storeTheme.color }">
    <div class="font-arabic">
      <button @click="cek()" class="mt-20">cek</button>
        <div class="item" v-for="(doa, index) in pageOfItems" :key="index">
          <Cardcomp :theme="storeTheme" :doa="doa" />
        </div>
      <!-- <div v-if="loading">
        <Loading :theme="storeTheme" />
      </div>
      <div v-else>
      </div> -->
        
    </div>
    <div class="text-center py-3">
      <jw-pagination :items="dataDoa.data" @changePage="onChangePage"></jw-pagination>
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
    const pageOfItems = ref([])
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

    return {
      storeTheme,
      pageOfItems,
      loadingTheme,
      dataDoa,
      cek,
      onChangePage
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
</style>