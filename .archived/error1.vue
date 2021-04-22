<template>
<div class="">
  <!-- <NuxtLink to="/">Home page</NuxtLink> -->
  <div :style="{ background: storeTheme.background, color: storeTheme.color, boxShadow: storeTheme.boxShadow }" class="min-h-screen flex text-center justify-center center items-center">
      <img class="m-auto" :src="background" />
  </div>
</div>
</template>

<script>
  import { computed, ref, useAsync, useContext } from '@nuxtjs/composition-api'
  export default {
    props: ['error'],
    layout: 'error', // you can set a custom layout for the error page,
    setup(){
      const { app, store } = useContext()
      const storeTheme = computed(() => store.state.theme)
      const loadingTheme = computed(() => store.state.loadingTheme)
      const thisTheme = app.$cookies.get('theme')
      // const background = ref('')

      const background = computed(() => {
        if(storeTheme.value?.darktheme){
          return '/404dark.svg'
        } else {
          return '/404light.svg'
        }
      })

      if(thisTheme){
        store.dispatch('getTheme')
      } else {
        store.dispatch('setTheme', initTheme.value)
      }

      return {
        loadingTheme,
        background,
        storeTheme,
        cek
      }

      function cek(){
        console.log(loadingTheme)
        console.log('background', background)
      }
    }
  }
</script>

<style lang="postcss" scoped>
.darkTheme{
  /* color: rgb(61, 81, 94); */
  .box:hover{
    background: rgb(61, 81, 94);
  }
}
.lightTheme{
  .box:hover {
    background: #f1f1f1;
  }
}
</style>