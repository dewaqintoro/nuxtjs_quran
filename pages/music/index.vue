<template>
<span>
  <Navbar :theme="myTheme" />
  <div class="main container">
          <!-- <button @click="cek">cek2</button> -->
    <div class="top-global">
      <div class="dew">

        <div class="item">
          <div v-for="(item, index) in globalTop20" :key="index">
            
              <div class="m-2" v-if="index < 3">
                <GlobalComp :item="item" :index="index" @play="play" @pauseAudio="pauseAudio" @playAudio="playAudio" />
              </div>
            
          </div>
        </div>

        <div class="item">
          <div v-for="(item, index) in globalTop20" :key="index">

            <div class="flex m-2" v-if="index > 2 && index < 6">
              <GlobalComp :item="item" :index="index" @play="play"/>
            </div>

          </div>
        </div>

        <div class="item">
          <div v-for="(item, index) in globalTop20" :key="index">
            <div class="flex m-2" v-if="index > 5 && index < 9">
              <div class="number">
                <p>{{index+1}}</p>
              </div>
              <div>
                <img class="img-top" :src="item.images.coverart" alt="img" />
              </div>
              <div class="item-title">
                <p v-if="item.title.length > 20" class="font-bold">{{item.title.substring(0, 20)}}</p>
                <p v-else class="font-bold">{{item.title}}</p>
                <p v-if="item.subtitle.length > 20">{{item.subtitle.substring(0, 20)}}...</p>
                <p v-else>{{item.subtitle}}</p>
                <button @click="play(item)">play</button>
              </div>
            </div>
          </div>
        </div>
        <div class="item">
          <div v-for="(item, index) in globalTop20" :key="index">
            <div class="flex m-2" v-if="index > 8 && index < 12">
              <div class="numberTwo">
                <p>{{index+1}}</p>
              </div>
              <div>
                <img class="img-top" :src="item.images.coverart" alt="img" />
              </div>
              <div class="item-title">
                <p v-if="item.title.length > 20" class="font-bold">{{item.title.substring(0, 20)}}</p>
                <p v-else class="font-bold">{{item.title}}</p>
                <p v-if="item.subtitle.length > 20">{{item.subtitle.substring(0, 20)}}...</p>
                <p v-else>{{item.subtitle}}</p>
                <button @click="play(item)">play</button>
              </div>
            </div>
          </div>
        </div>
        <div class="item">
          <div v-for="(item, index) in globalTop20" :key="index">
            <div class="flex m-2" v-if="index > 11 && index < 15">
              <div class="numberTwo">
                <p>{{index+1}}</p>
              </div>
              <div>
                <img class="img-top" :src="item.images.coverart" alt="img" />
              </div>
              <div class="item-title">
                <p v-if="item.title.length > 20" class="font-bold">{{item.title.substring(0, 20)}}</p>
                <p v-else class="font-bold">{{item.title}}</p>
                <p v-if="item.subtitle.length > 20">{{item.subtitle.substring(0, 20)}}...</p>
                <p v-else>{{item.subtitle}}</p>
                <button @click="play(item)">play</button>
              </div>
            </div>
          </div>
        </div>
        <div class="item">
          <div v-for="(item, index) in globalTop20" :key="index">
            <div class="flex m-2" v-if="index > 14 && index < 18">
              <div class="numberTwo">
                <p>{{index+1}}</p>
              </div>
              <div>
                <img class="img-top" :src="item.images.coverart" alt="img" />
              </div>
              <div class="item-title">
                <p v-if="item.title.length > 20" class="font-bold">{{item.title.substring(0, 20)}}</p>
                <p v-else class="font-bold">{{item.title}}</p>
                <p v-if="item.subtitle.length > 20">{{item.subtitle.substring(0, 20)}}...</p>
                <p v-else>{{item.subtitle}}</p>
                <button @click="play(item)">play</button>
              </div>
            </div>
          </div>
        </div>
        <div class="item">
          <div v-for="(item, index) in globalTop20" :key="index">
            <div class="flex m-2" v-if="index > 17 && index < 21">
              <div class="numberTwo">
                <p>{{index+1}}</p>
              </div>
              <div>
                <img class="img-top" :src="item.images.coverart" alt="img" />
              </div>
              <div class="item-title">
                <p v-if="item.title.length > 20" class="font-bold">{{item.title.substring(0, 20)}}</p>
                <p v-else class="font-bold">{{item.title}}</p>
                <p v-if="item.subtitle.length > 20">{{item.subtitle.substring(0, 20)}}...</p>
                <p v-else>{{item.subtitle}}</p>
                <button @click="play(item)">play</button>
              </div>
            </div>
          </div>
        </div>

      </div>
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
  <!-- <div v-if="musicOn" class="sec-audio">
    <div class="this-audio">
      <div>
        <div>
          <p><b>{{myTitle}}</b></p>
          <p>{{mySubTitle}}</p>
        </div>
        <audio :src="myAudio" controls autoplay class="my-audio"></audio>
      </div>
    </div>
  </div> -->
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

  <!-- <Transition name="drawer">
    <MusicPlay v-if="musicOn" :theme="storeTheme" />
  </Transition> -->
  
</span>
</template>

<script>
import { computed, ref, useAsync, useContext } from '@nuxtjs/composition-api'
import Navbar from '~/components/music/NavbarComp'
import GlobalComp from '~/components/music/GlobalComp'


import axios from 'axios'
export default {
  name: 'Shorten',
  components: {
    Navbar,
    GlobalComp
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

    function setArtis(artis){
      // console.log('artis', artis)
      myuniqueArray.value.map((a) => {
        if(a === artis.subtitle){
          console.log('sama', artis)
        }
        // console.log('a', a.subtitle)
      })
    }

    function getArtis(){
      // var names = [globalTop20.value.subtitle];
      // var names = ["John", "Peter", "Clark", "Harry", "John", "Alice"];
      // console.log('names', names)
      var uniqueNames = getUnique(globalTop20.value);
      // var uniqueNames = getUnique(names);
      artisGlobal.value = uniqueNames
      // console.log('uniqueNames',uniqueNames);
      // globalTop20.value.map((a) => {
      //   myuniqueArray.value.push(a.subtitle);
      //   setArtis(a)
      // })
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
.kecil{
  display: none
}
.sec-audio{
  /* @apply absolute bottom-0 px-0 mb-0 w-full; */
  /* background: red; */
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

.item{
  margin: 10px;
  min-width: 500px;
  max-width: 800px;
  /* background: rgb(245, 186, 24); */
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
.numberTwo{
  @apply justify-items-center my-auto ml-2 mr-4;
  max-width: 10px;
}

.item-title{
  margin-left: 10px;
  @apply my-auto justify-items-center w-full;
}


@media (max-width: 700px) {
}
@media (max-width: 500px) {
  .item{
    min-width: 400px;
    max-width: 480px;
  }
}

@media (max-width: 450px) {
  .item{
    min-width: 320px;
    max-width: 400px;
  }
  .my-audio{
    height: 35px;
  }
  .besar{
    /* visibility:hidden ; */
    display: none;
  }
  .kecil{
    /* visibility:visible ; */
    display: block;
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