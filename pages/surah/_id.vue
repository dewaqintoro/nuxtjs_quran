<template>
  <span>
    <Navbar />
    <div v-if="!loadingTheme" class="main font-arabic" :style="{ background: storeTheme.background, color: storeTheme.color }">
      <div v-if="loading">
        <Loading :theme="storeTheme" />
      </div>
      <div v-else class="content">

        <div class="back">
          <div class="btn-back" :style="{ boxShadow: storeTheme.boxShadow }">
            <nuxt-link to="/surah">
              <font-awesome-icon :icon="['fas', 'arrow-left']" />
            </nuxt-link>
          </div>
        </div>

        <Headerquran :surah="surah" :theme="storeTheme"/>
      <button @click="cek()">cek</button>

        <div class="text-center flex justify-center">
        </div>
        <div class="item" v-for="(surat, index) in pageOfItems" :key="surat.index">
          <Cardcomp
          :theme="storeTheme"
          :index="index"
          :surat="surat"
          :surah="surah"
          
          />
          <!-- :arti="surah.translations.id.text[index]" -->
        </div>
      </div>

      <div class="text-center py-3">
				<jw-pagination :items="newSurah" @changePage="onChangePage"></jw-pagination>
			</div>
      
    </div>
  </span>
</template>
<script>
import { ref, useAsync, useContext, computed } from '@nuxtjs/composition-api'
import Headerquran from '~/components/quran/Headerquran.vue'
import Cardcomp from '~/components/quran/Cardcomp.vue'
import Navbar from '~/components/quran/Navbar.vue'
import Loading from '~/components/quran/Loading.vue'
export default {
  name: 'Surah',
  components: {
    Headerquran,
    Navbar,
    Cardcomp,
    Loading
  },
  setup(){
    
    const { route, store, app } = useContext()
    const idParams = route.value?.params?.id
    getSurah()
    const surah = ref({})
    const loading = ref(true)
    const loadingTheme = computed(() => store.state.loadingTheme)
    const storeTheme = computed(() => store.state.theme)
    const newSurah = ref([])
    const pageOfItems = ref([])

    return {
      surah,
      newSurah,
      pageOfItems,
      storeTheme,
      loading,
      loadingTheme,
      cek,
      onChangePage
    }
    function onChangePage(data = any){
      pageOfItems.value = data
    }
    async function cek(){
      var obj2 = surah.value?.text
      var result2 = Object.entries(obj2);
      newSurah.value = result2
      setTimeout(async function () {  
        loading.value = false
      }, 500);
    }

    async function getSurah(){
      const resp = await import(`~/data/surah/${idParams}.json`)
      surah.value = resp[idParams]
      cek()
    }
  }
}
</script>
<style lang="postcss" scoped>
.back {
  @apply ml-32 pb-8;
  font-size:22px;
}
.btn-back {
  @apply items-center text-center justify-center rounded-full;
  width: 40px;
  height: 40px;
}
.main {
  min-height: 100vh;
  padding-bottom: 100px;
  padding-top: 20px;
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
  @apply px-8 mx-36;
}
@screen tablet {
  .content {
    @apply pt-20;
  }
}
@screen mobile {
  .item {
    @apply mx-2 px-2 pt-2;
  }
  .content {
    @apply pt-16;
  }
  .back {
    @apply ml-4;
  }
}
</style>