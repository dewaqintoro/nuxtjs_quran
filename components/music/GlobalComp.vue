<template>
  <span class="flex">
    <div v-if="showIndex" class="number">
      <p>{{index+1}}</p>
    </div>
    <!-- <nuxt-link :to="`music/track/`+item.key"> -->
    <nuxt-link :to="routeLink">
      <div>
        <img class="img-top" :src="item.images.coverart" alt="img" />
      </div>
    </nuxt-link>
    <div class="item-title besar">
      <p v-if="item.title.length > 40" class="font-bold">{{item.title.substring(0, 40)}}</p>
      <p v-else class="font-bold">{{item.title}}</p>
      <p v-if="item.subtitle.length > 40">{{item.subtitle.substring(0, 40)}} ...</p>
      <p v-else>{{item.subtitle}}</p>
      <button class="btn-nav focus:outline-none" @click="play(item)" >
        <font-awesome-icon v-if="isPlay" :icon="['fas', 'pause']" />
        <font-awesome-icon v-else :icon="['fas', 'play']" />
      </button>
    </div>
    <div class="item-title kecil">
      <p v-if="item.title.length > 15" class="font-bold">{{item.title.substring(0, 15)}}</p>
      <p v-else class="font-bold">{{item.title}}</p>
      <p v-if="item.subtitle.length > 15">{{item.subtitle.substring(0, 15)}} ...</p>
      <p v-else>{{item.subtitle}}</p>
      <button class="btn-nav focus:outline-none" @click="play" >
        <font-awesome-icon v-if="isPlay" :icon="['fas', 'pause']" />
        <font-awesome-icon v-else :icon="['fas', 'play']" />
      </button>
    </div>
  </span>
</template>

<script>
import { ref, useContext, computed } from '@nuxtjs/composition-api'

export default {
  name: 'GlobalComp',
  props: {
    item: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    routeLink: {
      type: String,
      required: true,
      default: '/'
    },
    showIndex: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  setup(props, {emit}){
    const { route, store, app } = useContext()
    const idSurah = ref('')
    const isPlay = ref(false)

    return {
      isPlay,
      play
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
  @apply justify-items-center my-auto mx-2;
  max-width: 10px;
}

.item-title{
  margin-left: 10px;
  @apply my-auto justify-items-center w-full;
}


@media (max-width: 700px) {
}
@media (max-width: 500px) {
}

@media (max-width: 450px) {

  .besar{
    display: none;
  }
  .kecil{
    display: block;
  }
}

@media (max-width: 380px) {
  img.img-top{
    /* width: 100%; */
    max-width: 70px;
    max-height: 70px;
    border-radius: 10px;
  }
}

</style>