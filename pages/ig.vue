<template>
<div class="min-h-screen">
  <img src="https://instagram.fsub3-2.fna.fbcdn.net/v/t51.2885-15/e35/190041757_773774123342047_4165319150335122909_n.jpg?tp=1&_nc_ht=instagram.fsub3-2.fna.fbcdn.net&_nc_cat=107&_nc_ohc=1_hXH0NCAr8AX_kDRt9&edm=AABBvjUBAAAA&ccb=7-4&oh=5b743377f6b3bd2bbb9f398dcd986516&oe=60B29542&_nc_sid=83d603" />
</div>
</template>

<script>
import { computed, ref, useAsync, useContext } from '@nuxtjs/composition-api'
import Navbar from '~/components/GlobalNavbar'

import axios from 'axios'
export default {
  name: 'Shorten',
  components: {
    Navbar
  },
  setup(){
    const means = ref([])
    const lema = ref('')
    const loading = ref(false)
    const search = ref('')
    const myTheme = {
      background: '#8854d0',
      color: 'white',
      boxShadow:  '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    }

    return {
      means,
      lema,
      search,
      loading,
      myTheme,
      searchFilter,
    }

    async function searchFilter(){
      loading.value = true
      const url = `https://kbbi-api-zhirrr.vercel.app/api/kbbi?text=${search.value}`
      const result = await axios.get(url);
      if(result?.data){
        loading.value = false
      }
      means.value = result?.data?.arti
      lema.value = result?.data?.lema
    }

  }
}
</script>

<style lang="postcss" scoped>
.section {
  @apply flex w-full;
  padding-top: 100px;
  /* background: #00b894; */
}

.main {
  /* background: #0edfb5; */
  @apply text-center mx-auto w-full;
  max-width: 60vw;
}

.means {
  max-width: 60vw;
  @apply pt-4 mx-auto text-center 
}

.head {
  @apply text-4xl font-bold;
}

.search {
  @apply mt-8 text-xl flex text-center;
}

.input-search {
  @apply appearance-none border py-2 px-4 w-full text-gray-700 leading-tight rounded-l-lg;
}
.btn-search {
  background-color: #8854d0;
  @apply text-white font-bold py-2 px-4 rounded-r-lg;
}
.btn-search:hover {
  background-color: #7b41cc;

}

.section-loader {
  height: 35px;
  /* background: blanchedalmond; */
}
.loader {
  margin: auto;
  border: 5px solid #f3f3f3;
  border-radius: 50%;
  border-top: 5px solid #3498db;
  width: 30px;
  height: 30px;
  -webkit-animation: spin 0.8s linear infinite; /* Safari */
  animation: spin 0.8s linear infinite;
}

/* Safari */
@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}


@screen tablet {
}
@screen mobile {
  .main,.means {
    max-width: 80vw;
  }
  .input-search {
    @apply my-2 text-lg;
  }
  .btn-search {
    @apply my-2 text-lg font-semibold;
  }
  .input-search {
    @apply px-4;
  }
}
</style>