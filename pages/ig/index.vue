<template>
<span>
  <div class="main">

    <!-- <div class="fixed">
      <div class="header-main">
        <div class="ig-logo">
          <img src="https://res.cloudinary.com/dewaqintoro/image/upload/v1625883226/Ngodingbentar/pngegg_nb2ijc.png" />
        </div>
        <div class="flex">
          <button class="mr-3 ">
            <font-awesome-icon class="my-icon" :icon="['far', 'heart']" />
          </button>
          <button class="mx-2">
            <font-awesome-icon class="my-icon" :icon="['far', 'comment']" />
            <span class="toltip">12</span>
          </button>
        </div>
      </div>
    </div>

    <div class="example">
      <div class="content">

        <div>
          <div class="header-story">
            <div class="dew">
              <div class="itemS">
                <div class="my-item-img flex">
                  <img src="https://res.cloudinary.com/dewaqintoro/image/upload/v1625883355/Ngodingbentar/Music/200x200cc_2_vwvpll.jpg" />
                  <span class="btn-add">+</span>
                </div>
                <p class="-mt-1 pl-1">Your story</p>
              </div>

              <div class="item" v-for="(user, index) in dataUser" :key="index">
                <div class="item-img">
                  <img :src="user.img" />
                </div>
                <p v-if="user.name.length > 6">{{user.name.substring(0, 6)}}...</p>
                <p v-else>{{user.name}}</p>
              </div>
            </div>
          </div>
          

          <hr/>
          <div class="home">
            
            <div class="post" v-for="post in dataPosts" :key="post.id">
              <div class="home-account">
                <div class="home-account-left">
                  <img :src="post.profileImg" />
                  <p class="my-auto ml-2 font-bold text-lg">{{post.name}}</p>
                </div>
                <div class="my-auto">
                  <button class="mx-2">
                    <font-awesome-icon class="my-icon2" :icon="['fas', 'ellipsis-v']" />
                  </button>
                </div>
              </div>
              <img :src="post.postImg" />
              <div class="justify-between flex px-4 py-3">
                <div class="flex">
                  <button>
                    <font-awesome-icon class="post-icon" :icon="['far', 'heart']" />
                  </button>
                  <button>
                    <font-awesome-icon class="post-icon mx-4 mirror" :icon="['far', 'comment']" />
                  </button>
                  <button>
                    <font-awesome-icon class="post-icon" :icon="['far', 'paper-plane']" />
                  </button>
                </div>
                <div>
                  <button>
                    <font-awesome-icon class="post-icon" :icon="['far', 'bookmark']" />
                  </button>
                </div>
              </div>
              <div class="px-4">
                <p><b>590 likes</b></p>
                <div><b>dewaqintoro</b> What hghg ... <button>more</button></div>
                <p class="text-gray-400 ">View all 103 comments</p>
                <p class="text-gray-400 text-xs ">2 hours ago <b>. See translation</b></p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div> -->

    <HomeComp v-if="thisRoute === 'home'" :dataPosts="dataPosts" :dataUser="dataUser" />
    <ProfileComp v-if="thisRoute === 'profile'" />

    <div v-if="!loadingTheme" class="sikel" :style="{ background: storeTheme.background, color: storeTheme.color }">
      <div class="sec-audio">
        <div class="this-audio">
          <div class="footer-icons">
            <button>
              <nuxt-link to="/">
                <font-awesome-icon class="footer-icon" :icon="['fas', 'home']" />
              </nuxt-link>
            </button>
            <button>
              <nuxt-link to="/ig/search">
                <font-awesome-icon class="footer-icon" :icon="['fas', 'search']" />
              </nuxt-link>
            </button>
            <!-- <button @click="setRoute('search')">
              <font-awesome-icon class="footer-icon" :icon="['fas', 'search']" />
            </button> -->
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
    const dataPosts = dataJson.posts
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