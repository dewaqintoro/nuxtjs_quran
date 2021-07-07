<template>
  <header v-if="!loadingTheme" class="app-header font-bold" :style="{ background: storeTheme.background, color: storeTheme.color }">
    <div class="inner">
      <div class="start">
        <div class="box" :style="{ boxShadow: storeTheme.boxShadow }">
          <nuxt-link class="btn-nav" to="/music">
            <img class="img-nav" src="/iconNew.png" />
          </nuxt-link>
        </div>
        <!-- <div v-if="enable" class="mx-2">
          <nuxt-link :to="route">
            Home
          </nuxt-link>
        </div> -->
      </div>

      <div class="end">
        <div class="flex my-search">
          <input v-model="search" class="input-search focus:outline-none" id="username" type="search"  placeholder="Cari Disini. . .">
          <button class="focus:outline-none" @click="searchData">
            <font-awesome-icon :icon="['fas', 'search']" />
          </button>
        </div>
        <div class="my-btn">
          <button class="focus:outline-none" @click="changetheme()">
            <font-awesome-icon v-if="isChecked" :icon="['fas', 'moon']" />
            <font-awesome-icon v-else :icon="['fas', 'sun']" />
          </button>
        </div>
      </div>

      <!-- <Transition name="drawer">
        <SearchModalComp :theme="storeTheme" v-if="isSearch" @close="closeModal" @dosearch="dosearch" />
      </Transition> -->


    </div>
    <div class="hah z-100">
      <div v-if="resultDone && search" class="result-box">
        <p class="text-xl font-bold pl-4 mt-2">Songs</p>
        <p>key: {{search}}</p>
        <!-- <div class="result-item">sss</div>
        <div class="result-item">sss</div>
        <div class="result-item">sss</div> -->
        <div class="result-item" v-for="(track, index) in resultTracks" :key="index">
          {{track.alias}}
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { computed, defineComponent, ref, useContext, watch } from '@nuxtjs/composition-api'
import axios from 'axios'

export default defineComponent({
  name: 'NavbarComp',
  props: {
    route: {
      type: String,
      required: false,
      default: '/music'
    },
    enable: {
      type: Boolean,
      required: false,
      default: true
    },
    isblogid: {
      type: Boolean,
      required: false,
      default: false
    },
  },
  setup(props, { emit }) {
    const { store, route, app } = useContext()
    const isSearch = ref(false)
    const thisSub = app.$cookies.get('sub')
    const thisAudio = app.$cookies.get('audio')
    const initTheme = computed(() => store.state.initTheme)
    const thisTheme = app.$cookies.get('theme')
    const loadingTheme = computed(() => store.state.loadingTheme)
    const storeTheme = computed(() => store.state.theme)
    const routeId = '/blog?category=MERN'
    const search = ref('')

    const resultTracks = ref([])
    const resultArtists = ref([])
    const resultDone = ref(false)

    // const isChecked = ref(false)

    const isChecked = computed(() => {
      if(storeTheme.value.darktheme){
        return true
      }else {
        return false
      }
    })

    watch(search, () => {
      // console.log("search: ", search.value)
      if(search.value.length === 0){
        resultDone.value = false
      }
    })

    return {
      storeTheme,
      loadingTheme,
      isSearch,
      routeId,
      isChecked,
      search,
      resultTracks,
      resultArtists,
      resultDone,
      cekData,
      closeModal,
      doSearch,
      cek,
      setTutorial,
      changetheme,
      dosearch,
      searchData
    }


    async function doSearchs(){
      emit('searchData')
      // app.router?.push(`/music/search?q=${search.value}`)
      // try{
      //   const url = `https://vercel-be-v2.vercel.app/api/v1/music/search?q=${search.value}`
      //   const result = await axios.get(`${url}`);
      //   console.log('result', result)
        
      // }catch(err){
      //   console.log(err)
      // }
    }

    async function searchData(){
      try{
        const url = `https://vercel-be-v2.vercel.app/api/v1/music/search?q=${search.value}`
        const result = await axios.get(`${url}`);
        if(result?.data){
          resultTracks.value = result?.data?.tracks?.hits
          resultArtists.value = result?.data?.artists?.hits
          resultDone.value = true
        }
        // console.log('result', result)
      }catch(err){
        console.log(err)
      }
    }

    function changetheme(){
      console.log('changetheme')
      store.dispatch('changeTheme')
    }

    async function setTutorial(c:any){
      emit('tutorial', c)
      // console.log('setTutorial nav', c)
    }

    // async function dosearch(e:any){
    //   console.log('dosearch navbar', e)
    //   emit('dosearch', e)
    // }

    async function dosearch(e:any){
      console.log('dosearch navbar')
      emit('dosearch', e)
    }


    function cek(){
      // console.log(props)
      console.log('storeTheme',storeTheme)
    }
    
    function closeModal() {
      isSearch.value = false
    }
    function doSearch() {
      isSearch.value = true
    }
    function cekData() {
    }
  },
})
</script>

<style lang="postcss" scoped>
.hah{
  position: absolute;
  /* background: rgb(255, 228, 228); */
  width: 100%;
  @apply px-16 mt-4;
}
.result-box{
  background: rgb(226, 226, 226);
  min-width: 40%;
  float: right;
  @apply justify-end rounded-xl;
}
.result-item{
  @apply px-4 py-1;
}
.my-search{
  justify-content: center;
  justify-items: center;
  margin: auto;
  background: white;
  margin-right: 10px;
  border-radius: 20px;
  @apply pr-4 pl-2;
}

.my-btn{
  justify-content: center;
  justify-items: center;
  margin: auto;
}
.input-search{
  width: 100%;
  padding: 5px 7px;
  color: black;
}

.switch {
  @apply mx-2;
  position: relative;
  display: inline-block;
  width: 48px;
  height: 21.76px;
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
}
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}
.slider::before {
  position: absolute;
  content: '';
  height: 16.64px;
  width: 16.64px;
  left: 3.20px;
  bottom: 3.20px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}
.round {
  border-radius: 21.76px;
}
.round::before {
  border-radius: 50%;
}
input:checked + .slider {
  background-color: #1f2937;
}
input:focus + .slider {
  box-shadow: 0 0 1px #1f2937;
}
input:checked + .slider::before {
  -webkit-transform: translateX(24px);
  -ms-transform: translateX(24px);
  transform: translateX(24px);
}
.item-mode {
  /* @apply py-2;  */
}



/* Style The Dropdown Button */
.dropbtn {
  /* background-color: #4CAF50; */
  /* color: white; */
  /* padding: 16px;
  font-size: 16px; */
  border: none;
  cursor: pointer;
}

.dropdown-item{
  cursor: pointer;
}

/* .dropdown-item:hover{
  background: gray;
  color: white;
} */

/* The container <div> - needed to position the dropdown content */
.dropdown {
  position: relative;
  display: inline-block;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  border-radius: 10px;
}

/* Links inside the dropdown */
.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

/* Change color of dropdown links on hover */
.dropdown-content a:hover {
  background-color: #f1f1f1;
}

.dropdown-content a.top:hover {
  border-radius: 10px 10px 0 0;
}

.dropdown-content a.under:hover {
  border-radius: 0 0 10px 10px;
}


/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {
  display: block;
}

/* .dropdown:hover .dropbtn {
  background-color: #3e8e41;
} */


.box {
  @apply rounded-full flex justify-center;
  padding: 10px;
  font-size: 20px;
  place-items: center;
  text-align: center;
}

.btn-nav {
  width: 25px;
  height: 25px;
}
/* img.img-nav{
  width: 22px;
} */

@font-face {
  font-family: "lpmq";
  src: url(/fonts/lpmq.otf) format("opentype");
  font-display: swap;
}
.font-arabic{
  font-family: "lpmq", Arial, sans-serif;
  line-height: 2;
}
.app-header {
  @apply fixed w-full top-0 py-4;
  @apply z-30 select-none;
  height: var(--header-height);
  min-width: 320px;
  .inner {
    @apply flex flex-wrap justify-between h-full text-xl;
    @apply px-8;
  }
  .start {
    @apply flex items-center;
  }
  .end {
    /* @apply grid grid-flow-col gap-4; */
    @apply flex items-center;
  }
  .line {
    @apply block w-px opacity-50 mr-3;
    height: 32px;
  }
}
@screen mobile {
  .app-header {
    .inner{
      @apply text-base ;
    }
  }
}
@screen sm {
}
@screen md {
  .app-header {
    @apply flex-shrink-0;
    /* @apply relative; */
    /* .inner{
      @apply text-sm;
    } */
  }
}

@media (max-width: 450px) {
  .hah{
    @apply px-2;
  }
.result-box{
  min-width: 70%;
}
}
</style>