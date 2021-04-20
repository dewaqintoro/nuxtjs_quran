<template>
  <header class="app-header font-arabic font-bold" :style="{ background: theme.background, color: theme.color }">
    <div class="inner container">
      <div class="start">
        <nuxt-link to="/">
          Home
        </nuxt-link>
      </div>
      <div class="end">
        <button @click="deleteWidget()">
          <font-awesome-icon class="iconTheme" :icon="['fas', 'cog']" />
        </button>
      </div>
      <Transition name="drawer">
        <Setting :theme="theme" v-if="isDeleteWidget" @close="closeModal" @changetheme="$emit('changetheme')" @changesub="$emit('changesub')" @changeaudio="$emit('changeaudio')" />
      </Transition>
    </div>
  </header>
</template>

<script lang="ts">
import { computed, defineComponent, ref, useContext } from '@nuxtjs/composition-api'
export default defineComponent({
  name: 'Navbar',
  props: {
    theme: {
      type: Object,
      required: true,
    },
  },
  setup(_, { emit }) {
    const { store, route, app } = useContext()
    const isDeleteWidget = ref(false)
    return {
      isDeleteWidget,
      cekData,
      closeModal,
      deleteWidget,
      changetheme,
    }
    function closeModal() {
      isDeleteWidget.value = false
    }
    function changetheme(){
      emit('changetheme')
    }
    function deleteWidget() {
      isDeleteWidget.value = true
      // emit('delete', item)
    }
    function cekData() {
    }
  },
})
</script>

<style lang="postcss" scoped>
@font-face {
  font-family: "lpmq";
  src: url(/fonts/lpmq.otf) format("opentype");
  font-display: swap;
}
.font-arabic{
  font-family: "lpmq", Arial, sans-serif;
  line-height: 2;
}
.app-header {
  @apply fixed w-full top-0 py-4;
  @apply z-30 select-none;
  height: var(--header-height);
  min-width: 320px;
  .inner {
    @apply flex flex-wrap justify-between h-full text-xl;
    @apply px-0;
  }
  .start {
    @apply flex items-center;
  }
  .end {
    @apply grid grid-flow-col gap-4 mr-3;
  }
  .line {
    @apply block w-px opacity-50 mr-3;
    height: 32px;
  }
}
@screen mobile {
  .header-menu {
    @apply fixed w-full left-0 bottom-0;
    @apply justify-evenly py-1;
  }
  .header-button {
    @apply flex-col;
  }
}
@screen sm {
}
@screen md {
  .app-header {
    @apply flex-shrink-0;
    @apply relative;
  }
}
</style>