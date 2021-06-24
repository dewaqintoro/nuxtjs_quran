<template>
<div>
  <button @click="getData">getData</button>
  <p>{{userInfo}}</p>
  <!-- <div>{{series}}</div> -->
  <span v-for="serie in series" :key="serie._id">
    <span v-html="serie.title"></span>
    <span v-html="serie.body"></span>
  </span>
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
    const series= ref([])
    const userInfo = ref({})

    local()
    getData()

    return {
      series,
      userInfo,
      getData
    }

    async function local(){
      const userInfoNB = localStorage.getItem('userInfoNB') ?
        JSON.parse(localStorage.getItem('userInfoNB')) :
        null
      userInfo.value = userInfoNB
    }


    async function getData(){
      try{
        const url = `https://vercel-be-v2.vercel.app/api/v1/blog`
        const result = await axios.get(`${url}`);
        series.value = result.data
        console.log('result', result.data)
      }catch(err){
        console.log(err)
      }
    }

  }
}
</script>
