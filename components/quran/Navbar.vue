<template>
  <div class="bg-white">
    <header class="text-gray-600 body-font">
      <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a class="flex order-first lg:order-none lg:w-2/5 title-font font-medium items-center text-gray-900 lg:items-center lg:justify-center mb-4 md:mb-0">
        <!-- <spam>
          <img class="logo" src="/logo.png" />
        </spam> -->
          <span class="ml-3 text-xl w-full">
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
  setup(){
  }
}
</script>

<style lang="postcss" scoped>

</style>