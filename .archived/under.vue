<template>
  <div v-if="!loadingTheme" class="under error min-h-screen text-center justify-center center items-center">
    <!-- <div>
      <NuxtLink to="/">
        <button class="back focus:outline-none" :style="{ boxShadow: storeTheme.boxShadow  }">Under</button>
      </NuxtLink>
    </div> -->
    <div class="wrapper">
      <div class="static-txt">
        i'm a
      </div>
      <ul class="dynamic-txts">
        <li><span>Website belum siap</span></li>
        <li><span>Masih #NgodingBentar</span></li>
      </ul>
    </div>
    <!-- <div class="gambar text-center justify-center center items-center">
      <img :src="background" />
    </div> -->
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
.under {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #343F4F;
}

.wrapper {
  display: inline;
}

.wrapper .static-txt {
  color: #fff;
  font-size: 60px;
  font-weight: 400;
}

.wrapper .dynamic-txts{
  margin-left: 15px;
  height: 90px;
  line-height: 90px;
  overflow: hidden;
}
.dynamic-txts li{
  color: #FC6D6D;
  list-style: none;
  font-size: 60px;
  font-weight: 500;
}


.dynamic-txts li span{
  position: relative;
}

.dynamic-txts li span:after{
  content: "";
  position: absolute;
  left: 0;
  height: 100%;
  width: 100%;
  background: #343F4F;
  border-left: 2px solid #FC6D6D;
  animation: typing 3.5s steps(10) infinite;
}
@keyframes typing {
  100%{
    left: 100%;
    margin: 0 -35px 0 35px;
  }
}
/* .back {
  @apply py-2 px-4 mt-8 mb-16 rounded-xl text-xl;
}

.gambar {
  display: flex;
}
.error {
  @apply pt-16 px-16;
}

.error img {
  width: 60%;
}
.darkTheme{
  .box:hover{
    background: rgb(61, 81, 94);
  }
}
.lightTheme{
  .box:hover {
    background: #f1f1f1;
  }
}

@screen tablet {
  .main {
    @apply pt-28;
  }
}
@screen mobile {
  .error {
    @apply px-2;
  }
  .back {
    @apply mt-0 mb-8 rounded-xl text-sm;
  }

} */
</style>