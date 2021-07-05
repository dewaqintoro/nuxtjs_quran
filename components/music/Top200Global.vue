<template>
    <div class="m-2">
      <span class="flex">
        <div class="number">
          <p>{{index+1}}</p>
        </div>
        <div class="btn-play">
          <button class="focus:outline-none" @click="play(item)" >
            <font-awesome-icon v-if="isPlay" :icon="['fas', 'pause']" />
            <font-awesome-icon v-else :icon="['fas', 'play']" />
          </button>
        </div>
        <nuxt-link :to="`../../track/`+item.key">
          <div class="item-title besar">
            <p v-if="item.title.length > 40" class="font-bold">{{item.title.substring(0, 40)}}</p>
            <p v-else class="font-bold">{{item.title}}</p>
            <p v-if="item.subtitle.length > 40">{{item.subtitle.substring(0, 40)}}...</p>
            <p v-else>{{item.subtitle}}</p>
          </div>
        </nuxt-link>
      </span>
    </div>
</template>

<script>
import { ref, useContext, computed } from '@nuxtjs/composition-api'
import GlobalComp from '~/components/music/GlobalComp'

export default {
  name: 'TopGlobal',
  components: {
    GlobalComp,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    }
  },
  setup(props, {emit}){
    const { route, store, app } = useContext()
    const idSurah = ref('')
    const isPlay = ref(false)

    return {
      isPlay,
      play,
      playAudio,
      pauseAudio
    }

    async function play(){
      if(isPlay.value === true){
        isPlay.value = false
        emit('pauseAudio')
      }else{
        emit('play', props.item)
        // emit('playAudio')
        isPlay.value = true
      }
    }

    function playAudio() {
      emit('playAudio')
    } 

    function pauseAudio() {
      emit('pauseAudio')
    } 

  }
}
</script>
<style lang="postcss" scoped>
.kecil{
  display: none
}

img.img-top{
  /* width: 100%; */
  max-width: 80px;
  max-height: 80px;
  border-radius: 10px;
}
.number{
  @apply justify-items-center my-auto mx-2 font-bold ;
  max-width: 10px;
}

.btn-play{
  @apply justify-items-center my-auto mx-2;
}

.item-title{
  margin-left: 10px;
  @apply my-auto justify-items-center w-full;
}

@media (max-width: 700px) {
}
@media (max-width: 500px) {
  .item{
    min-width: 400px;
    max-width: 480px;
  }
}

@media (max-width: 450px) {
  .item{
    min-width: 320px;
    max-width: 400px;
  }
}
</style>