<template>
  <VueFuse :keys="keys" :list="bikes" :defaultAll="false" />
</template>

<script>
import VueFuse from 'vue-fuse'
export default {
  components: {
    VueFuse,
  },
  data () {
    return {
      bikes: [
        {
          brand: "Schwinn",
          model: {
            name: "Classic",
            id: "1345"
          }
        },
        {
          brand: "Red Line",
          model: {
            name: "Flight",
            id: "5430"
          }
        },
        {
          brand: "Hoffman",
          model: {
            name: "Condore",
            id: "0543"
          }
        },
        {
          brand: "Tribe",
          model: {
            name: "CRMO",
            id: "0432"
          }
        }
      ],
      opts: {
        keys: ["brand", "model.name", "model.id"]
      }
    }
  }
}
</script>