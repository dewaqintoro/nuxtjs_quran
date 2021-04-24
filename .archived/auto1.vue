<template>
  <div style="margin:10% 25%">
    <ejs-autocomplete :dataSource='dataItem' :fields='dataFields' placeholder="search. . ." :highlight="true">

    </ejs-autocomplete>
  </div>
</template>

<script>
import { computed, ref, useAsync, useContext } from '@nuxtjs/composition-api'
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
     const dataFields= {value: 'Game'}

    return {
      dataItem,
      dataFields,
    }
  }
}
</script>
<style>
@import url(https://cdn.syncfusion.com/ej2/material.css);
</style>
