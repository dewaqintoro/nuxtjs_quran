<template>
		<div class="card text-center m-3 font-arabic">
				<h3 class="card-header">Vue.js Pagination Tutorial & Example</h3>
				<div class="card-body">
						<!-- <div v-for="item in pageOfItems" :key="item.index">{{item.index}} - {{item.latin}}</div> -->

						<div class="item" v-for="(surah, index) in pageOfItems" :key="index">
								<!-- <a :href="'/surah/'+surah.index"> -->
								<nuxt-link :to="'/surah/'+surah.index">
								
								<div class="card">
										<div class="flex">
										<div class="idSurah">{{surah.index}}</div>
										<div class="nameSurah">
												<p>{{surah.arabic}}</p>
												<p class="mt-4">{{surah.latin}}</p>
												<p class="italic text-base">( {{surah.translation}} : {{surah.ayah_count}} ayat )</p>
										</div>
										</div>
								</div>

								</nuxt-link>
								<!-- </a> -->
						</div>
				</div>
				<div class="card-footer pb-0 pt-3">
						<jw-pagination :items="exampleItems" @changePage="onChangePage"></jw-pagination>
				</div>
				<button @click="cek()">cek</button>
		</div>
</template>

<script>
import json from '~/data/surah-info.json'

export default {
		data() {
				return {
						exampleItems: json.surah_info,
						pageOfItems: []
				};
		},
		methods: {
				onChangePage(pageOfItems) {
						this.pageOfItems = pageOfItems;
				},
				cek(){
						console.log(this.exampleItems)
				}
		}
};
</script>


<style lang="postcss" scoped>
@font-face {
  font-family: "lpmq";
  src: url(/fonts/lpmq.otf) format("opentype");
  font-display: swap;
}

html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

.font-arabic{
  font-family: "lpmq", Arial, sans-serif;
  line-height: 2;
}

.btn-search {
  background-color: #4497eb;
}
.btn-search:hover {
  background-color: #2187ec;
}
.item {
  @apply px-8 mx-36 my-8;
}
.card {
  @apply text-3xl p-4 rounded-lg;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.15);
  .idSurah {
    @apply text-center;
    width: 50px;
  }
  .nameSurah {
    @apply px-4 text-right w-full;
  }
}

.card:hover {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.20);
}


@screen mobile {
  .item {
    @apply mx-2 px-2;
  }
}
</style>