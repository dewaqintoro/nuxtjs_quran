<template>
  <div class="dew">

    <div class="item">
      <div v-for="(item, index) in globalTop200" :key="index">
        
          <div class="m-2">
            <!-- <GlobalComp :item="item" :index="index" @play="play" @pauseAudio="pauseAudio" @playAudio="playAudio" /> -->
            <p>{{item.subtitle}}</p>
          </div>
        
      </div>
    </div>

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
    globalTop200: {
      type: Array,
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

    async function play(item){
      emit('play', item)
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
/* 
.dew{
  @apply flex;
}

.item{
  margin: 10px;
  min-width: 500px;
  max-width: 800px;
} */


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