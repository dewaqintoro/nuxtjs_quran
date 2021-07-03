<template>
<span>
  <Navbar :theme="myTheme" />
  <div class="main container">
    <div class="top-global">
      <div class="dew">
        <div class="item">
          <div v-for="(item, index) in globalTop20" :key="index">
            <div class="flex m-2" v-if="index < 3">
              <div class="number">
                <p>{{index+1}}</p>
              </div>
              <div>
                <img class="img-top" :src="item.images.coverart" alt="img" />
              </div>
              <div class="item-title">
                <p class="font-bold">{{item.title}}</p>
                <p>{{item.subtitle}}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="item">
          <div v-for="(item, index) in globalTop20" :key="index">
            <div v-if="index > 2 && index < 6">
              {{item.title}}
            </div>
          </div>
        </div>
        <div class="item">
          <div v-for="(item, index) in globalTop20" :key="index">
            <div v-if="index > 5 && index < 9">
              <div>
                {{index+1}}
              </div>
            </div>
          </div>
        </div>
        <div class="item">
          <div v-for="(item, index) in globalTop20" :key="index">
            <div v-if="index > 8 && index < 12">
              {{item.title}}
            </div>
          </div>
        </div>
        <div class="item">
          <div v-for="(item, index) in globalTop20" :key="index">
            <div v-if="index > 11 && index < 15">
              {{item.title}}
            </div>
          </div>
        </div>
        <div class="item">
          <div v-for="(item, index) in globalTop20" :key="index">
            <div v-if="index > 14 && index < 18">
              {{item.title}}
            </div>
          </div>
        </div>
        <div class="item">
          <div v-for="(item, index) in globalTop20" :key="index">
            <div v-if="index > 17 && index < 21">
              {{item.title}}
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
  <!-- <div class="section mt-20">
    <div class="main">
      <div class="top-global">
        <div class="items">
          <div class="item bg-green-100 ">
            <div>1a</div>
            <div>1</div>
            <div>1</div>
          </div>
          <div class="item bg-blue-200 ">
            <div>2</div>
            <div>2</div>
            <div>2</div>
          </div>
          <div class="item bg-blue-200 ">
            <div>2</div>
            <div>2</div>
            <div>2</div>
          </div>
          <div class="item bg-blue-200 ">
            <div>2</div>
            <div>2</div>
            <div>2</div>
          </div>
        </div>
      </div>
      <button @click="getDiscoveryID()" class="btn-search focus:outline-none" type="button">
        getDiscoveryID
      </button>
      <button @click="getGlobalTop20()" class="btn-search focus:outline-none" type="button">
        getGlobalTop20
      </button>
      <button @click="cek()" class="btn-search focus:outline-none" type="button">
        cek
      </button>
    </div>
  </div> -->
</span>
</template>

<script>
import { computed, ref, useAsync, useContext } from '@nuxtjs/composition-api'
// import Loading from '@/components/Loading.vue'
// import { VueNotificationList } from '@dafcoe/vue-notification'
import Toast from '@/components//Toast'
import Navbar from '~/components/music/NavbarComp'

import axios from 'axios'
export default {
  name: 'Shorten',
  components: {
    Toast,
    Navbar
  },
  setup(){
    const search = ref('')
    const discoveryID = ref([])
    const discoveryID_error = ref('')
    const globalTop20 = ref([])
    const myText = ref('wadudu')
    const isCopied = ref(false)
    const showToast = ref(false)
    const triggerToast = () => {
      showToast.value = true;
      setTimeout(() => showToast.value = false, 3000)
    }
    const myTheme = {
      background: '#088b71',
      color: 'white',
      boxShadow:  '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    }

    // getDiscoveryID()
    getGlobalTop20()

    return {
      search,
      discoveryID,
      globalTop20,
      myText,
      myTheme,
      isCopied,
      discoveryID_error,
      cek,
      triggerToast,
      getDiscoveryID,
      getGlobalTop20,
    }

    async function cek(){
      console.log('discoveryID', discoveryID.value)
    }

    async function getGlobalTop20(){
      try {
        const url = `https://www.nuxt.my.id/api/v1/music/top20/global`
        const result = await axios.get(url);
        console.log('result', result)
        if(result?.status === 200){
          globalTop20.value = result?.data?.tracks
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
.main{
  @apply mt-20;
}
.top-global{
  overflow-x: scroll;
}
.dew{
  @apply flex;
}

.item{
  margin: 10px;
  min-width: 500px;
  max-width: 800px;
  background: rgb(245, 186, 24);
}

img.img-top{
  width: 80px;
  height: 80px;
  border-radius: 10px;
}
.number{
  @apply justify-items-center my-auto mx-2;
  max-width: 10px;
}

.item-title{
  margin-left: 10px;
  @apply my-auto justify-items-center;
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