<template>
  <div class="card" :style="{ background: theme.background, color: theme.color, boxShadow: theme.boxShadow  }">
    <div>
      <div class="nameSurah">
          <div class="idSurah" :class="bgId" :style="{ boxShadow: theme.boxShadow  }">
            <button @click="cek()">cek</button>
            <p>{{surat[0]}}</p>
          </div>
          <p>{{idAyat}} - {{audio.value}}</p>
          <div class="surat">
            <p>{{surat[1]}}</p>
          </div>
        <div v-if="subStore === 'On'" class="text-left mt-4 text-xl">
          <p class="font-bold">Terjemahan :</p>
          <p>{{arti}}</p>
        </div>
        
        <div class="mt-4 bg-red-100">
          <!-- <audio controls preload class="my-audio">
            <source :src="audio.value" type="audio/ogg">
            <source :src="audio.value" type="audio/mpeg">
            Your browser does not support the audio element.
          </audio> -->
          <audio :src="audio.value" controls></audio>
          <audio class="audio">
            <source :src="audio.value" type="audio/mpeg">
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
      type: Array,
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
      type: Number,
      required: true,
    },
    audio: {
      type: Object,
      required: true,
    },
  },
  setup(props){
    
    const { route, store, app } = useContext()
    const sumAyat = props.surah?.number
    const sumIndex = props.surat[0]
    const idSurah = ref('')
    const idAyat = ref('')
    const subStore = computed(() => store.state.sub)
    const audioStore = computed(() => store.state.audio)
    const loadingAudio = computed(() => store.state.loadingAudio)

    // const dew = computed(() => {
    //   if(props.audio){
    //     return props.audio
    //   } else {
    //     return 'tidak'
    //   }
    // })
    const bgId = computed(() => {
      if(props.theme?.darktheme){
        return 'darkTheme'
      } else {
        return 'lightTheme'
      }
    })

    // if(props.audio !== idAyat.value){
    //   console.log('tidak sama')
    // } else {
    //   console.log('sama')
    // }

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
    // const urlAudio = ref(`https://quran.kemenag.go.id/cmsq/source/s01/${idSurah.value}${idAyat.value}.mp3`)
    const urlAudio = computed(() => idSurah.value)
    return {
      bgId,
      urlAudio,
      subStore,
      loadingAudio,
      idAyat,
      audioStore,
      cek,
    }

    function cek(){
      console.log('props',props.audio.value)
      console.log('urlAudio',urlAudio.value)
    }
  }
}
</script>
<style lang="postcss" scoped>
.card {
  @apply px-4 pb-4 pt-8 rounded-lg my-8;
  /* box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.15); */
  .idSurah {
    @apply items-center justify-center flex font-bold rounded-full;
    width: 45px;
    height: 45px;
  }
  .nameSurah {
    @apply px-4 w-full;
  }
}
.card:hover {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.20);
}
.surat {
  @apply ml-16 text-right text-3xl;
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
  .idSurah {
    @apply text-sm;
    width: 30px;
    height: 30px;
  }
}
</style>