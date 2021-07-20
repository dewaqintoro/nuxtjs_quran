<template>
<span>
  <p v-if="isDone">Selesai</p>
  <div v-if="!berhenti">
    <p>Nilai A</p>
    <input v-model.number="nilaiA" type="number" />
    <p>Nilai B</p>
    <input v-model.number="nilaiB" type="number" />
  </div>

  <div v-if="berhenti && !isDone">
    <p>berhenti ?? (Y atau T)</p>
    <input v-model="nilaiC" class="border-gray-400 "/>
  </div>

  <div v-if="!isDone">
    <button @click="Sum()">+</button>
    <button @click="Sub()">-</button>
    <p>Hasil : {{thisResult}}</p>
  </div>

</span>
</template>

<script>
import { ref, watch } from '@nuxtjs/composition-api'
// import { ref, watch } from 'vue'
export default {
  name: 'Shorten',
  components: {
  },

  setup(){

    const nilaiA = ref(0)
    const nilaiB = ref(0)
    const nilaiC = ref('')
    const thisResult = ref(0)
    const berhenti = ref(false)
    const isDone = ref(false)

    watch(nilaiC, () => {
      if(nilaiC.value === "Y"){
        berhenti.value = true
        isDone.value = true
        nilaiC.value === ""
      }
      if(nilaiC.value === "T"){
        berhenti.value = false
        nilaiC.value === ""
      }
    })

    return {
      nilaiA,
      nilaiB,
      nilaiC,
      isDone,
      thisResult,
      berhenti,
      Sum,
      Sub
    }

    function Sum(){
      const result = nilaiA.value + nilaiB.value
      thisResult.value = result
      console.log(typeof nilaiA.value)
      berhenti.value = true
    }

    function Sub(){
      const result = nilaiA.value - nilaiB.value
      thisResult.value = result
      console.log(typeof nilaiA.value)
      berhenti.value = true
    }

  }
}
</script>

<style lang="postcss" scoped>
.chat{
  @apply mx-4;
}
.chat-text{
  @apply flex justify-between w-full;
}
.sender{
  @apply my-auto pl-4 font-bold;
}
.chat img{
  width: 80px;
  @apply rounded-full;
}
.chat-icon{
  font-size: 30px;
  @apply my-2;
}

.tag{
  width: 50%;
  @apply text-center mx-auto border-b-2 py-2;
}

.search{
  @apply px-4;
}
.search-wrap{
  background: rgb(241, 241, 241);
  @apply flex w-full px-4 py-2 rounded-lg;
}
.input-search{
  background: rgb(241, 241, 241);
  @apply w-full;
}
.back{
  @apply flex ml-4;
}
.icon-back{
  font-size: 25px;
}


div.fixed {
  position: fixed;
  top: 0;
  /* background: white; */
  width: 100%;
}

.main{
  @apply min-h-full ;
}

.header-main{
  /* background: white; */
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

.itemS img{
@apply text-center p-1;
}
.item-img{
  border: 2px solid red;
  @apply rounded-full p-1;
}

.item-img img{
  @apply rounded-full;
}

.my-item-img{
  @apply rounded-full p-1;
}

.my-item-img img{
  min-width: 77px;
  @apply rounded-full pt-1;
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
</style>