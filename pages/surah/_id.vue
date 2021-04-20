<template>
  <div v-if="!loadingTheme" class="main font-arabic" :style="{ background: storeTheme.background, color: storeTheme.color }">
    <Navbar :theme="storeTheme" @changetheme="changetheme" @changesub="changesub" @changeaudio="changeaudio" />
    <!-- <button @click="cek()">cek</button> -->
    <div v-if="!loading" class="content">
      <Headerquran :surah="surah" />
      <div class="text-center flex justify-center">
      </div>
      <div class="item"  v-for="(surat, index) in surah.text" :key="surat.index">
        <Cardcomp
        :theme="storeTheme"
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
    const thisTheme = app.$cookies.get('theme')
    const thisSub = app.$cookies.get('sub')
    const thisAudio = app.$cookies.get('audio')
    const loading = ref(true)
    const loadingTheme = computed(() => store.state.loadingTheme)
    const storeTheme = computed(() => store.state.theme)
    const initTheme = computed(() => store.state.initTheme)


    if(!thisSub){
      store.dispatch('setSub', 'On')
    } else {
      store.dispatch('getSub')
    }
    if(!thisAudio){
      store.dispatch('setAudio', 'On')
    } else {
      store.dispatch('getAudio')
    }
    if(thisTheme){
      store.dispatch('getTheme')
    } else {
      store.dispatch('setTheme', initTheme.value)
    }
    getSurah()
    return {
      surah,
      storeTheme,
      loading,
      loadingTheme,
      cek,
      changetheme,
      changesub,
      changeaudio
    }
    async function changesub(){
      store.dispatch('changeSub')
    }
    async function changeaudio(){
      store.dispatch('changeAudio')
    }
    async function cek(){
    }
    function changetheme(){
      store.dispatch('changeTheme')
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
  padding-bottom: 100px;
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
  @apply px-8 mx-36;
}
@screen mobile {
  .item {
    @apply mx-2 px-2;
  }
  .content {
    @apply pt-16;
  }
}
</style>