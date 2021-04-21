<template>
  <div class="card" :style="{ background: theme.background, color: theme.color, boxShadow: theme.boxShadow  }">
    <div>
      <button @click="show()" class="btn-show focus:outline-none">
        <p class="font-bold">{{doa.title}}</p>
        <div v-if="isShow" class="nameSurah">
          <div class="surat">
            <p>{{doa.arabic}}</p>
          </div>
          <div class="text-left mt-4 text-xl">
            <p><i>( {{doa.latin}} )</i></p>
            <p class="font-bold pt-4">Terjemahan :</p>
            <p>{{doa.translation}}</p>
          </div>
        </div>
      </button>
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
    doa: {
      type: Object,
      required: true,
    },
    // surah: {
    //   type: Object,
    //   required: true,
    // },
    // arti: {
    //   type: String,
    //   required: true,
    // },
    index: {
      type: Number,
      required: true,
    },
  },
  setup(props){
    const { route, store, app } = useContext()
    const isShow = ref(false)
    const bgId = computed(() => {
      if(props.theme?.darktheme){
        return 'darkTheme'
      } else {
        return 'lightTheme'
      }
    })
    return {
      bgId,
      isShow,
      cek,
      show
    }

    function show(){
      if(isShow.value === true){
        isShow.value = false
      } else {
        isShow.value = true
      }
    }
    function cek(){
      console.log('props', props.doa)
    }
  }
}
</script>
<style lang="postcss" scoped>
.card {
  @apply px-4 pb-4 pt-4 rounded-lg my-8;
  /* box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.15); */
  .btn-show {
    @apply text-center w-full;
  }
  .idSurah {
    @apply items-center justify-center flex font-bold rounded-full;
    width: 45px;
    height: 45px;
  }
  .nameSurah {
    @apply px-4 w-full pt-4;
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
  .card {
    @apply my-2;
  }
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