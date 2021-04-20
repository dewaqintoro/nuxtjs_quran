<template>
  <div :style="{ background: theme.background, color: theme.color }">
    <header class="body-font">
      <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a class="flex order-first lg:order-none lg:w-2/5 title-font font-medium items-center lg:items-center lg:justify-center mb-4 md:mb-0">
        <!-- <spam>
          <img class="logo" src="/logo.png" />
        </spam> -->
          <span class="text-2xl w-full">
            <nuxt-link to="/">Home</nuxt-link>
          </span>
        </a>
          <font-awesome-icon class="iconTheme" :icon="['fas', 'cog']" />
      </div>
    </header>
  </div>
</template>

<script>
import { computed, ref, useAsync, useContext } from '@nuxtjs/composition-api'

export default {
  name: 'Navbar',
  props: {
    theme: {
      type: Object,
      required: true,
    },
  },
  setup(){
    const { store, app } = useContext()
    // const theme = computed(() => store.state.theme)
    // const theme = app.$cookies.get('theme')


    // return { theme}

  }
}
</script>

<style lang="postcss" scoped>

</style>