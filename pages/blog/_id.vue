<template>

  <span>
    <Navbar route="/blog" />
    <div class="main" v-if="!loadingTheme" :style="{ background: storeTheme.background, color: storeTheme.color, boxShadow: storeTheme.boxShadow }">
      <div v-if="loading">
        <Loading :theme="storeTheme" />
      </div>
      <div v-else>
        <div class="container rounded-lg p-8" :class="bgId" :style="{ boxShadow: storeTheme.boxShadow }">
          <div>
            <p class="font-bold text-3xl">{{blog.title}}</p>
            <p class="text-left">{{blog.createdAt.substring(0, 10)}} - Ngodingbentar</p>
          </div>
          <div class="blog-body mt-8">
            <div class="blog-img">
              <img :src="blog.banner" />
            </div>
            <p class="mt-8" v-html="blog.body"></p>
          </div>
          <button @click="backToTop" class="btn-totop text-3xl my-4 focus:outline-none">
            <font-awesome-icon :icon="['fas', 'arrow-up']" />
            <!-- <p>dew</p> -->
          </button>
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
    const { route, store, app } = useContext()
    const idParams = route.value?.params?.id
    const blog= ref({})
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

    getData()

    if (process.browser){
      window.smoothscroll = () => {
        let currentScroll = document.documentElement.scrollTop || document.body.scrollTop
        if (currentScroll > 0) {
          window.requestAnimationFrame(window.smoothscroll)
          window.scrollTo(0, Math.floor(currentScroll - (currentScroll / 5)))
        }
      }
    }

    return {
      blog,
      userInfo,
      loadingTheme,
      storeTheme,
      loading,
      bgId,
      getData,
      backToTop
    }

    function backToTop(){
      window.smoothscroll()
    }


    async function getData(){
      try{
        const url = `https://vercel-be-v2.vercel.app/api/v1/blog/${idParams}`
        const result = await axios.get(`${url}`);
        blog.value = result.data
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
.btn-totop{
  display: flex;
  margin-left: auto;
}
img.banner{
  width: 100%;
  @apply rounded-xl ;
}

.blog-img{
  justify-content: center;
  justify-items: center;
  display: flex;
  margin: auto;
  /* text-align: center; */
}

.blog-body p{
  font-weight: 400;
  line-height: 1.6em;
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
  max-width: 95%;
}


.footer {
  height: 70px;
}

@screen tablet {
}
@screen mobile {
  .main {
    @apply pt-10 px-2;
  }
}

@media only screen and (max-width: 420px) {
}
</style>