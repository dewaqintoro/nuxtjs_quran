<template>
  <div>
    <Navbar :theme="myTheme" />
    <button @click="cek" class="mt-36">cek</button>
    <p>top-200 world d</p>
    <div>
      <TopGlobal :globalTop200="globalTop200" @play="play" @pauseAudio="pauseAudio" @playAudio="playAudio"/>
    </div>
  </div>
</template>

<script>
import { ref, useContext, computed } from '@nuxtjs/composition-api'
import Navbar from '~/components/music/NavbarComp'
import TopGlobal from '~/components/music/Top200Global'
import axios from 'axios'

export default {
  name: 'MusicId',
  components: {
    Navbar,
    TopGlobal
  },
  setup(props){
    
    const { route, store, app } = useContext()
    const idSurah = ref('')
    const idAyat = ref('')

    const globalTop200 = ref([])

    const myTheme = {
      background: '#088b71',
      color: 'white',
      boxShadow:  '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    }

    const bgId = computed(() => {
      if(props.theme?.darktheme){
        return 'darkTheme'
      } else {
        return 'lightTheme'
      }
    })

    getGlobalTop200()

    return {
      myTheme,
      globalTop200,
      cek,
      playAudio,
      pauseAudio,
      play
    }
    function cek(){
      // console.log('audioStore',audioStore)
    }

    async function getGlobalTop200(){
      try {
        const url = `https://www.nuxt.my.id/api/v1/music/top200/global`
        const result = await axios.get(url);
        // console.log('result', result)
        if(result?.status === 200){
          globalTop200.value = result?.data?.tracks
        }
      } catch (e){
        console.log(e)
        // discoveryID_error.value = "Gagal memuat data"
      }
    }

    function playAudio() { 
      // var x = document.getElementById("myAudio"); 
      // x.play(); 
    } 

    function pauseAudio() { 
      // var x = document.getElementById("myAudio"); 
      // x.pause(); 
    }

    function play() { 
      // var x = document.getElementById("myAudio"); 
      // x.pause(); 
    }
  }
}
</script>
<style lang="postcss" scoped>
.darkTheme:hover{
  background: rgb(61, 81, 94) !important;
}
.lightTheme:hover{
  background: #f1f1f1 !important;
}

.card {
  @apply px-4 pb-4 pt-4 rounded-lg my-8;
  /* box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.15); */
  .idSurah {
    @apply items-center justify-center flex font-bold rounded-full;
    width: 40px;
    height: 40px;
  }
  .nameSurah {
    @apply px-4 w-full;
  }
}
.card:hover {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.20);
}
.surat {
  @apply text-right text-3xl mt-2;
  line-height: 4rem !important;
}
.my-audio{
  @apply mt-4;
  max-width: 100%;
  height: 35px;
}
@screen mobile {
  .surat {
    @apply text-2xl;
  }
  .idSurah {
    @apply text-sm;
    width: 30px;
    height: 30px;
  }
  .my-audio{
    max-width: 80%;
    height: 35px;
  }
}
</style>