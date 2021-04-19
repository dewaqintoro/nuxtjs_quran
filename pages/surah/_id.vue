<template>
  <div class="main font-arabic" :style="{ background: theme.background, color: theme.color }">
    <Navbar :theme="theme" />
    <!-- <button @click="cek()">cek</button> -->
    <div v-if="!loading" class="mt-8">
      <Headerquran :surah="surah" />
      <div class="text-center flex justify-center">
        <div>
          <div>Terjemahan</div>
          <div class="flex text-center justify-center">
            <div>Off</div>
            <label class="switch">
              <input type="checkbox" @change="update($event)" />
              <span class="slider round"></span>
            </label>
            <div>On</div>
          </div>
        </div>
        <button @click="deleteWidget()">
          Delete
        </button>
        <!-- <div>
          <div>Terjemahan</div>
          <div class="flex text-center justify-center">
            <div>Off</div>
            <label class="switch">
              <input type="checkbox" @change="update($event)" />
              <span class="slider round"></span>
            </label>
            <div>On</div>
          </div>
        </div> -->
      </div>
      <div class="item"  v-for="(surat, index) in surah.text" :key="surat.index">
        <Cardcomp
        :index="index"
        :surat="surat"
        :surah="surah"
        :arti="surah.translations.id.text[index]"
        />
      </div>
        
    </div>
    <div v-else>
      <Loading />
    </div>
    <Transition name="drawer">
      <Setting v-if="isDeleteWidget" @close="closeModal" />
    </Transition>
  </div>
</template>
<script>
import { ref, useAsync, useContext, computed } from '@nuxtjs/composition-api'
import Headerquran from '~/components/quran/Headerquran.vue'
import Cardcomp from '~/components/quran/Cardcomp.vue'
import Navbar from '~/components/quran/Navbar.vue'
import Loading from '~/components/quran/Loading.vue'

export default {
  name: 'Surah',
  components: {
    Headerquran,
    Navbar,
    Cardcomp,
    Loading
  },
  setup(){
    const { route, store, app } = useContext()
    const idParams = route.value?.params?.id
    const surah = ref({})
    const theme = app.$cookies.get('theme')
    const loading = ref(true)
    const langganan = ref('Bulan')
    const isDeleteWidget = ref(false)

    getSurah()

    return {
      surah,
      theme,
      loading,
      isDeleteWidget,
      cek,
      update,
      closeModal,
      deleteWidget
    }

    function closeModal() {
      isDeleteWidget.value = false
    }

    function deleteWidget() {
      isDeleteWidget.value = true
      // emit('delete', item)
    }

    function update(e) {
      if (e.srcElement.checked === true) {
        langganan.value = 'Tahun'
      } else {
        langganan.value = 'Bulan'
      }
    }

    async function getSurah(){
      setTimeout(async function () {
        const resp = await import(`~/data/surah/${idParams}.json`)
        surah.value = resp[idParams]
        loading.value = false
      }, 1000);
    }

    async function cek(){
      console.log(surah.value);
      console.log('theme', theme);
    }

    
  }
}
</script>

<style lang="postcss" scoped>
.main {
  min-height: 100vh;
}
@font-face {
  font-family: "lpmq";
  src: url(/fonts/lpmq.otf) format("opentype");
  font-display: swap;
}

html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

.font-arabic{
  font-family: "lpmq", Arial, sans-serif;
  line-height: 2;
}

.item {
  @apply px-8 mx-36 my-8;
}

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

@screen mobile {
  .item {
    @apply mx-2 px-2;
  }
}
</style>