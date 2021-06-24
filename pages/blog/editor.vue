<template>
<div>
  <button @click="cek">cek</button>
  <vue-editor v-model="series">dew</vue-editor>
</div>
</template>

<script>
import axios from 'axios'
import { ref} from '@nuxtjs/composition-api'

export default {
  name: 'Editor',
  components: {
  },
  setup(){
    const series= ref('data')

    return {
      series,
      cek
    }

    async function cek(){
      // const url = `https://api.myquran.com/v1/sholat/jadwal/1609/2021/05`
      // const data = await axios.get(`${url}`);
      console.log('series', series.value)
    }

  }
}
</script>
