<template>
  <div class="main text-white" :style="{ background: classObject.background, color: classObject.color }">
    <Navbar :classObject="classObject" />
    <div>
      
      <div class="text">
        <div>Dark Theme</div>
        Off
        <label class="switch">
          <input type="checkbox" @change="update($event)" />
          <span class="slider round"></span>
        </label>
        On
      </div>
    </div>
    <button @click="cek()">cek</button>
    <div class="text-center">
      <input class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="search" v-model="search" @change="searchFilter" placeholder="Cari Surah. . .">
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
        <Loading />
      </div>

      <div class="text-center py-3">
				<jw-pagination :items="allSurah" @changePage="onChangePage"></jw-pagination>
			</div>
        
    </div>
  </div>
</template>

<script>
import { ref, useAsync, useContext } from '@nuxtjs/composition-api'
import Navbar from '~/components/quran/Navbar.vue'
import Loading from '~/components/quran/Loading.vue'
import json from '~/data/surah-info.json'

export default {
  name: 'Quran',
  components: {
    Navbar,
    Loading
  },
  setup(){
    const { app, store } = useContext()
    const data = json
    const search = ref('')
    const allSurah = ref([])
    const pageOfItems = ref([])
    const loading = ref(true)
    const bgcolor = ref('#1d2d50')
    const textcolor = ref('white')
    const langganan = ref('Bulan')

    const classObject= ref({
      'background': 'white',
      'color': 'black',
    })

    searchFilter()

    return {
      search,
      allSurah,
      pageOfItems,
      loading,
      bgcolor,
      textcolor,
      classObject,
      cek,
      searchFilter,
      onChangePage,
      update
    }

    function update(e) {
      if (e.srcElement.checked === true) {
        // bgcolor.value = 'bg-darkone'
        classObject.value.background = '#1d2d50'
        classObject.value.color = 'white'
      } else {
        classObject.value.background = 'white'
        classObject.value.color = 'black'
      }
    }

    function onChangePage(data = any){
      pageOfItems.value = data
    }

    async function cek(){
      // console.log('pageOfItems.value', pageOfItems.value)
      console.log('store', store.state.theme)
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

/* switch */
.text {
  @apply w-full my-4;
  /* font-family: Poppins; */
  font-style: normal;
  font-weight: normal;
  text-align: center;
  font-feature-settings: 'liga' off;
  font-size: 16px;
  line-height: 32px;
  /* color: #374151; */
}
.circle-green {
  position: relative;
  width: 406px;
  height: 406px;
  border-radius: 50%;
  top: -37px;
  left: 80%;
  background: #00db65;
  opacity: 0.6;
}
.switch {
  @apply mx-2;
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider::before {
  position: absolute;
  content: '';
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}
.round {
  border-radius: 34px;
}
.round::before {
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #1f2937;
}

input:focus + .slider {
  box-shadow: 0 0 1px #1f2937;
}

input:checked + .slider::before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

.dark {
  background-color: #1d2d50;
  color: white;
}

.light {
  background-color: white;
  color: black;
}


@screen mobile {
  .item {
    @apply mx-2 px-2;
  }
  .surat {
    @apply text-2xl;
  }
}


</style>