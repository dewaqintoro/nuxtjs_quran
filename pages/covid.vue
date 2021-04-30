<template class="place-items-center">
  <div class="main">
    <div class="one">
      <div class="header font-bold px-8">
        <div class="text-center text-3xl">Covid</div>
        <!-- <button @click="cek">cek</button> -->
        <p class="text-xl">Statistik</p>
      </div>
      <div class="statistik">
        <div class="switch">
          <div class="bg-gray-100">
            <div class="box">
              <input type="checkbox" class="toggle-btn focus:outline-none " @change="update($event)" />
              <div class="signup"></div>
              <div class="login"></div>
            </div>
          </div>
        </div>
        <div v-if="isIndo" class="case mt-14">
          <div class="case-card text-xl p-10 sm:p-16 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 lg:gap-6 ">
            <div class="positif text-white text-center py-4 rounded-lg">
              <p class="text-2xl font-bold" v-if="indo_Casess.total">{{jumlah_positif}}</p>
              <p>TERKONFIRMASI</p>
            </div>
            <div class="aktif text-white text-center py-4 rounded-lg">
              <p class="text-2xl font-bold" v-if="indo_Casess.total">{{jumlah_dirawat.value}}</p>
              <p class="text-xl" v-if="indo_Casess.total">{{jumlah_dirawat.persentase}}%</p>
              <p>KASUS AKTIF</p>
            </div>
            <div class="sembuh text-white text-center py-4 rounded-lg">
              <p class="text-2xl font-bold" v-if="indo_Casess.total">{{jumlah_sembuh.value}}</p>
              <p class="text-xl" v-if="indo_Casess.total">{{jumlah_sembuh.persentase}}%</p>
              <p>SEMBUH</p>
            </div>
            <div class="meninggal text-white text-center py-4 rounded-lg">
              <p class="text-2xl font-bold" v-if="indo_Casess.total">{{jumlah_meninggal.value}}</p>
              <p class="text-xl" v-if="indo_Casess.total">{{jumlah_meninggal.persentase}}%</p>
              <p>MENINGGAL</p>
            </div>
            <div class="vaksinasi text-white text-center py-4 rounded-lg">
              <p class="text-2xl font-bold" v-if="indo_Vaksinasi.vaksinasi">{{vaksinasi_tahap_1}}</p>
              <p>VAKSINASI KE-1</p>
            </div>
            <div class="vaksinasi text-white text-center py-4 rounded-lg">
              <p class="text-2xl font-bold" v-if="indo_Vaksinasi.vaksinasi">{{vaksinasi_tahap_2}}</p>
              <p>VAKSINASI KE-2</p>
            </div>
            <!-- <div class="tiga bg-blue-500 text-white text-center py-4 rounded-lg sm:col-span-2 md:col-span-1">7</div> -->
          </div>
        </div>

        <div v-else class="case mt-14">
          <div class="case-card text-xl p-10 sm:p-16 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 lg:gap-6 ">
            <div class="positif text-white text-center py-4 rounded-lg">
              <p v-if="global_Cases.confirmed" class="text-2xl font-bold">{{global_Confirmed}}</p>
              <p>TERKONFIRMASI</p>
            </div>
            <div class="aktif text-white text-center py-4 rounded-lg">
              <p v-if="global_Active" class="text-2xl font-bold">{{global_Active}}</p>
              <p>KASUS AKTIF</p>
            </div>
            <div class="sembuh text-white text-center py-4 rounded-lg">
              <p v-if="global_Cases.confirmed" class="text-2xl font-bold">{{global_Recovered}}</p>
              <p>SEMBUH</p>
            </div>
            <div class="meninggal text-white text-center py-4 rounded-lg sm:col-span-1 md:col-span-3 lg:col-span-3">
              <p v-if="global_Cases.confirmed" class="text-2xl font-bold">{{global_Deaths}}</p>
              <p>MENINGGAL</p>
            </div>
          </div>
        </div>
        
      </div>
    </div>
    <div class="two p-8">
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum, temporibus, magnam itaque nihil maiores aspernatur exercitationem pariatur voluptatibus id fuga aliquid, debitis quia odit! Perferendis, facilis rerum fuga consequatur et non magnam! Eius tempora minima, soluta numquam perspiciatis sequi dolorum, repellendus fugit ducimus, iure nihil! Ratione aperiam sint, nesciunt corrupti aut harum at qui veniam ullam nihil culpa reiciendis id, assumenda vero enim ducimus tenetur accusantium in cum odit quam! Excepturi quo totam debitis expedita distinctio molestiae fugit, autem explicabo cupiditate culpa necessitatibus nesciunt accusantium nihil veniam obcaecati nobis atque placeat similique nisi facere maxime? Doloremque eum optio quae consequuntur.
    </div>
  </div>
</template>

<script>
import { computed, ref, useAsync, useContext } from '@nuxtjs/composition-api'
import axios from 'axios'
import Loading from '@/components/Loading.vue'

export default {
  name: 'Chart',
  components: {
    Loading
  },
  setup(_, {emit}){
    const { app, store } = useContext()
    const isIndo = ref(true)
    const global_Confirmed = computed(() => {
      var bilangan = global_Cases.value?.confirmed?.value ;
      if(typeof bilangan === 'number'){
        var	number_string = bilangan.toString()
        let sisa 	= number_string.length % 3
        let rupiah 	= number_string.substr(0, sisa)
        let ribuan 	= number_string.substr(sisa).match(/\d{3}/g)
            
        if (ribuan) {
          let separator = sisa ? '.' : '';
          rupiah += separator + ribuan.join('.');
        }
        return rupiah
      }
    })
    const global_Recovered = computed(() => {
      var bilangan = global_Cases.value?.recovered?.value ;
      if(typeof bilangan === 'number'){
        var	number_string = bilangan.toString()
        let sisa 	= number_string.length % 3
        let rupiah 	= number_string.substr(0, sisa)
        let ribuan 	= number_string.substr(sisa).match(/\d{3}/g)
            
        if (ribuan) {
          let separator = sisa ? '.' : '';
          rupiah += separator + ribuan.join('.');
        }
        return rupiah
      }
    })
    const global_Deaths = computed(() => {
      var bilangan = global_Cases.value?.deaths?.value ;
      if(typeof bilangan === 'number'){
        var	number_string = bilangan.toString()
        let sisa 	= number_string.length % 3
        let rupiah 	= number_string.substr(0, sisa)
        let ribuan 	= number_string.substr(sisa).match(/\d{3}/g)
            
        if (ribuan) {
          let separator = sisa ? '.' : '';
          rupiah += separator + ribuan.join('.');
        }
        return rupiah
      }
    })
    const global_Active = computed(() => {
      const confirmed = global_Cases.value?.confirmed?.value
      const recovered = global_Cases.value?.recovered?.value
      const deaths = global_Cases.value?.deaths?.value
      const active = confirmed - recovered - deaths

      if(typeof active === 'number'){
        var	number_string = active.toString()
        let sisa 	= number_string.length % 3
        let rupiah 	= number_string.substr(0, sisa)
        let ribuan 	= number_string.substr(sisa).match(/\d{3}/g)
            
        if (ribuan) {
          let separator = sisa ? '.' : '';
          rupiah += separator + ribuan.join('.');
        }
        return rupiah
      }
    })
    const global_Cases = ref({})
    const indo_Casess = ref([])
    const indo_Vaksinasi = ref([])
    // const vaksinasi_tahap_1 = computed(() => indo_Vaksinasi.value?.vaksinasi?.total?.jumlah_vaksinasi_1)
    const vaksinasi_tahap_1 = computed(() => {
      var bilangan = indo_Vaksinasi.value?.vaksinasi?.total?.jumlah_vaksinasi_1 ;
      if(typeof bilangan === 'number'){
        var	number_string = bilangan.toString()
        let sisa 	= number_string.length % 3
        let rupiah 	= number_string.substr(0, sisa)
        let ribuan 	= number_string.substr(sisa).match(/\d{3}/g)
            
        if (ribuan) {
          let separator = sisa ? '.' : '';
          rupiah += separator + ribuan.join('.');
        }
        return rupiah
      }
    })

    const vaksinasi_tahap_2 = computed(() => {
      var bilangan = indo_Vaksinasi.value?.vaksinasi?.total?.jumlah_vaksinasi_2 ;
      if(typeof bilangan === 'number'){
        var	number_string = bilangan.toString()
        let sisa 	= number_string.length % 3
        let rupiah 	= number_string.substr(0, sisa)
        let ribuan 	= number_string.substr(sisa).match(/\d{3}/g)
            
        if (ribuan) {
          let separator = sisa ? '.' : '';
          rupiah += separator + ribuan.join('.');
        }
        return rupiah
      }
    })


    const jumlah_positif = computed(() => {

      var bilangan = indo_Casess.value?.total?.jumlah_positif ;
      var	number_string = bilangan.toString()
      let sisa 	= number_string.length % 3
      let rupiah 	= number_string.substr(0, sisa)
      let ribuan 	= number_string.substr(sisa).match(/\d{3}/g)
          
      if (ribuan) {
        let separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
      }

      return rupiah
    })

    const jumlah_dirawat = computed(() => {

      var bilangan = indo_Casess.value?.total?.jumlah_dirawat ;
      var	number_string = bilangan.toString()
      let sisa 	= number_string.length % 3
      let rupiah 	= number_string.substr(0, sisa)
      let ribuan 	= number_string.substr(sisa).match(/\d{3}/g)
          
      if (ribuan) {
        let separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
      }

      let persen = (indo_Casess.value?.total?.jumlah_dirawat/indo_Casess.value?.total?.jumlah_positif)*100

      let data = {
        value : rupiah,
        persentase : persen.toString().substring(0, 4)
      }

      return data
    })

    const jumlah_sembuh = computed(() => {

      var bilangan = indo_Casess.value?.total?.jumlah_sembuh ;
      var	number_string = bilangan.toString()
      let sisa 	= number_string.length % 3
      let rupiah 	= number_string.substr(0, sisa)
      let ribuan 	= number_string.substr(sisa).match(/\d{3}/g)
          
      if (ribuan) {
        let separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
      }

      let persen = (indo_Casess.value?.total?.jumlah_sembuh/indo_Casess.value?.total?.jumlah_positif)*100

      let data = {
        value : rupiah,
        persentase : persen.toString().substring(0, 4)
      }

      return data
    })

    const jumlah_meninggal = computed(() => {

      var bilangan = indo_Casess.value?.total?.jumlah_meninggal ;
      var	number_string = bilangan.toString()
      let sisa 	= number_string.length % 3
      let rupiah 	= number_string.substr(0, sisa)
      let ribuan 	= number_string.substr(sisa).match(/\d{3}/g)
          
      if (ribuan) {
        let separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
      }

      let persen = (indo_Casess.value?.total?.jumlah_meninggal/indo_Casess.value?.total?.jumlah_positif)*100

      let data = {
        value : rupiah,
        persentase : persen.toString().substring(0, 4)
      }

      return data
    })


    const series= [
      {
        name: "High - 2013",
        data: [28, 29, 33, 36, 32, 32, 33]
      },
      {
        name: "med - 2013",
        data: [12, 11, 14, 18, 17, 13, 13]
      },
      {
        name: "Low - 2013",
        data: [21, 15, 24, 12, 27, 23, 13]
      }
    ]

    const chartOptions= {
      chart: {
        height: 350,
        type: 'line',
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2
        },
        toolbar: {
          show: false
        }
      },
      colors: ['#77B6EA', '#545454'],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: 'smooth'
      },
      title: {
        text: 'Average High & Low Temperature',
        align: 'left'
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        },
      },
      markers: {
        size: 1
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        title: {
          text: 'Month'
        }
      },
      yaxis: {
        title: {
          text: 'Temperature'
        },
        min: 5,
        max: 40
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -5
      }
    }
    // globalCases()
    indoCases()
    vaksinasi()
    globalCases()
    return {
      series,
      chartOptions,
      isIndo,
      global_Cases,
      indo_Casess,
      indo_Vaksinasi,
      vaksinasi_tahap_1,
      vaksinasi_tahap_2,
      jumlah_positif,
      jumlah_dirawat,
      jumlah_sembuh,
      jumlah_meninggal,
      global_Confirmed,
      global_Recovered,
      global_Deaths,
      global_Active,
      cek,
      globalConfirmed,
      globalRecovered,
      globalDeaths,
      update
    }

    function update(e) {
      isIndo.value = !isIndo.value
      console.log('isIndo.value', isIndo.value)
      // if (e.srcElement.checked === true) {
      //   console.log('on')
      // } else {
      //   console.log('off')
      // }
    }

    async function cek(){
      console.log('vaksinasi_tahap_1.value', vaksinasi_tahap_1.value)
    }

    async function indoCases(){
      try{
        const url = `https://ngodingbentar-be.herokuapp.com/api/v1/covid`
        const result = await axios.get(url);
        indo_Casess.value = result.data
        console.log('indo_Casess.value', indo_Casess.value)
      } catch (err){
        console.log('err', err)
      }
    }

    async function vaksinasi(){
      try{
        const url = `https://ngodingbentar-be.herokuapp.com/api/v1/vaksinasi`
        const result = await axios.get(url);
        indo_Vaksinasi.value = result.data?.data

        // console.log('vaksinasi', result.data.data)
      } catch (err){
        console.log('err', err)
      }
    }
    

    async function globalCases(){
      try{
        const url = `https://covid19.mathdro.id/api`
        const result = await axios.get(url);
        global_Cases.value = result.data

        console.log('global_Cases.value', global_Cases.value)
      } catch (err){
        console.log('err', err)
      }
    }

    async function globalConfirmed(){
      try{
        const url = `https://covid19.mathdro.id/api/confirmed`
        const result = await axios.get(url);
        // global_Confirmed.value = result.data
      } catch (err){
        console.log('err', err)
      }
    }

    async function globalRecovered(){
      try{
        const url = `https://covid19.mathdro.id/api/recovered`
        const result = await axios.get(url);
        global_Recovered.value = result.data
        console.log('global_Recovered.value', global_Recovered.value)
      } catch (err){
        console.log('err', err)
      }
    }

    async function globalDeaths(){
      try{
        const url = `https://covid19.mathdro.id/api/deaths`
        const result = await axios.get(url);
        global_Deaths.value = result.data
        console.log('global_Deaths.value', global_Deaths.value)
      } catch (err){
        console.log('err', err)
      }
    }

  }
}
</script>

<style lang="postcss" scoped>
.main {
  @apply place-items-center px-36;
}
.positif {
  background: rgb(253, 166, 4);
}

.aktif {
  background: #8e44ad;
}

.meninggal {
  /* background: rgb(223, 43, 43); */
  background: #c0392b;
}

.sembuh {
  background: #10ac84;
}

.vaksinasi {
  background: #74b9ff;
}
.toggle-btn {
  -webkit-appearance: none;
  width: 250px;
  height: 40px;
  border: 1px solid gray;
  position: absolute;
  top: 12%;
  left: calc(50% - 125px);
  border-radius: 100px;
  background: #4884b6;
}

.toggle-btn:before{
  @apply grid text-black font-bold place-items-center;
  content: 'Indonesia';
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  background: white;
  border-radius: 100px;
  transition: 0.5s;
}

.toggle-btn:checked:before{
  content: 'Global';
  left: 50%;
}
.one {
  @apply text-white ;
  border-bottom-right-radius: 50px;
  border-bottom-left-radius: 50px;
  min-height: 300px;
  /* background: #273c75; */
  background: #346791;
}
.case {
  @apply w-full;
}

@media (max-width: 900px) {
  .main {
    @apply px-16;
  }
  .tiga{
    @apply col-span-2;
  }
}

@media (max-width: 700px) {
  .main {
    @apply px-8;
  }
  .tiga{
    @apply col-span-2;
  }
}
@media (max-width: 500px) {
  .main {
    @apply px-0;
  }
  .case-card{
    @apply grid-cols-1;
  }
}
</style>
