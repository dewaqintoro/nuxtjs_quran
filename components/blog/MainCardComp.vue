<template>
  <div>
    <h1>{{blog.title}}</h1>
  </div>
</template>

<script>
import { computed, ref, useAsync, useContext } from '@nuxtjs/composition-api'
export default {
  name: 'SearchNewComp',
  components: {
  },
  props: {
    blog: {
      type: Object,
      required: false,
      default: {},
    }
  },
  setup(props, {emit}){
    return {
      cek
    }

    function cek(){
      console.log('props', props)
    }

  }
}
</script>
<style lang="postcss" scoped>
</style>