<template>
  <div :style="{ background: classObject.background, color: classObject.color }">
    <header class="body-font">
      <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a class="flex order-first lg:order-none lg:w-2/5 title-font font-medium items-center lg:items-center lg:justify-center mb-4 md:mb-0">
        <!-- <spam>
          <img class="logo" src="/logo.png" />
        </spam> -->
          <span class="text-xl w-full">
            <nuxt-link to="/">Home</nuxt-link>
          </span>
          <!-- <span class="ml-3 text-xl">Cek Ongkir</span> -->
        </a>
      </div>
    </header>
  </div>
</template>

<script>

export default {
  name: 'Navbar',
  props: {
    classObject: {
      type: Object,
      required: true,
    },
  },
  setup(props){
    console.log(props.classObject)
  }
}
</script>

<style lang="postcss" scoped>

</style>