<template>
<!-- <div>
  <Navbar route="/blog" />
  <button @click="getData">getData</button>
  <div class="mt-24">
    <span v-for="blog in blogs" :key="blog._id">
      <MainCardComp :blog="blog" />
      <span v-html="blog.title"></span>
      <span v-html="blog.body"></span>
    </span>
  </div>
</div> -->

  <span>
    <Navbar route="/blog" />
    <div class="main" v-if="!loadingTheme" :style="{ background: storeTheme.background, color: storeTheme.color, boxShadow: storeTheme.boxShadow }">
      <!-- <SearchComp @search="searchFilter" :fields='dataFields' :data='dataDoa'/> -->
      <div v-if="loading">
        <Loading :theme="storeTheme" />
      </div>
      <div v-else class="flex">
        <div class="container" :class="bgId">
          <div class="item" v-for="blog in blogs" :key="blog._id">
            <div class="box" :style="{ boxShadow: storeTheme.boxShadow }">
              <div class="content items-center">
                <img class="banner" :src="blog.banner" />
                <p class="font-arabic text-3xl">{{blog.title}}</p>
                <p class="my-4 text-left" v-html="blog.body"></p>
                <hr class="garis"/>
                <!-- <p class="arti text-lg"><i>{{doa.translation_id}}</i></p> -->
              </div>
            </div>
          </div>
        </div>
        <div class="footer"></div>
      </div>
    </div>
  </span>
</template>


<script>
import axios from 'axios'
import { ref, computed, useContext } from '@nuxtjs/composition-api'
import MainCardComp from '~/components/blog/MainCardComp.vue'
import Navbar from '~/components/Navbar.vue'

export default {
  name: 'Editor',
  components: {
    MainCardComp,
    Navbar
  },
  setup(){
    const { app, store } = useContext()
    const blogs= ref([])
    const userInfo = ref({})
    const loadingTheme = computed(() => store.state.loadingTheme)
    const storeTheme = computed(() => store.state.theme)
    const search = ref('')
    const loading = ref(true)
    const bgId = computed(() => {
      if(storeTheme.value?.darktheme){
        return 'darkTheme'
      } else {
        return 'lightTheme'
      }
    })

    local()
    getData()
    // searchFilter(search.value)

    return {
      blogs,
      userInfo,
      loadingTheme,
      storeTheme,
      loading,
      bgId,
      getData
    }

    async function local(){
      const userInfoNB = localStorage.getItem('userInfoNB') ?
        JSON.parse(localStorage.getItem('userInfoNB')) :
        null
      userInfo.value = userInfoNB
    }


    async function getData(){
      try{
        const url = `https://vercel-be-v2.vercel.app/api/v1/blog`
        const result = await axios.get(`${url}`);
        blogs.value = result.data
        console.log('result', result.data)
        loading.value = false
      }catch(err){
        console.log(err)
      }
    }

  }
}
</script>

<style lang="postcss" scoped>
img.banner{
  width: 100%;
}
@font-face {
  font-family: "lpmq";
  src: url(/fonts/lpmq.otf) format("opentype");
  font-display: swap;
}
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
.font-arabic{
  font-family: "lpmq", Arial, sans-serif;
  line-height: 2;
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

.main {
  @apply pt-16 min-h-screen pb-8 mt-8 px-16;
  justify-content: center;
  align-self: center;
}

.item {
  @apply px-2;
}

.garis {
  border-top-width: 2px;
  padding-bottom: 10px;
}
.arti {
  position: relative;
}
.content {
  max-width: 80%;
}

.container {
  position: relative;
  max-width: 100%;
  display: grid;
  /* grid-template-columns: repeat(auto-fill, minmax(40%, 1fr)); */
  grid-template-columns: repeat(auto-fill, minmax(30%, 1fr));
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
}


/* .container .box img {
  position: relative;
  max-width: 50px;
  margin-bottom: 10px;
} */

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

.footer {
  height: 70px;
}

@screen tablet {
.container {
    grid-template-columns: repeat(auto-fill, minmax(30%, 1fr));
  }
}
@screen mobile {
  .main {
    @apply pt-10 px-2;
  }
  .container {
    grid-template-columns: repeat(auto-fill, minmax(40%, 1fr));
  }
}

@media only screen and (max-width: 420px) {
  .container {
    grid-template-columns: repeat(auto-fill, minmax(80%, 1fr));
  }
}
</style>