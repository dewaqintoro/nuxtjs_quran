<template>
  <div>
    <div class="container">
      <div class="wrapper">
        <div class="flex">
          <div class="w-1/2">
            <p class="mt-2 ml-2">
              Tentang <br />
              Kita
            </p>
          </div>
        </div>
        <form class="form">
          <div class="field mb-2">
            <input
              v-model="values.email"
              class="input focus:outline-none"
              placeholder="Email..."
              type="email"
              aria-label="Email"
            />
            <p class="label">Email</p>
          </div>
          <div class="field">
            <input
              v-model="values.password"
              class="input focus:outline-none"
              placeholder="Password..."
              type="password"
              aria-label="Password"
              @keyup.enter="login"
            />
            <p class="label">Password</p>
          </div>
        </form>
        <div>
          <button class="signin mt-4 focus:outline-none" @click="login">Masuk</button>
        </div>
        <div>
          <label htmlFor="imageFile">Image File</label>
          <input
            type="file"
            id="imageFile"
            label="Choose Image"
            @change="uploadFileHandler"
          />
        </div>
        <p>{{myimg}}</p>
        
      </div>
    </div>
  </div>
</template>
<script>
import { ref, useContext, computed } from '@nuxtjs/composition-api'
import axios from 'axios'

export default {
  name: 'SignIn',
  setup() {
    const { store, route } = useContext()
    const email = ref('')
    const password = ref('')
    const myimg = ref('')
    


    const values = ref({
      email: 'dew',
      password: 'ssss',
    })

    return { login, values, email, password , myimg, uploadFileHandler}

    async function login() {
      try{
        const url = `https://ap-v3.herokuapp.com/api/users/signin`
        const result = await axios.post(url, values.value);
        if(result.status === 200){
          console.log('berhasil', result.data)
          localStorage.setItem('userInfoNB', JSON.stringify(result.data));
        }
      }catch(err){
        console.log(err)
      }
    }

    async function uploadFileHandler(e){
      // console.log(e.target.files[0])
      const file = e.target.files[0];
      const userInfoNB = localStorage.getItem('userInfoNB') ?
        JSON.parse(localStorage.getItem('userInfoNB')) :
        null

      // console.log('userInfoNB', userInfoNB)
      if(file){
        console.log(file.size)
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
            })
            .catch((err) => {
              console.log(err.message);
            });
        } else {
          alert('lebih besar 500kb')
        }
      }
    }
  },
}
</script>

<style lang="postcss" scoped>
.header {
  color: #00db65;
}

.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .wrapper {
    max-width: 400px;
    @apply px-4 py-8;
    .logo {
      justify-content: right;
      align-items: right;
    }
    .form {
      @apply mt-8;
      .field {
        @apply mb-10;
        .input {
          background: #f9fafb;
          padding: 11px;
          width: 400px;
        }
        .label {
          width: 105%;
          text-align: right;
          justify-content: right;
          align-items: right;
          font-size: 10px;
          margin-top: -40px;
          color: #9ca3af;
          @apply right-0;
        }
      }
    }
    .signin {
      color: #00873e;
      background: #00db65;
      /* font-family: Inter; */
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 100%;
      box-shadow: 0.1px 2px 6px rgba(0, 0, 0, 0.16);
      border-radius: 6px;
      @apply px-6 py-3;
    }
  }
}
</style>
