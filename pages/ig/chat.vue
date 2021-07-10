<template>
<span>
  <div class="main">

    <div v-if="!loadingTheme" :style="{ background: storeTheme.background, color: storeTheme.color }" class="fixed">
      <div class="header-main">
        <div class="back">
          <nuxt-link to="/">
            <font-awesome-icon class="icon-back" :icon="['fas', 'arrow-left']" />
          </nuxt-link>
          <p class="text-xl font-bold ml-8">dewaqintoro</p>
        </div>
        <div class="flex">
          <button class="mr-3 ">
            <font-awesome-icon class="my-icon" :icon="['fas', 'bars']" />
          </button>
          <button class="mx-2 " @click="cek">
            <font-awesome-icon class="my-icon" :icon="['far', 'edit']" />
          </button>
          
        </div>
      </div>
    </div>

  </div>
</span>
</template>

<script>
import { computed, ref, useAsync, useContext, watch } from '@nuxtjs/composition-api'

import axios from 'axios'
export default {
  name: 'Shorten',
  components: {
  },

  setup(){
    const { store, route, app } = useContext()

    const initTheme = computed(() => store.state.initTheme)
    const thisTheme = app.$cookies.get('theme')
    const loadingTheme = computed(() => store.state.loadingTheme)
    const storeTheme = computed(() => store.state.theme)
    const darkTheme = ref(false)

    if(thisTheme){
      store.dispatch('getTheme')
    } else {
      store.dispatch('setTheme', initTheme.value)
    }

    watch(darkTheme, () => {
      console.log("darkTheme: ", darkTheme.value)
      // if(search.value.length === 0){
      //   resultDone.value = false
      // }
    })

    cek()
    return {
      storeTheme,
      loadingTheme,
      darkTheme,
      cek
    }

    function cek(){
      // console.log('storeTheme', storeTheme.value.darktheme)
      // setTimeout(() => {
        
      // }, 100)

      if(storeTheme.value.darktheme === true){
          darkTheme.value = true
        }else{
          darkTheme.value = false
        }
    }

  }
}
</script>

<style lang="postcss" scoped>
.back{
  @apply flex ml-4;
}
.icon-back{
  font-size: 25px;
}


div.fixed {
  position: fixed;
  top: 0;
  /* background: white; */
  width: 100%;
}

.main{
  @apply min-h-full ;
}

.header-main{
  /* background: white; */
  @apply flex justify-between py-2;
}

.ig-logo{
  max-width: 120px;
  @apply ml-2;
}

.my-icon{
  font-size: 30px;
}

.post-icon{
  font-size: 24px;
}

.header-story{
  overflow-x: scroll;
  -ms-overflow-style: none; 
  scrollbar-width: none;
}

.header-story::-webkit-scrollbar {
  display: none;
}

.dew{
  @apply flex;
}

.item{
  min-width: 90px;
  @apply text-center p-2;
}

.itemS img{
@apply text-center p-1;
}
.item-img{
  border: 2px solid red;
  @apply rounded-full p-1;
}

.item-img img{
  @apply rounded-full;
}

.my-item-img{
  @apply rounded-full p-1;
}

.my-item-img img{
  min-width: 77px;
  @apply rounded-full pt-1;
}



.sikel {
   position: fixed;
   left: 0;
   bottom: 0;
   width: 100%;
   background-color: white;
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

@media (max-width: 700px) {
}
@media (max-width: 500px) {
}

@media (max-width: 450px) {
  .my-audio{
    height: 35px;
  }
}
</style>