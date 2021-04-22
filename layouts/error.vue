<template>
  <div v-if="!loadingTheme" :style="{ background: storeTheme.background, color: storeTheme.color, boxShadow: storeTheme.boxShadow }" class="error min-h-screen text-center justify-center center items-center">
    <NuxtLink to="/agama/al-quran">Home page</NuxtLink>
    <img class="m-auto" :src="background" />
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
      const initTheme = computed(() => store.state.initTheme)
      const thisTheme = app.$cookies.get('theme')
      // const background = ref('')

      const background = computed(() => {
        if(storeTheme.value?.darktheme){
          return '/404dark2.svg'
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
.error {
  @apply px-8 pt-16;
}

.error img {
  @apply pt-4;
  max-width: 700px;
}
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