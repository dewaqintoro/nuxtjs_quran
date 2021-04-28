<template>
  <div class="base">
    <div class="main">
      <div class="section-side">a</div>
      <div class="section-main" >
        <div class="head text-2xl justify-between flex">
          <div class="font-bold ">Overview</div>
          <div class="flex">
            <div class="circle" >
              <div class="btn-rounded">
                <font-awesome-icon :icon="['fas', 'search']" />
              </div>
            </div>
            <div class="circle" >
              <div class="btn-rounded">
                <font-awesome-icon :icon="['far', 'bell']" />
              </div>
            </div>
            <div class="user">
              <div class="btn-rounded">
                <font-awesome-icon :icon="['fas', 'user-circle']" />
              </div>
              <h1 class="mx-2">DewaQin</h1>
              <font-awesome-icon :icon="['fas', 'chevron-down']" />
              
            </div>
          </div>
        </div>
        <div class="content flex pt-8">
          <div class="w-1/3">
            <div class="port-head">
              Portofolio
            </div>
            <div class="p-4">
              <div class="portfolio-card ">
                <div class="pl-6 pt-6">
                  <h1 class="font-bold text-xl ">$ 17 643.41</h1>
                  <p>Portfolio balance</p>
                </div>
                <div class="pb-4">
                  <img src="/cripto/port2.png"/>
                </div>
              </div>
            </div>
          </div>
          <div class="w-2/3 pl-8">
            <div class="flex justify-between">
              <div>
                <h1>Your Assets</h1>
              </div>
              <div>
                <font-awesome-icon :icon="['fas', 'sliders-h']" />
              </div>
            </div>
            <div class="flex">
              <div class="asset-content">
                <div class="asset-card btc">
                  <div class="flex justify-between">
                    <p class="font-bold text-xl">1.25 BTC</p>
                    <font-awesome-icon class="mt-2" :icon="['fas', 'ellipsis-v']" />
                  </div>
                  <p>$ 2948.04</p>
                  <div class="asset-coin">
                    <img src="/cripto/btc.png"/>
                    <p>+ 0.14%</p>
                  </div>
                </div>
              </div>
              <div class="asset-content">
                <div class="asset-card btc ltc">
                  <div class="flex justify-between">
                    <p class="font-bold text-xl">1.25 BTC</p>
                    <font-awesome-icon class="mt-2" :icon="['fas', 'ellipsis-v']" />
                  </div>
                  <p>$ 2948.04</p>
                  <div class="asset-coin">
                    <img src="/cripto/btc.png"/>
                    <p>+ 0.14%</p>
                  </div>
                </div>
              </div>
              <div class="asset-content">
                <div class="asset-card eth">
                  <div class="flex justify-between">
                    <p class="font-bold text-xl">1.25 BTC</p>
                    <font-awesome-icon class="mt-2" :icon="['fas', 'ellipsis-v']" />
                  </div>
                  <p>$ 2948.04</p>
                  <div class="asset-coin">
                    <img src="/cripto/btc.png"/>
                    <p>+ 0.14%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, useAsync, useContext } from '@nuxtjs/composition-api'

export default {
  name: 'Quran',
  components: {
  },
  setup(_, {emit}){
    const { app, store } = useContext()

    return {
    }

    async function getWeather(){
    }

  }
}
</script>

<style lang="postcss" scoped>
.asset-coin {
  @apply mt-16 flex justify-between;
}
.asset-content {
  @apply w-1/3 p-4;
  .btc {
    background: #E5DEF0;
  }
  .ltc {
    background: #D6EDDA;
  }
  .eth {
    background: #F6F0D8;
  }
}
.asset-card {
  @apply p-4 rounded-2xl h-56;
  /* height: 220px; */
}
.user {
  @apply flex items-center shadow-md px-4 rounded-full mx-2;
  background: #F2F5FA;
  font-size: 18px;
  place-items: center;
  text-align: center;
}

.circle {
  @apply rounded-full flex items-center shadow-md mx-2;
  background: #F2F5FA;
  padding: 8px;
  font-size: 18px;
  place-items: center;
  text-align: center;
}
.btn-rounded {
  @apply items-center justify-center flex;
  width: 25px;
  height: 25px;
}
.kotak{
  width: 22px;
  height: 22px;
}
.icon-search{
  /* font-size: 12px; */
  width: 20px;
  height: 20px;
}
.base{
  @apply px-8 py-4 min-h-screen;
}

.main {
  @apply flex p-2 bg-black rounded-xl;
}

.section-side {
  @apply text-center bg-black text-white;
  width: 7%;
}

.section-main {
  @apply w-full rounded-xl bg-white p-6;
}

.portfolio-card {
  background: #E5F2FE;
  /* height: 220px; */
  @apply rounded-2xl h-56;
}
</style>