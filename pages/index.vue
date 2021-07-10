<template>
<span>
  <div class="main">

    <div class="fixed">
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

    <!-- <div class="content">

      <div>
        <div class="header-story">
          <div class="dew">
            <div class="item" v-for="(user, index) in dataUser" :key="index">
              <img :src="user.img" />
              <p v-if="user.name.length > 6">{{user.name.substring(0, 6)}}...</p>
              <p v-else>{{user.name}}</p>
            </div>
          </div>
        </div>
        

        <hr class="mb-2"/>
        <div class="home">
          <div>
            <div class="home-account">
              <div class="home-account-left">
                <img src="https://res.cloudinary.com/dewaqintoro/image/upload/v1625883354/Ngodingbentar/Music/200x200cc_4_ek1wir.jpg" />
                <p class="my-auto ml-2 font-bold text-lg">my name</p>
              </div>
              <div class="my-auto">
                <button class="mx-2">
                  <font-awesome-icon class="my-icon" :icon="['fas', 'ellipsis-h']" />
                </button>
              </div>
            </div>
            <img src="https://res.cloudinary.com/dewaqintoro/image/upload/v1625883566/Ngodingbentar/Music/500x500cc_hkhll2.jpg"/>
            <div>

            </div>
          </div>
        </div>

      </div>

    </div> -->

    <div class="example">
      <div class="content">

        <div>
          <div class="header-story">
            <div class="dew">
              <div class="item" v-for="(user, index) in dataUser" :key="index">
                <img :src="user.img" />
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
    </div>

    <div class="sikel">
      <div class="sec-audio">
        <div class="this-audio">
          <div class="footer-icons">
            <button>
              <font-awesome-icon class="footer-icon" :icon="['fas', 'home']" />
            </button>
            <button>
              <font-awesome-icon class="footer-icon" :icon="['fas', 'search']" />
            </button>
            <button>
              <font-awesome-icon class="footer-icon" :icon="['fas', 'plus-square']" />
            </button>
            <button>
              <font-awesome-icon class="footer-icon" :icon="['fas', 'shopping-bag']" />
            </button>
            <button>
              <font-awesome-icon class="footer-icon" :icon="['fas', 'user']" />
            </button>
            <!-- <button>
              <img class="footer-img" src="https://res.cloudinary.com/dewaqintoro/image/upload/v1625883566/Ngodingbentar/Music/500x500cc_hkhll2.jpg"/>
            </button> -->
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

import axios from 'axios'
export default {
  name: 'Shorten',
  components: {
  },
  setup(){
    const { store, route, app } = useContext()
    const dataUser = dataJson.stories
    const dataPosts = dataJson.posts

    return {
      dataUser,
      dataPosts
    }

  }
}
</script>

<style lang="postcss" scoped>
.mirror{
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
}
.footer-icons{
  font-size: 25px;
  @apply flex justify-between w-full px-4 py-2;
}
.footer-img{
  width: 50px;
  @apply rounded-full;
}
.post{
  @apply my-4;
}
.example {
  background-color: white;
  margin-top: 60px;
  width: 100%;
  height: 85vh;
  border: 1px dotted black;
  overflow-y: scroll;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.example::-webkit-scrollbar {
    display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.example {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.toltip{
  background: rgb(190, 4, 4);
  color: white;
  position: absolute;
  margin-top: -10px;
  margin-left: -20px;
  padding: 3px 5px ;
  @apply rounded-full text-xs;
}
.home-account{
  @apply px-4 mb-2 flex justify-between;
}

.home-account img{
  width: 60px;
  @apply rounded-full;
}

.home-account-left{
  @apply flex justify-items-center my-auto;
}

div.fixed {
  position: fixed;
  top: 0;
  background: white;
  width: 100%;
}

.main{
  @apply min-h-full ;
}

.header-main{
  background: white;
  @apply flex justify-between py-2;
}

.ig-logo{
  max-width: 120px;
  @apply ml-2;
}

.my-icon{
  font-size: 30px;
}

.post-icon{
  font-size: 24px;
}

.header-story{
  overflow-x: scroll;
  -ms-overflow-style: none; 
  scrollbar-width: none;
}

.header-story::-webkit-scrollbar {
  display: none;
}

.dew{
  @apply flex;
}

.item{
  min-width: 90px;
  @apply text-center p-2;
}
.item img{
  @apply rounded-full;
}


.sikel {
   position: fixed;
   left: 0;
   bottom: 0;
   width: 100%;
   background-color: white;
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