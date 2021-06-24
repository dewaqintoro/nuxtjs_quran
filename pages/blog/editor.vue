<template>
<div>
  <button @click="cek">cek</button>
  

  <div>
    <label>Title</label>
    <input
      type="text"
      v-model="values.title"
    />
  </div>

  <div>
    <label>Kategori</label>
    <select v-if="categories" v-model="selected" @change="seleckProv()" name="top" id="top" class="focus:outline-none">
      <option value="NASIONAL">--Pilih Kategori--</option>
      <option v-for="(item, index) in categories" :key="index" :value="item.name">{{item.name}}</option>
    </select>
  </div>

  <div>
    <label htmlFor="imageFile">Banner</label>
    <input
      type="file"
      id="imageFile"
      label="Choose Image"
      @change="uploadFileHandler"
    />
  </div>
  <p>{{myimg}}</p>

  <vue-editor v-model="values.body"></vue-editor>
  <!-- <vue-editor id="editor" useCustomImageHandler @imageAdded="handleImageAdded" v-model="body"> </vue-editor> -->
  <button @click="submit">submit</button>
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
    const title = ref('title')
    const body = ref('body')
    const userInfo = ref({})
    const categories = ref({})
    const myimg = ref('')
    const selected = ref('MERN')
    

    const values = ref({
      title: 'Title',
      banner: '',
      body: 'Data',
    })

    local()
    getCategory()

    return {
      title,
      body,
      myimg,
      values,
      categories,
      selected,
      seleckProv,
      cek,
      uploadFileHandler,
      submit
    }

    function seleckProv(){
      console.log(selected.value)
    }

    async function getCategory(){
      const url = `https://vercel-be-v2.vercel.app/api/v1/category`
      const result = await axios.get(`${url}`);
      categories.value = result.data
      console.log('result', result)
    }

    async function submit(){
      // console.log('decodedText', values.value.body.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&'))
      const bodyEncode = values.value.body.replace(/&lt;/g,'<').replace(/&gt;/g,'>')
      
      const newValues = ref({
        title: values.value.title,
        banner: values.value.banner,
        category: selected.value,
        body: bodyEncode
      })
      try{
        const url = `https://vercel-be-v2.vercel.app/api/v1/blog`
        const result = await axios.post(url, newValues.value);
        if(result.data.message === 'New Blog Created'){
          values.value.title = 'Title'
          values.value.banner = '' 
          values.value.body = 'Data' 
        }
      }catch(err){
        console.log(err)
      }
    }

    async function uploadFileHandler(e){
      const file = e.target.files[0];
      const userInfoNB = localStorage.getItem('userInfoNB') ?
        JSON.parse(localStorage.getItem('userInfoNB')) :
        null

      if(file){
        if(file.size < 500000){
          const bodyFormData = new FormData();
          bodyFormData.append('image', file);
          axios
            .post('https://ap-v3.herokuapp.com/api/uploads/s3', bodyFormData, {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${userInfoNB.token}`,
              },
            })
            .then((response) => {
              myimg.value =response.data
              values.value.banner = response.data
            })
            .catch((err) => {
              console.log(err.message);
            });
        } else {
          alert('lebih besar 500kb')
        }
      }
    }

    async function cek(){
      // const url = `https://api.myquran.com/v1/sholat/jadwal/1609/2021/05`
      // const data = await axios.get(`${url}`);
      console.log('values', values.value)
    }

    async function local(){
      const userInfoNB = localStorage.getItem('userInfoNB') ?
        JSON.parse(localStorage.getItem('userInfoNB')) :
        null
      userInfo.value = userInfoNB
    }

  }
}
</script>
