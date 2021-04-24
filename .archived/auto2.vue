<template>
  <div class="flex flex-col items-center">
    <div class="absolute inset-0 z-0" @click="modal = false" ></div>
    <input type="text" class="bg-gray-300 px-4 py-2 z-10" autocomplete="off" v-model="search" @focus="modal = true" />
    <div v-if="filteredStates && modal" class="z-10 absolute mt-8">
      <ul class="w-48 bg-gray-800 text-white">
        <li v-for="(filter, index) in filteredStates" class="py-2 border-b cursor-pointer" @click="setState(filter)" :key="index">{{filter}}</li>
      </ul>
    </div>
    <hr/>
    <div v-if="filteredStates" class="z-1 mt-16">
      <ul class="w-48 bg-gray-800 text-white">
        <li v-for="(filter, index) in filteredStates" class="py-2 border-b cursor-pointer" @click="setState(filter)" :key="index">{{filter}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { computed, ref, useAsync, useContext, watch } from '@nuxtjs/composition-api'
// import Navbar from '~/components/Navbar.vue'
export default {
  name: 'Auto',
  components: {
    // Navbar,
  },
  setup(_, {emit}){
    const { app, store } = useContext()
    const dataItem= [
        {id: '1', Game: 'Football'},
        {id: '2', Game: 'Baseball'},
        {id: '3', Game: 'Volleyball'},
        {id: '4', Game: 'Badminton'},
      ]
    const search = ref('')
    const states = ref([
      'florida', 'alabama', 'alaska', 'texas'
    ])
    const modal = ref(false)
    let filteredStates = ref([])
    const dataFields= {value: 'Game'}
    filterStates()

    watch(search, () => {
      filterStates()
    })

    return {
      dataItem,
      search,
      modal,
      dataFields,
      filterStates,
      filteredStates,
      setState
    }

    function filterStates(){
      // if(search.value.length == 0){
      //   filteredStates = states.value
      // }
      filteredStates.value = states.value.filter(item => {
        return item.toLowerCase().startsWith(search.value.toLowerCase())
      })
    }
    function setState(data){
      search.value = data
      modal.value = false
    }
  }
}
</script>
<style>
</style>
