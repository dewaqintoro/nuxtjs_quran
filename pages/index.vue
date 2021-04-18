<template>
  <span>
    <button @click="cek()">cek</button>
    <hr/>
    <div v-if="allSurah" class="font-arabic">
      
      <div class="item"  v-for="(x, index) in allSurah" :key="index">
        <a :href="'/surah/'+x.index">
          <div class="card">
            <div class="flex">
              <div class="idSurah">{{x.index}}</div>
              <div class="nameSurah">
                <p>{{x.arabic}}</p>
                <p class="mt-4">{{x.latin}}</p>
                <p class="italic text-base">( {{x.translation}} : {{x.ayah_count}} ayat )</p>
              </div>
            </div>
          </div>
        </a>
      </div>
        
    </div>
  </span>
</template>
<script>
import { ref, useAsync } from '@nuxtjs/composition-api'
export default {
  name: 'Quran',
  setup(){
    const selectedCity = ref('')
    const asalCity = ref('')
    const surah = useAsync(async () => await getSurah())
    const allSurah = useAsync(async () => await getAllSurah())

    return {
      surah,
      allSurah,
      cek
    }

    async function getSurah(){
      const resp = await import('~/data/surah/1.json')
      return resp[1]
    }

    async function getAllSurah(){
      const resp = await import('~/data/surah-info.json')
      // console.log(resp)
      return resp.surah_info
    }

    async function cek(){
      console.log(allSurah?.value)
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
    @apply mx-4;
  }
}
</style>