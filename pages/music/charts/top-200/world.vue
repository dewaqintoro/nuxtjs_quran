<template>
  <div>
    <Navbar :theme="myTheme" />
    <!-- <button @click="cek" class="mt-36 mb-16">cekAsu</button> -->
    <div class="main container">
      <div class="section one">
        <div v-if="isDOne" class="two-top">
         <!-- <img :src="imgTop.images.coverart" /> -->
         <img :src="getMyImg()" />
         <div class="px-8 py-4">
           <p><b>#1</b> Top 200</p>
           <p class="text-xl font-bold">{{imgTop.title}}</p>
           <p>{{imgTop.subtitle}}</p>
         </div>
        </div>
      </div>
      <div class="section">
        <div class="dew">

          <div class="item">
            <div v-for="(item, index) in globalTop200" :key="index">
              
                <Top200Global :item="item" :index="index" @play="play" @pauseAudio="pauseAudio" @playAudio="playAudio" />
              
            </div>
          </div>

        </div>
      </div>
      <div class="section two">
        <div v-if="isDOne" class="two-top">
         <!-- <img :src="imgTop.images.coverart" /> -->
         <img :src="getMyImg()" />
         <div class="px-8 py-4">
           <p><b>#1</b> Top 200</p>
           <p class="text-xl font-bold">{{imgTop.title}}</p>
           <p>{{imgTop.subtitle}}</p>
         </div>
        </div>
        
      </div>
    </div>
    <div class="sikel">
      <div v-if="musicOn" class="sec-audio">
        <div class="this-audio">
          <div>
            <div>
              <p><b>{{myTitle}}</b></p>
              <p>{{mySubTitle}}</p>
            </div>
            <audio :src="myAudio" controls autoplay class="my-audio" id="myAudio"></audio>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, useContext, computed } from '@nuxtjs/composition-api'
import Navbar from '~/components/music/NavbarComp'
import Top200Global from '~/components/music/Top200Global'
import axios from 'axios'

export default {
  name: 'MusicId',
  components: {
    Navbar,
    Top200Global
  },
  setup(props){
    
    const { route, store, app } = useContext()
    const idSurah = ref('')
    const imgTop = ref([])
    const isDOne = ref(false)
    const isPlay = ref(false)
    const musicOn = ref(false)
    const myAudio = ref('')
    const myTitle = ref('')
    const mySubTitle = ref('')
    const myTrack = ref([])


    const globalTop20 = ref([])
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

    // getGlobalTop20()
    getGlobalTop200()

    return {
      myTheme,
      globalTop20,
      globalTop200,
      isDOne,
      isPlay,
      myTrack,
      myAudio,
      mySubTitle,
      myTitle,
      musicOn,
      imgTop,
      cek,
      playAudio,
      pauseAudio,
      play,
      getMyImg
    }
    function cek(){
      console.log('imgTop.value ',imgTop.value )
      // console.log('globalTop200.value ',globalTop200.value[0] )
    }

    function getMyImg(){
      const myImg = globalTop200.value[0].images.coverart || 'https://is3-ssl.mzstatic.com/image/thumb/Music125/v4/aa/02/57/aa025710-a0c6-90e9-4a18-2881efad4855/190296614316.jpg/400x400cc.jpg'

      console.log('myImg', myImg)
      return myImg
    }

    async function getGlobalTop200(){
      try {
        const url = `https://www.nuxt.my.id/api/v1/music/top200/global`
        const result = await axios.get(url);
        // console.log('result', result)
        if(result?.status === 200){
          globalTop200.value = result?.data?.tracks
          imgTop.value = result?.data?.tracks[0]
          setTimeout(() => {
            isDOne.value = true
          }, 300)
          // console.log(result?.data?.tracks[0].images.coverart)
        }
      } catch (e){
        console.log(e)
        // discoveryID_error.value = "Gagal memuat data"
      }
    }

    function playAudio() { 
      var x = document.getElementById("myAudio"); 
      x.play(); 
    } 

    function pauseAudio() { 
      var x = document.getElementById("myAudio"); 
      x.pause(); 
    }

    async function play(item){
      isPlay.value = !isPlay.value
      musicOn.value = true
      myTrack.value = item
      mySubTitle.value = item.subtitle
      myTitle.value = item.title
      myAudio.value = item?.hub?.actions[1]?.uri
      setTimeout(() => {
        playAudio()
      }, 100)
    }
  }
}
</script>
<style lang="postcss" scoped>
.main{
  @apply mt-20 flex p-2;
}
.section{
  @apply w-1/2;
}

.one{
  display: none;
}

.two-top{
  background-color: #616e73;
  color: white;
  min-height: 300px;
  width: 90%;
  border-radius: 20px;
  @apply pt-8;
}

.two-top img{
  max-width: 200px;
  border-radius: 10px;
  @apply justify-items-center flex mx-auto;
}

.sikel {
   position: fixed;
   left: 0;
   bottom: 0;
   width: 100%;
   background-color: #e5e7eb;
   text-align: center;
}
.this-audio{
  @apply justify-items-center mx-auto items-center text-center justify-center flex;
}

.my-audio{
  @apply mb-4;
  width: 80vw;
  /* height: 35px; */
}


@media (max-width: 450px) {
  .main{
    @apply block;
  }
  .section{
    @apply w-full;
  }
  .two{
    display: none;
  }
  .one{
    display: block;
    @apply mb-4;
  }
  .two-top{
    width: 100%;
  }
}
</style>