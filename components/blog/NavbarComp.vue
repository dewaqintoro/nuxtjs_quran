<template>
  <header v-if="!loadingTheme" class="app-header font-arabic font-bold" :style="{ background: storeTheme.background, color: storeTheme.color }">
    <div class="inner container">
      <div class="start">
        <div class="box" :style="{ boxShadow: storeTheme.boxShadow }">
          <nuxt-link class="btn-nav" to="/">
            <img class="img-nav" src="/iconNew.png" />
          </nuxt-link>
        </div>
        <div v-if="enable" class="box ml-4" :style="{ boxShadow: storeTheme.boxShadow }">
          <nuxt-link class="btn-nav" :to="route">
            <font-awesome-icon :icon="['fas', 'home']" />
          </nuxt-link>
        </div>
        <div class="dropdown">
          <button class="dropbtn">Tutorial</button>
          <div class="dropdown-content">
            <p @click="setTutorial('')" class="text-black dropdown-item">Semua</p>
            <p @click="setTutorial('MERN')" class="text-black dropdown-item">MERN</p>
            <p @click="setTutorial('Mongodb')" class="text-black dropdown-item">Mongodb</p>
            <p @click="setTutorial('Expressjs')" class="text-black dropdown-item">Expressjs</p>
            <p @click="setTutorial('Reactjs')" class="text-black dropdown-item">Reactjs</p>
            <p @click="setTutorial('Nodejs')" class="text-black dropdown-item">Nodejs</p>
          </div>
        </div>
        
      </div>
      <div class="end box" :style="{ boxShadow: storeTheme.boxShadow }">
        <button class="btn-nav focus:outline-none" @click="doSetting()">
          <font-awesome-icon :icon="['fas', 'cog']" />
        </button>
      </div>
      
      <Transition name="drawer">
        <Setting :theme="storeTheme" v-if="isSetting" @close="closeModal" />
      </Transition>
    </div>
  </header>
</template>

<script lang="ts">
import { computed, defineComponent, ref, useContext } from '@nuxtjs/composition-api'
export default defineComponent({
  name: 'NavbarComp',
  props: {
    route: {
      type: String,
      required: false,
      default: '/'
    },
    enable: {
      type: Boolean,
      required: false,
      default: true
    },
  },
  setup(props, { emit }) {
    const { store, route, app } = useContext()
    const isSetting = ref(false)
    const thisSub = app.$cookies.get('sub')
    const thisAudio = app.$cookies.get('audio')
    const initTheme = computed(() => store.state.initTheme)
    const thisTheme = app.$cookies.get('theme')
    const loadingTheme = computed(() => store.state.loadingTheme)
    const storeTheme = computed(() => store.state.theme)

    if(!thisSub){
      store.dispatch('setSub', 'On')
    } else {
      store.dispatch('getSub')
    }
    if(!thisAudio){
      store.dispatch('setAudio', 'On')
    } else {
      store.dispatch('getAudio')
    }
    if(thisTheme){
      store.dispatch('getTheme')
    } else {
      store.dispatch('setTheme', initTheme.value)
    }

    return {
      storeTheme,
      loadingTheme,
      isSetting,
      cekData,
      closeModal,
      doSetting,
      cek,
      setTutorial
    }

    async function setTutorial(e:any){
      console.log(e)
      emit('tutorial', e)
    }

    function cek(){
      console.log(props)
    }
    
    function closeModal() {
      isSetting.value = false
    }
    function doSetting() {
      isSetting.value = true
    }
    function cekData() {
    }
  },
})
</script>

<style lang="postcss" scoped>
/* Style The Dropdown Button */
.dropbtn {
  /* background-color: #4CAF50; */
  color: white;
  /* padding: 16px;
  font-size: 16px; */
  border: none;
  cursor: pointer;
}

.dropdown-item{
  cursor: pointer;
}

.dropdown-item:hover{
  background: gray;
  color: white;
}

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
}

/* Links inside the dropdown */
.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

/* Change color of dropdown links on hover */
.dropdown-content a:hover {background-color: #f1f1f1}

/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {
  display: block;
}

/* Change the background color of the dropdown button when the dropdown content is shown */
.dropdown:hover .dropbtn {
  background-color: #3e8e41;
}


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
  }
  .line {
    @apply block w-px opacity-50 mr-3;
    height: 32px;
  }
}
@screen mobile {
}
@screen sm {
}
@screen md {
  .app-header {
    @apply flex-shrink-0;
    /* @apply relative; */
  }
}
</style>