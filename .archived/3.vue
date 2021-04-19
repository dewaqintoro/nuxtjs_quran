<template>
  <div>
    <Navbar />
    <button @click="cek()">cek</button>
    <button @click="cekGetFilter()">cekGetFilter</button>
      <input type="text" v-model="asalCity" placeholder="search ..." >
    
    <div class="font-arabic">
      
      <div class="item" v-for="(surah, index) in dew" :key="index">
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
import { computed, ref, useAsync, watchEffect } from '@nuxtjs/composition-api'
import Navbar from '~/components/quran/Navbar.vue'
import { __isNotEmptyString, __normalizeText } from '~/utils/index.ts'

export default {
  name: 'Quran',
  components: {
    Navbar
  },
  setup(){
    const selectedCity = ref('')
    const asalCity = ref('Yunus')
    const allSurah = useAsync(async () => await getAllSurah())
    const filterSurah = useAsync(async () => await getFilter())
    const search = ref('fa')

    const dew = ref(filterSurah)
    // getFilter()
    watchEffect(() => filterSurah)

    return {
      allSurah,
      filterSurah,
      asalCity,
      search,
      cek,
      cekGetFilter,
      dew
    }

    async function getAllSurah(){
      const resp = await import('~/data/surah-info.json')
      return resp.surah_info
    }

    async function cek(){
      console.log('dew', dew.value)
      console.log('filterSurah', filterSurah.value)
    }

    async function cekGetFilter(){
      getFilter()
    }

    async function getFilter1(){
      const ad = allSurah?.value
      const oldSearch = asalCity.value
       
      if(ad !== null ){
          return allSurah?.value.filter((surah) => {
            const result = surah.latin.match(oldSearch)
            // console.log('result', result)
            // dew.value = dew.value,result
            return surah.latin.match(oldSearch)
          })
      }
    }

    async function getFilter(){
        const ad = allSurah?.value
        const oldSearch = asalCity.value

        if(ad !== null ){
        return allSurah?.value.filter((item) => {
            const predicateTranslation = __normalizeText(item.translation).includes(
            __normalizeText(oldSearch)
            )
            const predicateLatin = __normalizeText(item.latin).includes(
            __normalizeText(oldSearch)
            )

            // console.log('predicateLatin', predicateLatin)
            // console.log('predicateTranslation', predicateTranslation)
            // console.log('dew', dew)
            // console.log(dew)

            // dew.value = predicateLatin || predicateTranslation

            return predicateLatin || predicateTranslation
        })
      }
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