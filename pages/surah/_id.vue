<template>
  <div v-if="!loadingTheme" class="main font-arabic" :style="{ background: theme.background, color: theme.color }">
    <Navbar :theme="theme" @changetheme="changetheme" @changesub="changesub" :sub="sub"/>
    <button @click="cek()">cek {{sub}}</button>
    <div v-if="!loading" class="content">
      <Headerquran :surah="surah" />
      <div class="text-center flex justify-center">
      </div>
      <div class="item"  v-for="(surat, index) in surah.text" :key="surat.index">
        <Cardcomp
        :theme="theme"
        :index="index"
        :surat="surat"
        :surah="surah"
        :arti="surah.translations.id.text[index]"
        :sub="sub"
        :audio="audio"
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
    const thisTheme = app.$cookies.get('theme')
    const thisSub = app.$cookies.get('sub')
    const theme = ref({})
    const loading = ref(true)
    const loadingTheme = ref(true)
    const sub = ref(false)
    const audio = ref(false)
    const classObject= ref({
      'darktheme': false,
      'icon': 'sun',
      'background': 'white',
      'color': 'black',
    })

    if(!thisSub){
      console.log('tidak ada sub')
      const data = 'On'
      setSub(data)
    } else {
      getSub()
    }

    if(thisTheme){
      getCookie()
    } else {
      setCookie(classObject)
    }

    getSurah()

    return {
      surah,
      theme,
      loading,
      loadingTheme,
      sub,
      thisSub,
      audio,
      cek,
      changetheme,
      changesub
    }

    async function changesub(){
      const data = app.$cookies.get('sub')
      if(data === 'On'){
        setSub('Off')
      } else {
        setSub('On')
      }
    }
    async function cek(){
      console.log('sub', sub);
    }

    function setSub(data){
      app.$cookies.set('sub', data, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7
      })
      getSub()
    }

    function getSub(){
      const data = app.$cookies.get('sub')
      sub.value = data
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
      setTimeout(function () {
          loadingTheme.value = false
      }, 200);
    }

    async function getSurah(){
      setTimeout(async function () {
        const resp = await import(`~/data/surah/${idParams}.json`)
        surah.value = resp[idParams]
        loading.value = false
      }, 1000);
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

.content {
  @apply pt-8;
}

.item {
  @apply px-8 mx-36 my-8;
}

@screen mobile {
  .item {
    @apply mx-2 px-2;
  }
  .content {
    @apply mt-16;
  }
}
</style>