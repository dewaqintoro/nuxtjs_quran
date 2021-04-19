<template>
  <div class="main font-arabic" :style="{ background: theme.background, color: theme.color }">
    <Navbar :theme="theme" />
    <!-- <button @click="cek()">cek</button> -->
    <div v-if="!loading" class="mt-8">
      <Headerquran :surah="surah" />
      <div class="item"  v-for="(surat, index) in surah.text" :key="surat.index">
        <Cardcomp
        :index="index"
        :surat="surat"
        :surah="surah"
        :arti="surah.translations.id.text[index]"
        />
      </div>
        
    </div>
    <div v-else>
      <Loading />
    </div>
  </div>
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
    const surah = ref({})
    const theme = app.$cookies.get('theme')
    const loading = ref(true)

    getSurah()

    return {
      surah,
      theme,
      loading,
      cek,
    }

    async function getSurah(){
      setTimeout(async function () {
        const resp = await import(`~/data/surah/${idParams}.json`)
        surah.value = resp[idParams]
        loading.value = false
      }, 1000);
    }

    async function cek(){
      console.log(surah.value);
      console.log('theme', theme);
    }

    
  }
}
</script>

<style lang="postcss" scoped>
.main {
  min-height: 100vh;
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
  @apply px-8 mx-36 my-8;
}

@screen mobile {
  .item {
    @apply mx-2 px-2;
  }
}
</style>