<template>
<span>
  <Navbar :theme="myTheme" />
  <div class="main container">
          <!-- <button @click="cek">cek2</button> -->
    <div class="top-global">
      <TopGlobal :globalTop20="globalTop20" @play="play" @pauseAudio="pauseAudio" @playAudio="playAudio"/>
    </div>

    <div class="artis-global">
      <div class="dew">
        <div class="artis-item" v-for="(item, index) in artisGlobal" :key="index">
          <div>
            <div class="flex m-2">
              <div class="number">
                <p>{{index+1}}</p>
              </div>
              <div class="item-title">
                <div class="image-container">
                  <img :src="item.images.background" alt="img" />
                </div>
                <p>{{item.subtitle}}</p>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>

    
  </div>
  <div class="sikel">
    <div v-if="musicOn" class="sec-audio">
      <div class="this-audio">
        <div>
          <div>
            <button @click="playAudio" type="button">Play Audio</button>
              <button @click="pauseAudio" type="button">Pause Audio</button> 
            <p><b>{{myTitle}}</b></p>
            <p>{{mySubTitle}}</p>
          </div>
          <audio :src="myAudio" controls autoplay class="my-audio" id="myAudio"></audio>
        </div>
      </div>
    </div>
  </div>
  
</span>
</template>

<script>
import { computed, ref, useAsync, useContext } from '@nuxtjs/composition-api'
import Navbar from '~/components/music/NavbarComp'
import GlobalComp from '~/components/music/GlobalComp'
import TopGlobal from '~/components/music/TopGlobal'

import axios from 'axios'
export default {
  name: 'Shorten',
  components: {
    Navbar,
    GlobalComp,
    TopGlobal
  },
  setup(){
    const { store, route, app } = useContext()
    const search = ref('')
    const discoveryID = ref([])
    const discoveryID_error = ref('')
    const globalTop20 = ref([])
    const artisGlobal = ref([])
    const myText = ref('wadudu')
    const myTrack = ref([])
    const myAudio = ref('')
    const myTitle = ref('')
    const mySubTitle = ref('')
    const musicOn = ref(false)
    const isPlay = ref(false)
    const isCopied = ref(false)
    const showToast = ref(false)
    const storeTheme = computed(() => store.state.theme)
    const triggerToast = () => {
      showToast.value = true;
      setTimeout(() => showToast.value = false, 3000)
    }
    const myTheme = {
      background: '#088b71',
      color: 'white',
      boxShadow:  '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    }

    // var uniqueArray = [];
    const myuniqueArray = ref([])

    // getDiscoveryID()
    getGlobalTop20()

    return {
      search,
      discoveryID,
      globalTop20,
      artisGlobal,
      myText,
      myTheme,
      isCopied,
      discoveryID_error,
      myTrack,
      myAudio,
      mySubTitle,
      myTitle,
      musicOn,
      isPlay,
      storeTheme,
      cek,
      triggerToast,
      getDiscoveryID,
      getGlobalTop20,
      play,
      playAudio,
      pauseAudio
    }

    async function cek(){
      console.log('artisGlobal', artisGlobal.value)
      console.log('globalTop20', globalTop20.value)
    }

    

    function playAudio() { 
      var x = document.getElementById("myAudio"); 
      x.play(); 
    } 

    function pauseAudio() { 
      var x = document.getElementById("myAudio"); 
      x.pause(); 
    } 

    function getUnique(array){
        var uniqueArray = [];
        var dataDew = [];
        // console.log('array',array)
        
        var i = 0
        for(i; i < array.length; i++){
            if(uniqueArray.indexOf(array[i].subtitle) === -1) {
                uniqueArray.push(array[i].subtitle);
                dataDew.push(array[i]);
            }
        }
        return dataDew;
    }


    function getArtis(){
      var uniqueNames = getUnique(globalTop20.value);
      artisGlobal.value = uniqueNames
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

    async function getGlobalTop20(){
      try {
        const url = `https://www.nuxt.my.id/api/v1/music/top20/global`
        const result = await axios.get(url);
        // console.log('result', result)
        if(result?.status === 200){
          globalTop20.value = result?.data?.tracks

          // result?.data?.tracks.map((a) => {
          //   console.log('a', a)
          // })
          getArtis()
        }
      } catch (e){
        console.log(e)
        discoveryID_error.value = "Gagal memuat data"
      }
    }

    async function getDiscoveryID(){
      try {
        const url = `https://www.nuxt.my.id/api/v1/music/discovery/ID`
        const result = await axios.get(url);
        console.log('result', result)
        if(result?.status === 200){
          discoveryID.value = result?.data?.tracks
        }
      } catch (e){
        console.log(e)
        discoveryID_error.value = "Gagal memuat data"
      }
    }

  }
}
</script>

<style lang="postcss" scoped>
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

.main{
  @apply mt-20;
}
.top-global{
  overflow-x: scroll;
}
.artis-global{
  overflow-x: scroll;
}
.dew{
  @apply flex;
}


.artis-item{
  margin: 10px;
  min-width: 200px;
  max-width: 300px;
}

.image-container{
  width: 100%;
  height: 200px;
  border-radius: 8px;
  border: solid 1px rgba(12,12,12,.1);
  overflow: hidden;
}
.image-container img{
  width: 100%;
  height: 100%;
  object-fit: cover;
}

img.img-top{
  /* width: 100%; */
  max-width: 80px;
  max-height: 80px;
  border-radius: 10px;
}
.number{
  @apply justify-items-center my-auto mx-2;
  max-width: 10px;
}


.item-title{
  margin-left: 10px;
  @apply my-auto justify-items-center w-full;
}


@media (max-width: 700px) {
}
@media (max-width: 500px) {
}

@media (max-width: 450px) {
  .my-audio{
    height: 35px;
  }
}
/* @screen tablet {
}
@screen mobile {
  .input-search {
    @apply my-2 text-lg;
  }
  .btn-search {
    @apply my-2 text-lg font-semibold;
  }
  .input-search {
    @apply px-4;
  }
} */
</style>