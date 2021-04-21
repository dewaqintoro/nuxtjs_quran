<template>
  <div class="card" :style="{ background: theme.background, color: theme.color, boxShadow: theme.boxShadow  }">
    <div>
      <!-- <div class="idSurah">{{index}}</div> -->
      <!-- <button @click="cek()">cek</button> -->
      <div class="nameSurah">
        <div class="flex justify-between">
          <div class="idSurah text-xl font-bold">{{index}}</div>
          <div class="surat">{{surat}}</div>
        </div>
        <div v-if="subStore === 'On'" class="text-left mt-4 text-xl">
          <p class="font-bold">Terjemahan :</p>
          <p>{{arti}}</p>
          <!-- <p>{{surah.translations.id.text[index]}}</p> -->
          <!-- <p>https://quran.kemenag.go.id/cmsq/source/s01/00{{surah.number}}00{{index}}.mp3</p> -->
        </div>
        <div v-if="audioStore === 'On'" class="mt-4">
          <audio controls class="my-audio">
            <source :src="urlAudio" type="audio/ogg">
            <source :src="urlAudio" type="audio/mpeg">
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, useContext, computed } from '@nuxtjs/composition-api'
export default {
  name: 'Cardcomp',
  props: {
    theme: {
      type: Object,
      required: true,
    },
    surat: {
      type: String,
      required: true,
    },
    surah: {
      type: Object,
      required: true,
    },
    arti: {
      type: String,
      required: true,
    },
    index: {
      type: String,
      required: true,
    },
  },
  setup(props){
    const { route, store, app } = useContext()
    const sumAyat = props.surah?.number
    const sumIndex = props.index
    const idSurah = ref('')
    const idAyat = ref('')
    const subStore = computed(() => store.state.sub)
    const audioStore = computed(() => store.state.audio)
    if (sumAyat.length === 1){
      idSurah.value = `00${sumAyat}`
    } else if(sumAyat.length === 2){
      idSurah.value = `0${sumAyat}`
    } else {
      idSurah.value = sumAyat
    }
    if (sumIndex.length === 1){
      idAyat.value = `00${sumIndex}`
    } else if(sumIndex.length === 2){
      idAyat.value = `0${sumIndex}`
    } else {
      idAyat.value = sumIndex
    }
    const urlAudio = ref(`https://quran.kemenag.go.id/cmsq/source/s01/${idSurah.value}${idAyat.value}.mp3`)
    return {
      urlAudio,
      subStore,
      audioStore,
      cek
    }
    function cek(){
      console.log(urlAudio.value)
    }
  }
}
</script>
<style lang="postcss" scoped>
.card {
  @apply px-4 pb-4 pt-8 rounded-lg my-8;
  /* box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.15); */
  .idSurah {
    @apply items-center justify-center flex;
    width: 50px;
    height: 50px;
    /* background: url('/shape1.svg') */
    background: url('/fancy1.png');
    background-size: cover;
    background-repeat: no-repeat;
  }
  .nameSurah {
    @apply px-4 w-full;
  }
}
.card:hover {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.20);
}
.surat {
  @apply text-right text-3xl;
  line-height: 4rem !important;
}
.my-audio{
  max-width: 100%;
  height: 35px;
}
@screen mobile {
  .surat {
    @apply text-2xl;
  }
}
</style>