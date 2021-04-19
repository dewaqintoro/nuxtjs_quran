<template>
  <div id="app">
    <input type="text" v-model="search">
    <div v-for="post in filteredPosts" :key="post.index">
      <post :post="post"></post>
    </div>
  </div>
</template>

<script>
import Post from "~/components/quran/Post";
import json from '~/data/surah-info.json'

export default {
  name: "App",
  components: {
    Post
  },
  data() {
    return {
      search: "",
      posts1: [
        {
          translation: "Pembukaan",
          arabic: "الفاتحة",
          latin: "Al-Fatihah",
          ayah_count: 7,
          index: 1,
        },
        {
          translation: "Sapi",
          arabic: "البقرة",
          latin: "Al-Baqarah",
          ayah_count: 286,
          index: 2,
        }
      ],
      posts: json
    };
  },
  methods: {
    getAllSurah(){
      const resp = import('~/data/surah-info.json')
      // console.log('res', resp.surah_info)
      return resp.surah_info
    }
  },
  computed: {
    filteredPosts() {
      if(this.posts){
        console.log('this.posts', this.posts.surah_info)
        return this.posts.surah_info.filter(post =>
          post.latin.toLowerCase().includes(this.search.toLowerCase())
        );
      }else {
        console.log('belum')
      }
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
