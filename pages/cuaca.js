// const sekitar = await app.$axios.$get(url, {
//   params: {
//     lat: position.latitude,
//     long: position.longitude,
//     dist: 10,
//     status: 'published',
//   },
// })

const axios = require('axios');
// import axios from '@nuxtjs/axios'
const params = {
  access_key: '260d5d4d9750bca976a2fca0d279b280',
  query: 'Gayo Lues',
}

axios.get('http://api.weatherstack.com/current', {params})
  .then(response => {
    const apiResponse = response.data;
    // console.log(`Current temperature in ${apiResponse.location.name} is ${apiResponse.current.temperature}℃`);
    console.log('apiResponse', apiResponse);
  }).catch(error => {
    console.log(error);
  });