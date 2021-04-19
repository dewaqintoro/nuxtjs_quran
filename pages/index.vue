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
      <div v-if="!loading">
        <div class="item" v-for="(surah, index) in pageOfItems" :key="index">
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
        </div>
      </div>

      <div v-else>
        <div class="item">
          <div class="card my-8">
            <div class="flex">
              <div class="nameSurahLoading">
                <div class="flex justify-between">
                  <div class="satuA loading"></div>
                  <div class="satuB loading"></div>
                </div>
                <div class="flex justify-between">
                  <div class="duaA"></div>
                  <div class="duaB loading"></div>
                </div>
                <div class="flex justify-between">
                  <div class="tigaA"></div>
                  <div class="tigaB loading"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="card my-8">
              <div class="flex">
                <div class="nameSurahLoading">
                  <div class="flex justify-between">
                    <div class="satuA loading"></div>
                    <div class="satuB loading"></div>
                  </div>
                  <div class="flex justify-between">
                    <div class="duaA"></div>
                    <div class="duaB loading"></div>
                  </div>
                  <div class="flex justify-between">
                    <div class="tigaA"></div>
                    <div class="tigaB loading"></div>
                  </div>
                </div>
              </div>
            </div>

            <div class="card my-8">
              <div class="flex">
                <div class="nameSurahLoading">
                  <div class="flex justify-between">
                    <div class="satuA loading"></div>
                    <div class="satuB loading"></div>
                  </div>
                  <div class="flex justify-between">
                    <div class="duaA"></div>
                    <div class="duaB loading"></div>
                  </div>
                  <div class="flex justify-between">
                    <div class="tigaA"></div>
                    <div class="tigaB loading"></div>
                  </div>
                </div>
              </div>
            </div>

        </div>
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
    const loading = ref(true)
    searchFilter()

    return {
      search,
      allSurah,
      pageOfItems,
      loading,
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


.main {
  background: white;
  width: 400px;
  min-height: 400px;
  border-radius: 10px;
  -webkit-box-shadow: 10px 10px 0px -1px rgba(0,0,0,0.32);
  -moz-box-shadow: 10px 10px 0px -1px rgba(0,0,0,0.32);
  box-shadow: 10px 10px 0px -1px rgba(0,0,0,0.32);
  padding: 30px;
}

.loading {
  @apply my-2;
  background: #c1c1c1;
  min-height: 25px;
  position: relative;
  overflow: hidden;
  border-radius: 30px;
}

.loading::before {
  content: '';
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, transparent, #d7d7d7, transparent);
  transform: translateX(-100%);
  animation: loading 1s infinite;
}

.nameSurahLoading {
  @apply px-4 justify-end items-end w-full;
}

.satuA {
  width: 8%;
}

.satuB {
  width: 90%;
}

.duaA {
  width: 10%;
}

.duaB {
  width: 65%;
}

.tigaA {
  width: 10%;
}

.tigaB {
  width: 50%;
}

@keyframes loading {
  100% {
    transform: translateX(100%);
  }
}

.img {
  min-height: 200px;
}
</style>