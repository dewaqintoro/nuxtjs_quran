<template>
  <div>
    <nuxt-link to="/short">short</nuxt-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Index',
  setup() {
    // const { redirect } = useContext()
    //   redirect('/agama/al-quran')
  },
})
</script>
