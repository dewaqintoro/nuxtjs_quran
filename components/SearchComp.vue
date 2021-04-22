<template>
  <div class="search flex text-center">
    <input class="input-search focus:outline-none" :style="{ boxShadow: storeTheme.boxShadow }" id="username" type="search" v-model="search" placeholder="Cari Surah. . .">

    <button @click="searchFilter()" class="btn-search focus:outline-none" :style="{ boxShadow: storeTheme.boxShadow }" type="button">
      Cari
    </button>
  </div>
</template>

<script>
import { computed, ref, useAsync, useContext } from '@nuxtjs/composition-api'
export default {
  name: 'SearchComp',
  components: {
  },
  setup(_, {emit}){
    const { app, store } = useContext()
    const storeTheme = computed(() => store.state.theme)
    const search = ref('')

    return {
      search,
      storeTheme,
      cek,
    }
    async function cek(){
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

.input-search {
  @apply appearance-none border rounded-lg py-2 px-8 text-gray-700 leading-tight;
}
.btn-search {
  @apply text-white font-bold py-2 px-4 rounded-lg ml-4;
  /* background-color: #4497eb; */
  background-color: #115394;
}
.btn-search:hover {
  /* background-color: #2187ec; */
  background-color: #1b63ac;

}

@screen tablet {
}
@screen mobile {
  .input-search {
    @apply my-2;
  }
  .btn-search {
    @apply my-2;
  }
  .input-search {
    @apply px-4;
  }
}
</style>