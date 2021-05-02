<template>
  <div class="analitik">
    <!-- <AnalitikDropdown /> -->
    <div class="chart-title">Analitik</div>
    <p>https://data.covid19.go.id/public/api/prov.json</p>
    <p>https://data.covid19.go.id/public/api/data.json</p>
    <p>https://data.covid19.go.id/public/api/pemeriksaan-vaksinasi.json</p>
    <p>https://data.covid19.go.id/public/api/update.json</p>
    <p>https://data.covid19.go.id/public/api/prov_detail_JAWA_BARAT.json</p>
    <div class="myChart">
      <ClientOnly>
        <div id="chart">
          <!-- <apexchart type="line" height="350" :options="chartOptions" :series="series"></apexchart> -->
          <apexchart type="line" height="350" :options="chartOptions" :series="series"></apexchart>
        </div>
      </ClientOnly>

      <!-- <div class="flex" v-if="global_Cases.confirmed">
      <div class="case bg-gray-200">confirmed: {{global_Cases.confirmed.value}}</div>
      <div class="case bg-gray-400">recovered: {{global_Cases.recovered.value}}</div>
      <div class="case bg-gray-700">deaths: {{global_Cases.deaths.value}}</div>
    </div> -->
    <!-- <div class="myChart">
      <ClientOnly>
        <div id="chart">
          <apexchart type="line" height="350" :options="chartOptions" :series="series"></apexchart>
        </div>
      </ClientOnly>
    </div> -->

    </div>
  </div>
</template>

<script>
export default {
  name: 'AnalitikChart',
  data: () => {
    return {
      series: [
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
      ],
      chartOptions: {
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
      },
    }
  },
}
</script>

<style lang="postcss" scoped>
.analitik {
  .chart-title {
    @apply py-4;
  }
  .myChart {
    @apply p-4;
    height: 100%;
    background: #fff;
    box-shadow: 0.1px 2px 6px rgba(195, 199, 204, 0.5);
    border-radius: 6px;
  }
}
</style>
