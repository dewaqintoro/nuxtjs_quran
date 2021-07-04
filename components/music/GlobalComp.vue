<template>
  <span class="flex">
    <div class="number">
      <p>{{index+1}}</p>
    </div>
    <nuxt-link :to="`music/`+item.key">
      <div>
        <img class="img-top" :src="item.images.coverart" alt="img" />
      </div>
    </nuxt-link>
    <div class="item-title besar">
      <p v-if="item.title.length > 40" class="font-bold">{{item.title.substring(0, 40)}}</p>
      <p v-else class="font-bold">{{item.title}}</p>
      <p v-if="item.subtitle.length > 40">{{item.subtitle.substring(0, 40)}}...</p>
      <p v-else>{{item.subtitle}}</p>
      <button class="btn-nav focus:outline-none" @click="play(item)" >
        <font-awesome-icon v-if="isPlay" :icon="['fas', 'pause']" />
        <font-awesome-icon v-else :icon="['fas', 'play']" />
      </button>
    </div>
    <div class="item-title kecil">
      <p v-if="item.title.length > 20" class="font-bold">{{item.title.substring(0, 20)}}</p>
      <p v-else class="font-bold">{{item.title}}</p>
      <p v-if="item.subtitle.length > 20">{{item.subtitle.substring(0, 20)}}...</p>
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
.sikel {
   position: fixed;
   left: 0;
   bottom: 0;
   width: 100%;
   background-color: #e5e7eb;
   text-align: center;
}
.kecil{
  display: none
}
.sec-audio{
  /* @apply absolute bottom-0 px-0 mb-0 w-full; */
  /* background: red; */
}
.this-audio{
  @apply justify-items-center mx-auto items-center text-center justify-center flex;
}

.my-audio{
  @apply mb-4;
  width: 80vw;
  /* height: 35px; */
}

.main{
  @apply mt-20;
}
.top-global{
  overflow-x: scroll;
}
.artis-global{
  overflow-x: scroll;
}
.dew{
  @apply flex;
}

.item{
  margin: 10px;
  min-width: 500px;
  max-width: 800px;
  /* background: rgb(245, 186, 24); */
}

.artis-item{
  margin: 10px;
  min-width: 200px;
  max-width: 300px;
}

.image-container{
  width: 100%;
  height: 200px;
  border-radius: 8px;
  border: solid 1px rgba(12,12,12,.1);
  overflow: hidden;
}
.image-container img{
  width: 100%;
  height: 100%;
  object-fit: cover;
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
.numberTwo{
  @apply justify-items-center my-auto ml-2 mr-4;
  max-width: 10px;
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
  .my-audio{
    height: 35px;
  }
  .besar{
    /* visibility:hidden ; */
    display: none;
  }
  .kecil{
    /* visibility:visible ; */
    display: block;
  }
}
/* @screen tablet {
}
@screen mobile {
  .input-search {
    @apply my-2 text-lg;
  }
  .btn-search {
    @apply my-2 text-lg font-semibold;
  }
  .input-search {
    @apply px-4;
  }
} */
</style>