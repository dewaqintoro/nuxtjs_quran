<template>
  <div class="card" :style="{ background: theme.background, color: theme.color, boxShadow: theme.boxShadow  }">
    <div class="content">
      <div class="idSurah" :style="{ boxShadow: theme.boxShadow  }">
          <p class="text-lg">{{doa.times}}X</p>
        </div>
      <div class="arabic">
        <p>{{doa.arabic}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, useContext, computed } from '@nuxtjs/composition-api'
export default {
  name: 'WiridCardcomp',
  props: {
    theme: {
      type: Object,
      required: true,
    },
    doa: {
      type: Object,
      required: true,
    },
  },
  setup(props){
    const { route, store, app } = useContext()
    const isShow = ref(false)
    const subStore = computed(() => store.state.sub)
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
      subStore,
      cek,
    }

    function cek(){
      console.log('props', props.doa)
    }
  }
}
</script>
<style lang="postcss" scoped>
.card {
  @apply px-4 pb-4 rounded-lg my-8;
  /* box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.15); */
  .btn-show {
    @apply text-center w-full;
  }
  .idSurah {
    @apply items-center justify-center flex rounded-full;
    width: 45px;
    height: 45px;
  }
  .content {
    @apply px-4 w-full pt-4;
  }
}
.card:hover {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.20);
}
.arabic {
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
  .arabic {
    @apply text-3xl;
  }
}
</style>