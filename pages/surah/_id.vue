<template>
  <div class="font-arabic">
    <button @click="cek()">cek</button>
    <nuxt-link to="/">
        Home
      </nuxt-link>
    <hr/>
    <div v-if="surah" class="mt-8">
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
  </div>
</template>
<script>
import { ref, useAsync, useContext } from '@nuxtjs/composition-api'
import Headerquran from '~/components/quran/Headerquran.vue'
import Cardcomp from '~/components/quran/Cardcomp.vue'

export default {
  name: 'Surah',
  components: {
    Headerquran,
    Cardcomp
  },
  setup(){
    const { route } = useContext()
    const idParams = route.value?.params?.id
    const surah = useAsync(async () => await getSurah())

    const iniSurat = surah.value?.text
    const arti = surah.value?.translations?.id?.text

    return {
      surah,
      cek,
    }

    async function getSurah(){
      const resp = await import(`~/data/surah/${idParams}.json`)
      return resp[idParams]
    }

    async function cek(){
      console.log(iniSurat);
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

.item {
  @apply px-8 mx-36 my-8;
}
/* .card {
  @apply p-4 rounded-lg my-8;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.15);
  .idSurah {
    @apply text-center;
    width: 50px;
  }
  .nameSurah {
    @apply px-4 w-full;
  }
}

.card:hover {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.20);
} */

@screen mobile {
  .item {
    @apply mx-4;
  }
}
</style>