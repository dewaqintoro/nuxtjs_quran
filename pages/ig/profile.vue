<template>
<span>
  <div class="main">
    <ProfileComp :dataPosts="dataPosts" />

    <div v-if="!loadingTheme" class="sikel" :style="{ background: storeTheme.background, color: storeTheme.color }">
      <div class="sec-audio">
        <div class="this-audio">
          <div class="footer-icons">
            <nuxt-link to="/">
              <font-awesome-icon class="footer-icon" :icon="['fas', 'home']" />
            </nuxt-link>
            <button @click="setRoute('search')">
              <font-awesome-icon class="footer-icon" :icon="['fas', 'search']" />
            </button>
            <button>
              <font-awesome-icon class="footer-icon" :icon="['fas', 'plus-square']" />
            </button>
            <button>
              <font-awesome-icon class="footer-icon" :icon="['fas', 'shopping-bag']" />
            </button>
            <button>
              <nuxt-link to="/ig/profile">
                <font-awesome-icon class="footer-icon" :icon="['fas', 'user']" />
              </nuxt-link>
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</span>
</template>

<script>
import { computed, ref, useAsync, useContext } from '@nuxtjs/composition-api'
import dataJson from '~/data/ig.json'
import HomeComp from '~/components/ig/HomeComp'
import ProfileComp from '~/components/ig/ProfileComp'

import axios from 'axios'
export default {
  name: 'Shorten',
  components: {
    HomeComp,
    ProfileComp
  },
  setup(){
    const { store, route, app } = useContext()
    const dataUser = dataJson.stories
    const dataPosts = dataJson.galery
    const thisRoute = ref('home')

    const initTheme = computed(() => store.state.initTheme)
    const thisTheme = app.$cookies.get('theme')
    const loadingTheme = computed(() => store.state.loadingTheme)
    const storeTheme = computed(() => store.state.theme)


    if(thisTheme){
      store.dispatch('getTheme')
    } else {
      store.dispatch('setTheme', initTheme.value)
    }


    return {
      dataUser,
      dataPosts,
      thisRoute,
      storeTheme,
      loadingTheme,
      setRoute
    }

    function setRoute(x){
      thisRoute.value = x
    }

  }
}
</script>

<style lang="postcss" scoped>

.footer-icons{
  font-size: 25px;
  @apply flex justify-between w-full px-4 py-2;
}
.footer-img{
  width: 50px;
  @apply rounded-full;
}

.main{
  @apply min-h-full ;
}

.sikel {
   position: fixed;
   left: 0;
   bottom: 0;
   width: 100%;
   /* background-color: white; */
   text-align: center;
}
.this-audio{
  @apply justify-items-center mx-auto items-center text-center justify-center flex;
}

.my-audio{
  @apply mb-4;
  width: 80vw;
  /* height: 35px; */
}

@media (max-width: 700px) {
}
@media (max-width: 500px) {
}

@media (max-width: 450px) {
  .my-audio{
    height: 35px;
  }
}

</style>