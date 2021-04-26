<template>
  <div class="section">
    <div class="main">
      <div class="head">Short links</div>
      <transition name="toast">
        <Toast class="text-center m-auto w-full" v-if="showToast" />
      </transition>
      <div class="search flex text-center">
        <input class="input-search focus:outline-none" id="username" type="search" v-model="search" placeholder="Place link. . .">

        <button @click="searchFilter()" class="btn-search focus:outline-none" type="button">
          Shorten
        </button>
      </div>
      <div class="short-url">
        <p class="mx-2 py-2 px-4 text-white">{{myLink.shortUrl || '-'}}</p>
        <!-- <p class="mx-2 py-2 px-4 text-white w-full">wadudu</p> -->
        <button class="focus:outline-none mx-2 bg-gray-100 py-2 px-4 rounded-lg" @click="copy">
          Copy
        </button>
      </div>
    </div>
    
  </div>
</template>

<script>
import { computed, ref, useAsync, useContext } from '@nuxtjs/composition-api'
// import Loading from '@/components/Loading.vue'
// import { VueNotificationList } from '@dafcoe/vue-notification'
import Toast from '@/components//Toast'

import axios from 'axios'
export default {
  name: 'Shorten',
  components: {
    Toast
  },
  setup(_, {emit}){
    const { app, store } = useContext()
    const storeTheme = computed(() => store.state.theme)
    const search = ref('')
    const short = ref('')
    const myLink = ref([])
    const myText = ref('wadudu')
    const isCopied = ref(false)

    const showToast = ref(false)
    const triggerToast = () => {
      showToast.value = true;
      setTimeout(() => showToast.value = false, 3000)
    }

    return {
      search,
      myLink,
      myText,
      storeTheme,
      isCopied,
      searchFilter,
      cek,
      copy,
      outFunc,
      showToast, triggerToast
    }

    function outFunc() {
      var tooltip = document.getElementById("myTooltip");
      tooltip.innerHTML = "Copy to clipboard";
    }

    function copy(){
      try {
        navigator.clipboard.writeText(myLink.value?.shortUrl)
        triggerToast()
      } catch (e){
        throw e
      }
    }
    async function searchFilter(){
      const params = {
        longUrl : search.value
      }

      const url = `https://www.nuxt.my.id/api/v1/shorten`
      const result = await axios.post(url, params);
      myLink.value = result?.data
      console.log('result', result)
    }

    function cek(){
      console.log('myLink', myLink.value)
    }

  }
}
</script>

<style lang="postcss" scoped>
.short-url {
  background: #05725c;
  /* height: 200px */
  /* @apply flex justify-center w-full py-2 mt-4; */
  @apply flex justify-center w-full py-2 mt-4 rounded-lg;
}
  /* enter transitions */
  .toast-enter-from {
    opacity: 0;
    transform: translateY(-60px);
  }
  /* .toast-enter-to {
    opacity: 1;
    transform: translateY(0);
  } */
  .toast-enter-active {
    transition: all 0.3s ease;
  }
  /* leave transitions */
  /* .toast-leave-from {
    opacity: 1;
    transform: translateY(0);
  } */
  .toast-leave-to {
    opacity: 0;
    transform: translateY(-60px);
  }
  .toast-leave-active {
    transition: all 0.3s ease;
  }

.section {
  @apply min-h-screen flex w-full;
  background: #00b894;
}

.main {
  /* background: #0edfb5; */
  @apply text-center m-auto w-full;
  max-width: 60vw;
}

.head {
  @apply text-4xl font-bold;
}

.search {
  @apply mt-8 text-xl;
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

@screen tablet {
}
@screen mobile {
  .main {
    max-width: 80vw;
  }
  .input-search {
    @apply my-2;
  }
  .btn-search {
    @apply my-2;
  }
  .input-search {
    @apply px-4;
  }
}
</style>