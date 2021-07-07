<template>
  <div>
    <Navbar :theme="myTheme" />
    <div class="main">
      <div class="section one">
        
        <div class="be container">
          <div v-if="artistDone">
            <img class="track-img" :src="artistDetail.avatar" alt="img" />
          </div>

          <div class="track-text">
            <div v-if="artistDone">
              <p class="text-2xl font-bold text-black">{{artistDetail.name}}</p>
              <p class="font-bold">{{artistDetail.genres.primary}}</p>
            </div>
          </div>
        </div>

        <!-- <div v-if="artistDone" class="ce">
          <div class="container">
            <div class="track-text">
              <div class="section-btn-full">
                  <a :href="artistDetail.hub.options[0].actions[0].uri" target="_blank">
                    <div class="btn-full">
                      <font-awesome-icon class="m-auto" :icon="['fas', 'music']" />
                      <div class="text-playfull">
                        <p>Play Full Song</p>
                      </div>
                    </div>
                  </a>
                </div>
            </div>
          </div>
        </div> -->


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
import axios from 'axios'

export default {
  name: 'MusicId',
  components: {
    Navbar
  },
  setup(props){
    
    const { route, store, app } = useContext()
    const idSurah = ref('')
    const idAyat = ref('')
    const artistId = ref(route.value.params.id)
    const artistDetail = ref([])
    const artistDone = ref(false)

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

    getArtist()

    return {
      myTheme,
      artistDetail,
      artistDone,
      cek,
      getArtist
    }

    function cek(){
      console.log('artistDetail.value',artistDetail.value)
    }

    async function getArtist(){
      try {
        const url = `https://vercel-be-v2.vercel.app/api/v1/music/artist/${artistId.value}`
        const result = await axios.get(url);
        console.log('result', result.data)
        if(result?.status === 200){
          artistDetail.value = result?.data
          setTimeout(() => {
            artistDone.value = true
          }, 100)
        }
      } catch (e){
        console.log(e)
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.artis-global{
  overflow-x: scroll;
}
.dew{
  @apply flex my-2;
}
.artis-item{
  margin: 0 5px;
  min-width: 180px;
  max-width: 220px;
}

.artis-item img{
  border-radius: 10px;
}

.be{
  @apply pt-20;
}
.track-text{
  padding-left: 220px;
}
.ce{
  background: white;
}
.btn-full{
  background-color: #242424;
  cursor: pointer;
  color: white;
  border-radius: 25px;
  max-width: 200px;
  @apply flex p-1 mt-6;
}
.text-playfull{
  letter-spacing: .5px;
  margin-top: 3px;
  text-transform: uppercase;
  @apply flex justify-items-center mx-auto pr-4 ml-2;
}
.btn-full img{
  max-width: 30px !important;
  height: 30px !important;
}
.main{
  @apply pt-16;
  min-height: 100vh;
  background: white;
}

.section-title {
  @apply font-bold text-2xl;
}

.track-title{
  @apply ml-4;
}
.one{
  background: #f7f7f7;
}
.two{
  background: white;
  @apply mt-16;
}

.atas{
  @apply flex w-full;
}
.track-cover{
  @apply flex w-full;
}

.second{
  @apply flex;
}

.second-left {
  @apply w-4/6 pr-4;
}

.second-right {
  @apply w-2/6;
}

.btn-more{
  background: #08f;
  @apply px-4 py-2 rounded-2xl font-bold text-white focus:outline-none;
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

.track-img{
  min-width: 120px;
  max-width: 200px;
  /* border-radius: 10px; */
  box-shadow: 10px 10px;
  position: absolute;
  transition: transform 0.8s;
  @apply shadow-xl -mt-8 rounded-full;
}

.track-img:hover {
  -ms-transform: scale(1.02); /* IE 9 */
  -webkit-transform: scale(1.02); /* Safari 3-8 */
  transform: scale(1.02); 
}

@media (max-width: 450px) {
  .track-cover{
    /* margin-top: -90px; */
    @apply block;
  }
  .section-title {
    @apply text-xl;
  }
  .track-img{
    position: relative;
    @apply flex justify-items-center mx-auto text-center;
  }
  .track-title{
    @apply justify-items-center mx-auto text-center mt-4;
  }
  .btn-full{
    max-width: 55%;
    @apply justify-items-center mx-auto text-center;
  }
  .track-text{
    padding-left: 0px;
    @apply justify-items-center mx-auto text-center mt-8;
  }
  .second{
    @apply block px-2;
  }

  .second-left {
    @apply w-full;
  }

  .second-right {
    @apply w-full mt-8 border-t-2;
  }
}
</style>