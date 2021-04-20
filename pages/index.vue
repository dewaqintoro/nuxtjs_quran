<template>
<span v-if="!loadingTheme">
  <Navbar :theme="theme" @changetheme="changetheme" @changesub="changesub" @changeaudio="changeaudio" :audio="audio"/>
  <div class="main" :style="{ background: theme.background, color: theme.color }">
    <button @click="cek()">cek {{subStore}}</button>
    <button @click="duh()">getSub</button>
    <button @click="sett()">setSub</button>
    <div class="text-center">
      <input class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="search" v-model="search" @change="searchFilter" placeholder="Cari Surah. . .">
      <button @click="searchFilter()" class="btn-search text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
        Cari
      </button>
    </div>
    <div class="font-arabic">
      <div v-if="loading">
        <Loading />
      </div>
      <div v-else>
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

      <div class="text-center py-3">
				<jw-pagination :items="allSurah" @changePage="onChangePage"></jw-pagination>
			</div>
        
    </div>
  </div>
</span>
</template>

<script>
import { computed, ref, useAsync, useContext } from '@nuxtjs/composition-api'
import Navbar from '~/components/quran/Navbar.vue'
import Loading from '~/components/quran/Loading.vue'
import json from '~/data/surah-info.json'

export default {
  name: 'Quran',
  components: {
    Navbar,
    Loading
  },
  setup(_, {emit}){
    const { app, store } = useContext()
    const data = json
    const search = ref('')
    const allSurah = ref([])
    const pageOfItems = ref([])
    const loading = ref(true)
    const loadingTheme = ref(true)
    const isChecked = ref()
    const iconTheme = ref()
    // const theme = computed(store.state.theme)
    const subStore = computed(() => store.state.sub)
    const thisTheme = app.$cookies.get('theme')
    const thisSub = app.$cookies.get('sub')
    const thisAudio = app.$cookies.get('audio')
    
    const theme = ref({})
    const sub = ref('On')
    const audio = ref('On')

    const classObject= ref({
      'darktheme': false,
      'background': 'white',
      'color': 'black',
    })

    if(!thisSub){
      store.dispatch('setSub', 'On')
    } else {
      store.dispatch('getSub')
    }

    if(!thisAudio){
      setAudio('On')
    } else {
      getAudio()
    }

    if(thisTheme){
      getCookie()
    } else {
      setCookie(classObject)
    }
    
    searchFilter()

    return {
      search,
      allSurah,
      pageOfItems,
      loading,
      isChecked,
      cek,
      theme,
      sub,
      audio,
      searchFilter,
      onChangePage,
      loadingTheme,
      iconTheme,
      changetheme,
      changesub,
      changeaudio,
      subStore,
      duh,
      sett
    }

    async function cek(){
      console.log('subStore', subStore)
    }

    async function duh(){
      store.dispatch('getSub')
    }

    async function sett(){
      store.dispatch('setSub', 'On')
    }

    async function changesub(){
      store.dispatch('changeSub')

      // const data = app.$cookies.get('sub')
      // if(data === 'On'){
      //   setSub('Off')
      // } else {
      //   setSub('On')
      // }
    }

    async function changeaudio(){
      const data = app.$cookies.get('audio')
      if(data === 'On'){
        setAudio('Off')
      } else {
        setAudio('On')
      }
    }

    // function setSub(data){
    //   app.$cookies.set('sub', data, {
    //     path: '/',
    //     maxAge: 60 * 60 * 24 * 7
    //   })
    //   getSub()
    // }

    function setAudio(data){
      app.$cookies.set('audio', data, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7
      })
      getAudio()
    }

    // function getSub(){
    //   const data = app.$cookies.get('sub')
    //   sub.value = data
    // }

    function getAudio(){
      const data = app.$cookies.get('audio')
      audio.value = data
    }

    function changetheme(){
      const data = app.$cookies.get('theme')
      if(data?.darktheme){
        const classObject= ref({
          'darktheme': false,
          'background': 'white',
          'icon': 'sun',
          'color': 'black',
        })
        setCookie(classObject)
      } else {
        const classObject= ref({
          'darktheme': true,
          'background': '#1d2d50',
          'icon': 'moon',
          'color': 'white',
        })
        setCookie(classObject)
      }
    }

    function setCookie(data){
      app.$cookies.set('theme', data.value, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7
      })
      getCookie()
    }

    function getCookie(){
      const data = app.$cookies.get('theme')
      theme.value = data
      isChecked.value = data?.darktheme
      if(data?.darktheme){
        iconTheme.value = 'moon'
      } else {
        iconTheme.value = 'sun'
      }
      setTimeout(function () {
          loadingTheme.value = false
      }, 200);
    }

    function onChangePage(data = any){
      pageOfItems.value = data
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
.main {
  @apply pt-8;
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

.iconTheme {
  width: 30px;
  height: 30px
}


@screen mobile {
  .main {
    @apply pt-16;
  }
  .item {
    @apply mx-2 px-2;
  }
  .surat {
    @apply text-2xl;
  }
}


</style>