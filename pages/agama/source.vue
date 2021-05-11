<template >
  <span>
    <Navbar />
    <div class="main" v-if="!loadingTheme" :style="{ background: storeTheme.background, color: storeTheme.color, boxShadow: storeTheme.boxShadow }">
    <div class="p-4">
      <div class="box p-4" :style="{ boxShadow: storeTheme.boxShadow }">
        <div class="text-2xl font-bold">Credit</div>
        <p class="my-4">
          <a href="https://quran.kemenag.go.id" target="_blank">https://quran.kemenag.go.id</a>
        </p>
        <p class="my-4">
          <a href="https://github.com/rioastamal/quran-json" target="_blank">https://github.com/rioastamal/quran-json</a>
        </p>
        <p class="my-4">
          <a href="https://islam.nu.or.id/post/read/107344/susunan-bacaan-tahlil-doa-arwah-lengkap-dan-terjemahannya" target="_blank">https://islam.nu.or.id/post/read/107344/</a>
        </p>
        <p class="my-4">
          <a href="https://islam.nu.or.id/post/read/79315/susunan-bacaan-wirid-sesudah-shalat-lima-waktu" target="_blank">https://islam.nu.or.id/post/read/79315/</a>
        </p>
        <p class="my-4">
          <a href="https://fathimah.docs.apiary.io/#" target="_blank">https://fathimah.docs.apiary.io/#</a>
        </p>
        <p class="my-4">
          <a href="https://jagad.id/99-asmaul-husna-latin-arab-dan-terjemahan-indonesia-inggris/" target="_blank">https://jagad.id/</a>
        </p>
        <p class="my-4">
          <a href="https://www.doaharianislami.com/2017/06/kumpulan-doa-sehari-hari-lengkap-dalam-bahasa-arab-latin-dan-artinya.html" target="_blank">https://www.doaharianislami.com/</a>
        </p>
        
        
      </div>
    </div>
    </div>
  </span>
</template>


<script>
import { computed, ref, useAsync, useContext } from '@nuxtjs/composition-api'
import Navbar from '~/components/Navbar.vue'
import Loading from '@/components/Loading.vue'
import dataJson from '~/data/asmaul-husna.json'
import Cardcomp from '~/components/wirid/WiridComp'
import SearchComp from '~/components/SearchNewComp.vue'

export default {
  name: 'Source',
  components: {
    Navbar,
    Loading,
    Cardcomp,
    SearchComp
  },
  setup(_, {emit}){
    const { app, store } = useContext()
    const dataDoa = dataJson.data
    const allData = ref([])
    const loadingTheme = computed(() => store.state.loadingTheme)
    const loading = ref(true)
    const storeTheme = computed(() => store.state.theme)
    const search = ref('')
    const dataFields= {value: 'latin'}
    const bgId = computed(() => {
      if(storeTheme.value?.darktheme){
        return 'darkTheme'
      } else {
        return 'lightTheme'
      }
    })

    // setLoading()
    searchFilter(search.value)

    return {
      storeTheme,
      allData,
      bgId,
      search,
      dataFields,
      loadingTheme,
      loading,
      dataDoa,
      cek,
      searchFilter
    }

    function searchFilter(dataSearch){
      if(dataSearch === null ){
        dataSearch = ''
      }
      setTimeout(function () {
        const result = dataDoa.filter(doa =>
          doa.latin.toLowerCase().includes(dataSearch.toLowerCase())
        );
        allData.value = result
        loading.value = false
      }, 200);
      
    }

    async function cek(search){
      console.log('dew', search)
    }

  }
}
</script>

<style lang="postcss" scoped>
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

.darkTheme{
  /* color: rgb(61, 81, 94); */
  .box:hover{
    background: rgb(61, 81, 94);
  }
}
.lightTheme{
  .box:hover {
    background: #f1f1f1;
  }
}

.main {
  @apply pt-16 min-h-screen pb-8 mt-8 px-16;
  justify-content: center;
  align-self: center;
}

.item {
  @apply px-2;
}

.garis {
  border-top-width: 2px;
  padding-bottom: 10px;
}
.arti {
  position: relative;
}
.content {
  max-width: 80%;
}

.box {
  @apply rounded-2xl;
  place-items: center;
  text-align: center;
}

.footer {
  height: 70px;
}

@screen tablet {
.container {
    grid-template-columns: repeat(auto-fill, minmax(30%, 1fr));
  }
}
@screen mobile {
  .main {
    @apply pt-10 px-2;
  }
  .container {
    grid-template-columns: repeat(auto-fill, minmax(40%, 1fr));
  }
}

@media only screen and (max-width: 420px) {
  .container {
    grid-template-columns: repeat(auto-fill, minmax(80%, 1fr));
  }
}
</style>