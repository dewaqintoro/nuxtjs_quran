<template>
  <AppModal title="" :show-header="false" :size="size" @close="$emit('close')">
    <div class="containerCustom" :style="{ background: theme.background, color: theme.color }">
      <div class="wrapper">


        <div class="flex justify-between">
          <div class="text-xl">Terjemahan</div>
          <div class="flex justify-center">
            <label class="switch">
              <input type="checkbox" @change="update($event)" />
              <span class="slider round"></span>
            </label>
          </div>
        </div>
        <div>
          <div class="text-center py-4">
            <button @click="modeTheme()" class="focus:outline-none ">
              change
              <!-- <font-awesome-icon class="iconTheme" :icon="['fas', iconTheme]" /> -->
            </button>
          </div>
        </div>

        <div class="flex mt-6">
          <div class="flex buttom">
            <!-- <button
              class="btn cancel text-black font-bold py-2 px-4 focus:outline-none mr-1"
              @click="$emit('close')"
            >
              Kembali
            </button> -->
          </div>
          <div class="w-full buttom" align="right">
            <button
              @click="$emit('close')"
              class="btn save text-white font-bold py-2 px-4 focus:outline-none"
            >
              Kembali
            </button>
          </div>
        </div>
      </div>
    </div>
  </AppModal>
</template>

<script lang="ts">
import { defineComponent, ref, useAsync, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Setting',
  props: {
    theme: {
      type: Object,
      required: true,
    },
  },
  setup(_, { emit }) {
    const { app, store } = useContext()
    const isLoading = ref(true)
    const size = ref('small')
    const iconTheme = ref()
    const theme = ref({})

    return {
      size,
      isLoading,
      doDelete,

      iconTheme,
      modeTheme
    }

    async function doDelete() {
    }

    async function modeTheme(){
      const data = app.$cookies.get('theme')
      emit('changetheme')
      if(data.darktheme){
        const classObject= ref({
          'darktheme': false,
          'background': 'white',
          'color': 'black',
        })
        setCookie(classObject)
      } else {
        const classObject= ref({
          'darktheme': true,
          'background': '#1d2d50',
          'color': 'white',
        })
        setCookie(classObject)
      }
      
    }

    function setCookie(data){
      app.$cookies.set('theme', data.value, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7
      })
      getCookie()
    }

    function getCookie(){
      const data = app.$cookies.get('theme')
      theme.value = data
      console.log('dataas', data)
      // if(data?.darktheme){
      //   iconTheme.value = 'moon'
      // } else {
      //   iconTheme.value = 'sun'
      // }
    }
  },
})
</script>

<style lang="postcss" scoped>
.switch {
  @apply mx-2;
  position: relative;
  display: inline-block;
  width: 48px;
  height: 21.76px;
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider::before {
  position: absolute;
  content: '';
  height: 16.64px;
  width: 16.64px;
  left: 3.20px;
  bottom: 3.20px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}
.round {
  border-radius: 21.76px;
}
.round::before {
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #1f2937;
}

input:focus + .slider {
  box-shadow: 0 0 1px #1f2937;
}

input:checked + .slider::before {
  -webkit-transform: translateX(24px);
  -ms-transform: translateX(24px);
  transform: translateX(24px);
}



.containerCustom {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  .wrapper {
    @apply w-full;
    /* max-width: 550px; */
    @apply px-4 py-8;
    .title {
      color: #111827;
      /* font-size: 32px; */
      /* font-family: Inter; */
      font-style: normal;
      font-weight: 600;
      font-size: 18px;
      line-height: 120%;
      margin-bottom: 12px;
    }
    .text {
      /* font-family: Circular Std; */
      font-style: normal;
      font-weight: 450;
      font-size: 16px;
      line-height: 150%;
    }
    .cancel {
      background: white;
    }
    .save {
      background: #1f2937;
      box-shadow: 0.1px 2px 6px rgba(0, 0, 0, 0.16);
      border-radius: 6px;
    }
  }
}
</style>
