<template>
<span>
  <Navbar :theme="myTheme" />
  <div class="section">
    <div class="main">
      <div class="top-global">
        <div>
          <div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
          </div>
        </div>
      </div>
      <!-- <button @click="getDiscoveryID()" class="btn-search focus:outline-none" type="button">
        getDiscoveryID
      </button>
      <button @click="getGlobalTop20()" class="btn-search focus:outline-none" type="button">
        getGlobalTop20
      </button>
      <button @click="cek()" class="btn-search focus:outline-none" type="button">
        cek
      </button> -->
    </div>
  </div>
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

    return {
      search,
      discoveryID,
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
        const url = `https://www.nuxt.my.id/api/v1/music/discovery/IDx`
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
.short-url {
  background: #05725c;
  @apply flex justify-center w-full py-2 mt-4 rounded-lg;
}
  /* enter transitions */
  .toast-enter-from {
    opacity: 0;
    transform: translateY(-60px);
  }
  .toast-enter-active {
    transition: all 0.3s ease;
  }
  .toast-leave-to {
    opacity: 0;
    transform: translateY(-60px);
  }
  .toast-leave-active {
    transition: all 0.3s ease;
  }

.section {
  @apply mt-20 min-h-screen w-full;
}

.main {
  /* background: #0edfb5; */
  @apply text-center mx-auto w-full;
}

.head {
  @apply text-4xl font-bold;
}

.search {
  @apply mt-8 text-xl flex text-center;
}

.input-search {
  @apply appearance-none border py-2 px-4 w-full text-gray-700 leading-tight rounded-l-lg;
}
.btn-search {
  background-color: #076e5a;
  @apply text-white font-bold py-2 px-4 rounded-r-lg;
  /* background-color: #4497eb; */
}
.btn-search:hover {
  /* background-color: #2187ec; */
  background-color: #0e836c;

}

.copy-text{
  /* @apply mx-2 py-2 px-4 text-white w-full; */
  background: transparent;
  color: white;
}

@screen tablet {
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
}
</style>