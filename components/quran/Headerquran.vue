<template>
  <div class="text-center">
    <div class="text-3xl">{{surah.name}}</div>
    <div class="text-xl">
      <p>( {{surah.name_latin}} - {{surah.translations.id.name}} )</p>
      <p>{{surah.number_of_ayah}} Ayat</p>
      <font-awesome-icon :icon="['fab', 'twitter']" />
    </div>
    
  </div>
</template>

<script>

export default {
  name: 'Headerquran',
  props: {
    surah: {
      type: Object,
      required: true,
    },
  },
  setup(props){
    console.log(props)
  }
}
</script>

<style lang="postcss" scoped>

</style>