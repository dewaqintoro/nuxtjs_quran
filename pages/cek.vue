<template>
<div>
  <button @click="cek">cek</button>
  <!-- <div id="chart">
    <apexchart type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
  </div> -->
</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Shorten',
  components: {
  },
  setup(){
    const series= [
      {
        name: 'Marine Sprite',
        data: [44, 55, 41, 37, 22, 43, 21]
      }, {
        name: 'Striking Calf',
        data: [53, 32, 33, 52, 13, 43, 32]
      }, {
        name: 'Tank Picture',
        data: [12, 17, 11, 9, 15, 11, 20]
      }
    ]

    const chartOptions= {
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      stroke: {
        width: 1,
        colors: ['#fff']
      },
      title: {
        text: 'Fiction Books Sales'
      },
      xaxis: {
        categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014],
        labels: {
          formatter: function (val) {
            return val + "K"
          }
        }
      },
      yaxis: {
        title: {
          text: undefined
        },
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + "K"
          }
        }
      },
      fill: {
        opacity: 1
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
        offsetX: 40
      }
    }

    return {
      series,
      chartOptions,
      cek
    }

    function Replace(){
      var str = 'KALIMANTAN TIMUR';
      str = str.replace(/\s+/g, '_');
      console.log(str);
    }

    async function cek(){
      const url = `https://api.myquran.com/v1/sholat/jadwal/1609/2021/05`
      const data = await axios.get(`${url}`);
      console.log('data', data)
    }

  }
}
</script>
