<template>
  <div>
    <Navbar :theme="myTheme" />
    <div class="main">
      <div class="section one">
        <div class="batas"></div>
        <div class="container">
          <div class="track-cover">
            <button @click="cek">cek</button>
            <div>
              <img src="https://is3-ssl.mzstatic.com/image/thumb/Music125/v4/aa/02/57/aa025710-a0c6-90e9-4a18-2881efad4855/190296614316.jpg/400x400cc.jpg" />
            </div>
            <div class="ml-4">
              <div>
                <p class="text-2xl font-bold text-black">{{myTrack.title}}</p>
                <p>{{myTrack.subtitle}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="section two">
        b
      </div>
    </div>
  </div>
</template>

<script>
import { ref, useContext, computed } from '@nuxtjs/composition-api'
import Navbar from '~/components/music/NavbarComp'
import axios from 'axios'
import ColorThief from 'colorthief'

export default {
  name: 'MusicId',
  components: {
    Navbar
  },
  setup(props){
    
    const { route, store, app } = useContext()
    const idMusic = ref(route.value.params.id)
    const myTrack = ref([])

    const myTheme = {
      background: '#088b71',
      color: 'white',
      boxShadow:  '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    }

    getMusic()

    return {
      myTheme,
      myTrack,
      cek
    }

    function cek(){
      console.log('myTrack',myTrack.value)
    }

    async function getMusic(){
      try {
        const url = `https://vercel-be-v2.vercel.app/api/v1/music/track/${idMusic.value}`
        const result = await axios.get(url);
        console.log('result', result)
        if(result?.status === 200){
          myTrack.value = result?.data
          // imgTop.value = result?.data?.tracks[0]
          // setTimeout(() => {
          //   isDOne.value = true
          // }, 300)
        }
      } catch (e){
        console.log(e)
      }
    }
  }
}
</script>
<style lang="postcss" scoped>
.main{
  @apply pt-20;
  background: rgb(247, 247, 247);
}
.one{
  background: rgb(87, 241, 120);
}
.one{
  .batas{
    height: 120px;
    background: rgb(247, 247, 247);
  }
}
.two{
  background: rgb(204, 61, 218);
}
.section-top2{
  background: cadetblue;
  height: 270px;
  /* @apply pt-16; */
}
.track-cover{
  margin-top: -70px;
  background: rgb(241, 230, 230);
  @apply flex w-full;
}
.track-cover img{
  min-width: 120px;
  max-width: 200px;
  border-radius: 10px;
  box-shadow: 10px 10px;
  @apply shadow-2xl ;
}
</style>