<template class="place-items-center">
  <div class="main">
    <!-- <button @click="cek">cek</button> -->

    <div class="one">
      <div class="header font-bold px-8">
        <div class="text-center text-3xl">Covid</div>
        <p class="text-xl">Statistik</p>
        <p v-if="indo_Cases.penambahan" class="text-sm font-normal"><i>( Last Update : {{indo_Cases.penambahan.tanggal}} )</i></p>
      </div>
      <CovidStatistik
        :jumlah_positif="jumlah_positif"
        :jumlah_dirawat="jumlah_dirawat"
        :jumlah_sembuh="jumlah_sembuh"
        :jumlah_meninggal="jumlah_meninggal"
        :vaksinasi_tahap_1="vaksinasi_tahap_1"
        :vaksinasi_tahap_2="vaksinasi_tahap_2"
        :global_Confirmed="global_Confirmed"
        :global_Active="global_Active"
        :global_Recovered="global_Recovered"
        :global_Deaths="global_Deaths"
        :isLoadingIndo="isLoadingIndo"
        :isLoadingGlobal="isLoadingGlobal"
      />
    </div>
    <div class="two px-4 py-8">
      <CovidBar v-if="!loadingChart" :dataProv="dataProv"  class="mt-4" />
      <CovidChart v-if="!loadingChart" :prov="prov" :daysDate="daysDate" :daysPositif="daysPositif" :daysDeath="daysDeath" :daysRecovered="daysRecovered"  />
      
    </div>
  </div>
</template>

<script>
import { computed, ref, useAsync, useContext } from '@nuxtjs/composition-api'
import axios from 'axios'
import Loading from '@/components/Loading.vue'
import CovidStatistik from '@/components/covid/CovidStatistik.vue'
import CovidChart from '@/components/covid/CovidChart.vue'
import CovidBar from '@/components/covid/CovidBar.vue'

export default {
  name: 'Chart',
  components: {
    Loading,
    CovidStatistik,
    CovidChart,
    CovidBar
  },
  setup(_, {emit}){
    const { app, store } = useContext()
    const global_Confirmed = ref('')
    const global_Recovered = ref('')
    const global_Deaths = ref('')
    const global_Active = ref('')


    const global_Cases = ref({})
    const indo_Cases = ref([])
    const daily = ref([])
    const indo_Vaksinasi = ref([])
    const vaksinasi_tahap_1 = ref('')
    const vaksinasi_tahap_2 = ref('')
    const jumlah_positif = ref('')
    const jumlah_dirawat = ref({})
    const jumlah_sembuh = ref({})
    const jumlah_meninggal = ref({})
    const isLoadingIndo = ref(true)
    const isLoadingGlobal= ref(true)

    const daysPositif = ref([])
    const daysDeath = ref([])
    const daysRecovered = ref([])
    const daysDate = ref([])
    const dataProv = ref([])
    const loadingChart = ref(true)
    const loadingBar = ref(true)

    const prov = ref([])
    const selected = ref('NASIONAL')
    
    indoCases()
    vaksinasi()
    globalCases()
    return {
      loadingChart,
      loadingBar,
      dataProv,
      prov,
      selected,
      daily,
      daysDate,
      daysPositif,
      daysDeath,
      daysRecovered,
      global_Cases,
      indo_Cases,
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
      isLoadingIndo,
      isLoadingGlobal,
      cek,
      seleckProv
    }

    async function cek(){
      console.log('prov', prov.value)
    }

    async function seleckProv(e){
      console.log('e', e)
    }

    async function indoCases(){
      try{
        if(selected.value === 'NASIONAL'){
          console.log('case nasional')
        } else {
          console.log('bukan')
        }
        const url = `https://ngodingbentar-be.herokuapp.com/api/v1/covid`
        const result = await axios.get(url);
        const urlProv = 'https://ngodingbentar-be.herokuapp.com/api/v1/covid/prov'
        const resultProv = await axios.get(urlProv);
        if(result.data){
          dataProv.value = resultProv.data
          prov.value = resultProv.data.list_data.map((p) => {
            return p.key
          })
        }
        indo_Cases.value = result.data
        daily.value =  result.data?.harian
        setJumlahPositif()
        setJumlahDirawat()
        setJumlahSembuh()
        setJumlahMeninggal()
        setTahap1()
        setTahap2()
        if(result.data){
          isLoadingIndo.value = false
        }
      } catch (err){
        console.log('err', err)
      }
    }

    async function setJumlahPositif(){
      try {
        var bilangan = await indo_Cases.value?.total?.jumlah_positif ;
        if(typeof bilangan === 'number'){
          daysPositif.value = daily.value.map((p) => {
            return p.jumlah_positif.value
          })
          daysDate.value = daily.value.map((p) => {
            var date = new Date(p.key_as_string)
            return date.toISOString().substring(0, 10)
          })
          
          var	number_string = bilangan.toString()
          let sisa 	= number_string.length % 3
          let rupiah 	= number_string.substr(0, sisa)
          let ribuan 	= number_string.substr(sisa).match(/\d{3}/g)
              
          if (ribuan) {
            let separator = sisa ? '.' : '';
            rupiah += separator + ribuan.join('.');
          }
    
          jumlah_positif.value =  rupiah
          loadingChart.value = false
        }
      } catch(err){
        console.log(err)
      }
    }

    async function setJumlahDirawat (){
      var bilangan = await indo_Cases.value?.total?.jumlah_dirawat ;
      if(typeof bilangan === 'number'){
        var	number_string = bilangan.toString()
        let sisa 	= number_string.length % 3
        let rupiah 	= number_string.substr(0, sisa)
        let ribuan 	= number_string.substr(sisa).match(/\d{3}/g)
            
        if (ribuan) {
          let separator = sisa ? '.' : '';
          rupiah += separator + ribuan.join('.');
        }
  
        let persen = (indo_Cases.value?.total?.jumlah_dirawat/indo_Cases.value?.total?.jumlah_positif)*100
  
        let data = {
          value : rupiah,
          persentase : persen.toString().substring(0, 4)
        }
  
        jumlah_dirawat.value = data
      }
    }

    async function setJumlahSembuh(){
      var bilangan = indo_Cases.value?.total?.jumlah_sembuh ;
      if(typeof bilangan === 'number'){
        daysRecovered.value = daily.value.map((p) => {
          return p.jumlah_sembuh.value
        })
        var	number_string = bilangan.toString()
        let sisa 	= number_string.length % 3
        let rupiah 	= number_string.substr(0, sisa)
        let ribuan 	= number_string.substr(sisa).match(/\d{3}/g)
            
        if (ribuan) {
          let separator = sisa ? '.' : '';
          rupiah += separator + ribuan.join('.');
        }
  
        let persen = (indo_Cases.value?.total?.jumlah_sembuh/indo_Cases.value?.total?.jumlah_positif)*100
  
        let data = {
          value : rupiah,
          persentase : persen.toString().substring(0, 4)
        }
  
        jumlah_sembuh.value = data
      }
    }

    async function setJumlahMeninggal(){
      var bilangan = indo_Cases.value?.total?.jumlah_meninggal ;

      if(typeof bilangan === 'number'){
        daysDeath.value = daily.value.map((p) => {
          return p.jumlah_meninggal.value
        })
        var	number_string = bilangan.toString()
        let sisa 	= number_string.length % 3
        let rupiah 	= number_string.substr(0, sisa)
        let ribuan 	= number_string.substr(sisa).match(/\d{3}/g)
            
        if (ribuan) {
          let separator = sisa ? '.' : '';
          rupiah += separator + ribuan.join('.');
        }
  
        let persen = (indo_Cases.value?.total?.jumlah_meninggal/indo_Cases.value?.total?.jumlah_positif)*100
  
        let data = {
          value : rupiah,
          persentase : persen.toString().substring(0, 4)
        }
  
        jumlah_meninggal.value = data
      }
    }

    async function setTahap1(){
      try {
        var bilangan = await indo_Vaksinasi.value?.vaksinasi?.total?.jumlah_vaksinasi_1 ;
        if(typeof bilangan === 'number'){
          var	number_string = bilangan.toString()
          let sisa 	= number_string.length % 3
          let rupiah 	= number_string.substr(0, sisa)
          let ribuan 	= number_string.substr(sisa).match(/\d{3}/g)
              
          if (ribuan) {
            let separator = sisa ? '.' : '';
            rupiah += separator + ribuan.join('.');
          }
          vaksinasi_tahap_1.value = rupiah
        }
      }catch(err){
        console.log(err)
      }
    }

    async function setTahap2(){
      try {
        var bilangan = await indo_Vaksinasi.value?.vaksinasi?.total?.jumlah_vaksinasi_2 ;
        if(typeof bilangan === 'number'){
          var	number_string = bilangan.toString()
          let sisa 	= number_string.length % 3
          let rupiah 	= number_string.substr(0, sisa)
          let ribuan 	= number_string.substr(sisa).match(/\d{3}/g)
              
          if (ribuan) {
            let separator = sisa ? '.' : '';
            rupiah += separator + ribuan.join('.');
          }
          vaksinasi_tahap_2.value = rupiah
        }
      }catch(err){
        console.log(err)
      }
    }

    async function globalCases(){
      try{
        const url = `https://covid19.mathdro.id/api`
        const result = await axios.get(url);
        global_Cases.value = result.data
        setGlobalConfirm()
        setGlobalRecovered()
        setGlobalDeaths()
        setGlobalActive()
        if(result.data){
          isLoadingGlobal.value = false
        }
      } catch (err){
        console.log('err', err)
      }
    }

    async function setGlobalConfirm(){
      try {
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
          global_Confirmed.value = rupiah
        }
      } catch(err){
        console.log(err)
      }
    }

    async function setGlobalRecovered(){
      try {
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
          global_Recovered.value = rupiah
        }
      } catch(err){
        console.log(err)
      }
    }

    async function setGlobalDeaths(){
      try {
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
          global_Deaths.value = rupiah
        }
      } catch(err){
        console.log(err)
      }
    }

    async function setGlobalActive(){
      try {
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
          global_Active.value = rupiah
        }
      } catch(err){
        console.log(err)
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
  border-bottom-right-radius: 40px;
  border-bottom-left-radius: 40px;
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
