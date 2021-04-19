<template>
  <div>
    <Navbar />
    <div v-if="allSurah" class="font-arabic">
      <input type="text" v-model="search" placeholder="search ..." >
      
      <div class="item" v-for="(surah, index) in filterSurah" :key="index">
        <a :href="'/surah/'+surah.index">
          <div class="card">
            <div class="flex">
              <div class="idSurah">{{surah.index}}</div>
              <div class="nameSurah">
                <p>{{surah.arabic}}</p>
                <p class="mt-4">{{surah.latin}}</p>
                <p class="italic text-base">( {{surah.translation}} : {{surah.ayah_count}} ayat )</p>
              </div>
            </div>
          </div>
        </a>
      </div>
        
    </div>
  </div>
</template>
<script>
import { ref, useAsync } from '@nuxtjs/composition-api'
import Navbar from '~/components/quran/Navbar.vue'

export default {
  name: 'Quran',
  components: {
    Navbar
  },
  setup(){
    const selectedCity = ref('')
    const asalCity = ref('')
    const allSurah = useAsync(async () => await getAllSurah())
    const filterSurah = useAsync(async () => await getFilter())
    const search = ref('')

    return {
      allSurah,
      filterSurah,
      search,
      cek
    }

    async function getAllSurah(){
      const resp = await import('~/data/surah-info.json')
      return resp.surah_info
    }

    async function cek(){
      console.log(allSurah?.value)
    }

    async function getFilter(){
      // console.log(allSurah?.value)

      return allSurah.value.filter((surah) => {
        console.log(surah)
        // return surah.latin.match(search)
      })
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

/* .logo {
  max-width: 50%;
} */
.item {
  @apply px-8 mx-36 my-8;
}
.card {
  @apply text-3xl p-4 rounded-lg;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.15);
  .idSurah {
    @apply text-center;
    width: 50px;
  }
  .nameSurah {
    @apply px-4 text-right w-full;
  }
}

.card:hover {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.20);
}


@screen mobile {
  .item {
    @apply mx-2 px-2;
  }
}
</style>