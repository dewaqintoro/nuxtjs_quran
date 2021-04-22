<template>
  <span>
    <Navbar />
    <div v-if="!loadingTheme" class="main" :style="{ background: storeTheme.background, color: storeTheme.color, boxShadow: storeTheme.boxShadow }">
      <div class="container" :class="bgId">
        <nuxt-link to="/agama/surah" class="box" :style="{ boxShadow: storeTheme.boxShadow }">
          <div class="content items-center">
            <img class="m-auto" src="/quran2.png" alt="https://www.freepik.com" />
            <p>Daftar Surah</p>
          </div>
        </nuxt-link>
        <nuxt-link to="/surah" class="box" :style="{ boxShadow: storeTheme.boxShadow }">
          <div class="content items-center">
            <img class="m-auto" src="/allah.png" alt="https://www.freepik.com" />
            <p>Asmaul Husna</p>
          </div>
        </nuxt-link>
        <nuxt-link to="/agama/doa-harian" class="box" :style="{ boxShadow: storeTheme.boxShadow }">
          <div class="content items-center">
            <img class="m-auto" src="/praying.png" alt="https://www.freepik.com" />
            <p>Doa Harian</p>
          </div>
        </nuxt-link>
        <nuxt-link to="/agama/tahlil" class="box" :style="{ boxShadow: storeTheme.boxShadow }">
          <div class="content items-center">
            <img class="m-auto" src="/pray.png" alt="https://www.freepik.com" />
            <p>Doa Tahlil</p>
          </div>
        </nuxt-link>
        <nuxt-link to="/surah" class="box" :style="{ boxShadow: storeTheme.boxShadow }">
          <div class="content items-center">
            <img class="m-auto" src="/beads.png" alt="https://www.freepik.com"/>
            <p>Wirid</p>
          </div>
        </nuxt-link>
      </div>
    </div>

  </span>
</template>
<script>
import { computed, ref, useAsync, useContext } from '@nuxtjs/composition-api'
import Navbar from '~/components/Navbar.vue'
export default {
  name: 'Quran',
  components: {
    Navbar,
  },
  setup(_, {emit}){
    const { app, store } = useContext()
    const search = ref('')
    const allSurah = ref([])
    const pageOfItems = ref([])
    const loading = ref(true)
    const loadingTheme = computed(() => store.state.loadingTheme)
    const storeTheme = computed(() => store.state.theme)
    const bgId = computed(() => {
      if(storeTheme.value?.darktheme){
        return 'darkTheme'
      } else {
        return 'lightTheme'
      }
    })

    return {
      loadingTheme,
      storeTheme,
      bgId
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

.main {
  @apply pt-20 min-h-screen;
  display: flex;
  justify-content: center;
  align-self: center;
  /* background-color: #f7f7f7; */
  
}
.container {
  position: relative;
  max-width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(40%, 1fr));
  grid-template-rows: repeat(minmax(100px, auto));
  margin: 40px;
  grid-auto-flow: dense;
  grid-gap: 20px;
}

.container .box {
  @apply rounded-2xl;
  padding: 20px;
  display: grid;
  font-size: 20px;
  place-items: center;
  text-align: center;
  /* color: #fff; */
  /* transition: 0.5s; */

  /* background: #f7f7f7; */
/* box-shadow:  5px 5px 12px #dedede,-5px -5px 12px #ffffff; */
}

/* .container .box:hover {
  background: #94B0B7;
} */

.container .box img {
  position: relative;
  max-width: 50px;
  margin-bottom: 10px;
}


/* @screen mobile { */
  .container {
    margin: 20px;
  }
  .container .box:nth-child(1){
    grid-column: span 2;
    grid-row: span 1;
  }
  .container .box:nth-child(2){
    grid-column: span 1;
    grid-row: span 1;
    
  }
  .container .box:nth-child(3){
    grid-column: span 1;
    grid-row: span 2;
    
  }
  .container .box:nth-child(4){
    grid-column: span 1;
    grid-row: span 2;
  }
  .container .box:nth-child(5){
  }
  
/* } */
@screen mobile {
  .main {
    @apply pt-16;
  }
}
</style>