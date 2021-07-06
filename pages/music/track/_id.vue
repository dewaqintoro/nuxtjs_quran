<template>
  <div>
    <Navbar :theme="myTheme" />
    <div class="main">
      <div class="section one">
        <!-- <button @click="cek">cek</button> -->
        <div class="be container">
          <div v-if="isDOne" class="img-cover">
            <img :src="myTrack.images.coverart" />
          </div>

          <div class="track-text">
            <div v-if="isDOne">
              <p class="text-2xl font-bold text-black">{{myTrack.title}}</p>
              <p class="font-bold">{{myTrack.subtitle}}</p>
              <p>{{myTrack.genres.primary}} - {{trackCount}} Shazams</p>
            </div>
          </div>
        </div>

        <div v-if="isDOne" class="ce">
          <div class="container">
            <div class="track-text">
              <div class="section-btn-full">
                  <a :href="myTrack.hub.options[0].actions[0].uri" target="_blank">
                    <div class="btn-full">
                      <img src="https://www.shazam.com/resources/ec5e994effe5843ced9530e39ce52a5889643dd1/logos/applemusic/apple-music-note.png" />
                      <div class="text-playfull">
                        <p>Play Full Song</p>
                      </div>
                    </div>
                  </a>
                </div>
            </div>
          </div>
        </div>


      </div>
      <div class="section two container">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda ipsa dolorem velit, laudantium quidem tempore aliquam nostrum cupiditate asperiores voluptatibus nesciunt reiciendis, possimus at consequuntur dolore omnis soluta illum magnam cum cumque alias explicabo. Libero earum perferendis fuga neque eos expedita, officia commodi in. Repellendus asperiores beatae placeat, obcaecati corporis eveniet sunt optio expedita commodi excepturi maiores odit veniam fugit voluptatem! Doloremque accusantium officiis, exercitationem aperiam eveniet, dolore praesentium ipsa ex a fugit placeat eum dolor aliquam voluptas! Sint consequuntur, modi et accusamus ipsum vero, voluptatem iusto, omnis qui fugit velit molestiae praesentium laborum unde deleniti sit asperiores nihil reiciendis.
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
    const isDOne = ref(false)
    const trackCount = ref(0)

    const myTheme = {
      background: '#088b71',
      color: 'white',
      boxShadow:  '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    }

    getMusic()
    getTrackCount()

    return {
      myTheme,
      myTrack,
      isDOne,
      trackCount,
      cek
    }

    function cek(){
      console.log('myTrack',myTrack.value)
    }

    async function getMusic(){
      try {
        const url = `https://vercel-be-v2.vercel.app/api/v1/music/track/${idMusic.value}`
        const result = await axios.get(url);
        if(result?.status === 200){
          myTrack.value = result?.data
          setTimeout(() => {
            isDOne.value = true
          }, 100)
        }
      } catch (e){
        console.log(e)
      }
    }

    async function getTrackCount(){
      try {
        const url = `https://vercel-be-v2.vercel.app/api/v1/music/count/${idMusic.value}`
        const result = await axios.get(url);
        console.log('result', result)
        if(result?.status === 200){
          trackCount.value = result?.data?.total
        }
      } catch (e){
        console.log(e)
      }
    }
  }
}
</script>


<style lang="postcss" scoped>
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
  @apply pt-20;
  min-height: 100vh;
  background: white;
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
.img-cover img{
  min-width: 120px;
  max-width: 200px;
  border-radius: 10px;
  box-shadow: 10px 10px;
  position: absolute;
  @apply shadow-2xl -mt-8;
}

@media (max-width: 450px) {
  .track-cover{
    /* margin-top: -90px; */
    @apply block;
  }
  .img-cover img{
    @apply flex justify-items-center mx-auto text-center;
  }
  .track-title{
    @apply justify-items-center mx-auto text-center mt-4;
  }
  .btn-full{
    width: 50%;
    @apply justify-items-center mx-auto text-center;

  }
}
</style>