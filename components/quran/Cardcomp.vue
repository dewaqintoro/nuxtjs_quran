<template>
  <div class="card">
    <div class="flex">
      <div class="idSurah">{{index}}</div>
      <!-- <button @click="cek()">cek</button> -->
      <div class="nameSurah">
        <p class="text-right text-3xl">{{surat}}</p>
        <div class="text-left mt-4 text-xl">
          <p class="font-bold">Terjemahan :</p>
          <p>{{arti}}</p>
          <!-- <p>{{surah.translations.id.text[index]}}</p> -->
          <!-- <p>https://quran.kemenag.go.id/cmsq/source/s01/00{{surah.number}}00{{index}}.mp3</p> -->
          <div>
            <audio controls class="my-audio">
              <source :src="urlAudio" type="audio/ogg">
              <source :src="urlAudio" type="audio/mpeg">
              Your browser does not support the audio element.
            </audio>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, useAsync } from '@nuxtjs/composition-api'

export default {
  name: 'Cardcomp',
  props: {
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
    // console.log(props.arti)
    const sumAyat = props.surah?.number
    const sumIndex = props.index
    const idSurah = ref('')
    const idAyat = ref('')
    

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
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.15);
  .idSurah {
    @apply text-center;
    width: 50px;
  }
  .nameSurah {
    @apply px-4 w-full;
  }
}

.card:hover {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.20);
}

.my-audio{
  max-width: 70%;
}
</style>