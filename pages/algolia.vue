<template>
<span>
  <Navbar :theme="myTheme" />
  <div class="pt-16 px-8">
    <ais-instant-search :search-client="searchClient" index-name="wilayah">
      <p class="pt-8 text-center font-bold text-2xl">Algolia</p>
      <button @click="cek">cek</button>
      <ais-search-box class="pb-8 pt-4" />
      <div class="min-h-screen">
        <ais-hits>
          <div slot="item" slot-scope="{ item }">
            <!-- <h2>{{ item.city_name }}</h2> -->
            <div class="hit-city_name font-bold">
              Kota : <ais-highlight attribute="city_name" :hit="item"></ais-highlight>
            </div>
            <div class="hit-province">
              Provinsi : <ais-highlight attribute="province" :hit="item"></ais-highlight>
            </div>
          </div>
        </ais-hits>
        <div class="justify-center text-center flex py-8">
          <ais-pagination />
        </div>
      </div>
    </ais-instant-search>
  </div>
</span>
</template>

<script>
import { computed, ref, useAsync, useContext } from '@nuxtjs/composition-api'
import algoliasearch from 'algoliasearch/lite';
import 'instantsearch.css/themes/satellite-min.css';
import Navbar from '~/components/GlobalNavbar'
// import Navbar from '~/components/Navbar.vue'

export default {
  name: 'Algolia',
  components: {
    Navbar
  },
  setup(){
    const { app, store } = useContext()
    const searchClient = algoliasearch(
      process.env.algoliaAppId,
      process.env.algoliaPublicKey
    )
    const myTheme = {
      background: '#f7f7f7',
      color: 'black',
      boxShadow:  '5px 5px 12px #dedede,-5px -5px 12px #ffffff',
    }
    const storeTheme = computed(() => store.state.theme)
    return {
      searchClient,
      myTheme,
      storeTheme,
      cek
    }

    function cek(){
      // link: `${process.env.baseUrl}${route.value.fullPath}`,
      console.log(process.env.algoliaAppId)
      
    }

  }
}
</script>

<style>
</style>
