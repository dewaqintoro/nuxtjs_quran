<template>
<span >
  <Navbar />
  <div v-if="!loadingTheme" class="main text-center" :style="{ background: storeTheme.background, color: storeTheme.color }">
    <div class="">
      <div v-if="loading">
        <Loading :theme="storeTheme" />
      </div>
      <div v-else>
        <nuxt-link :to="item.route" v-for="(item, index) in dataDoa" :key="index">
          <Cardcomp class="content" :theme="storeTheme" :item="item"/>
        </nuxt-link>
      </div>
    </div>
  </div>
</span>
</template>

<script>
import { computed, ref, useAsync, useContext } from '@nuxtjs/composition-api'
import Navbar from '~/components/Navbar.vue'
import Loading from '@/components/Loading.vue'
import dataJson from '~/data/myindex.json'
import Cardcomp from '@/components/GlobalCardComp'

export default {
  name: 'Ngodingbentar',
  components: {
    Navbar,
    Loading,
    Cardcomp,
  },
  setup(_, {emit}){
    const { app, store } = useContext()
    const dataDoa = dataJson.data
    const loadingTheme = computed(() => store.state.loadingTheme)
    const loading = ref(true)
    const storeTheme = computed(() => store.state.theme)

    setLoading()

    return {
      storeTheme,
      loadingTheme,
      loading,
      dataDoa,
      cek,
    }

    function setLoading(){
      setTimeout(function () {
        loading.value = false
      }, 200);
    }

    async function cek(search){
      console.log('dew', search)
    }

  }
}
</script>

<style lang="postcss" scoped>
.darkTheme{
  /* color: rgb(61, 81, 94); */
  .card:hover{
    background: rgb(61, 81, 94);
  }
}
.lightTheme{
  .card:hover {
    background: #f1f1f1;
  }
}
.main {
  @apply pt-24 min-h-screen pb-8 px-40;
}

.content {
  @apply my-8;
}
.item {
  @apply px-8 mx-36 my-4;
}
.card {
  @apply text-3xl p-4 rounded-lg;
}
@screen tablet {
  .main {
    @apply pt-28;
  }
}
@screen mobile {
  .main {
    @apply pt-20 px-8;
  }
  .item {
    @apply mx-2 px-2;
  }
}
</style>