<template>
  <div>
    <Navbar />
    <div class="text-center">
      <!-- <input class="border" type="text" v-model="search" @change="searchFilter" placeholder="search ..." > -->
      
      <input class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="search" v-model="search" @change="searchFilter" placeholder="Cari Surah. . .">
      <!-- <button class="btn-search" @click="searchFilter()">Cari</button> -->
      <button @click="searchFilter()" class="btn-search text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
        Cari
      </button>
    </div>
    <div class="font-arabic">
      
      <div class="item" v-for="(surah, index) in pageOfItems" :key="index">
        <!-- <a :href="'/surah/'+surah.index"> -->
        <nuxt-link :to="'/surah/'+surah.index">
        
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

          </nuxt-link>
        <!-- </a> -->
      </div>

      <div class="text-center py-3">
				<jw-pagination :items="allSurah" @changePage="onChangePage"></jw-pagination>
			</div>
        
    </div>
  </div>
</template>

<script>
import { ref, useAsync } from '@nuxtjs/composition-api'
import Navbar from '~/components/quran/Navbar.vue'
import json from '~/data/surah-info.json'

export default {
  name: 'Quran',
  components: {
    Navbar
  },
  setup(){
    const data = json
    const search = ref('')
    const allSurah = ref([])
    const pageOfItems = ref([])
    searchFilter()

    return {
      search,
      allSurah,
      pageOfItems,
      cek,
      searchFilter,
      onChangePage
    }

    function onChangePage(data = any){
      pageOfItems.value = data
    }

    async function cek(){
      console.log('pageOfItems.value', pageOfItems.value)
      console.log('allSurah', allSurah)
      // pageOfItems.value
    }

    function searchFilter(){
      const result = data.surah_info.filter(surat =>
        surat.latin.toLowerCase().includes(search.value.toLowerCase())
      );
      allSurah.value = result
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

.btn-search {
  background-color: #4497eb;
}
.btn-search:hover {
  background-color: #2187ec;
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
    @apply mx-2 px-2;
  }
}
</style>