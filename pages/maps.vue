<template>
  <span>
    <div class="flex text-center">
      <div class="m-auto">
        <h4>Your Position</h4>
        <p>Latitude: {{ currPos.lat.toFixed(2) }}</p>
        <p>Longtitude: {{ currPos.lng.toFixed(2) }}</p>
      </div>
      <div class="m-auto">
        <h4>Clicked Position</h4>
        <span v-if="otherPos">
          Latitude: {{ otherPos.lat.toFixed(2) }}, Longitude:
          {{ otherPos.lng.toFixed(2) }}
        </span>
        <span v-else>Click the map to select a position</span>
      </div>
    </div>
    <div ref="mapDiv" style="width: 100%; height: 80vh" />
  </span>
</template>

<script>
/* eslint-disable no-undef */
import { computed, defineComponent, onMounted, onUnmounted, ref } from '@vue/composition-api'
import { Loader } from '@googlemaps/js-api-loader'
import { useGeolocation } from '~/plugins/useGeolocation'

const GOOGLE_MAPS_API_KEY = 'AIzaSyDDqH9ry0W2-xZ33xXATr_zxPwDZf0q4ok'

export default defineComponent({
  setup () {
    const { coords } = useGeolocation()
    const currPos = computed(() => ({
      lat: coords.value.latitude,
      lng: coords.value.longitude
    }))
    const otherPos = ref(null)

    const loader = new Loader({ apiKey: GOOGLE_MAPS_API_KEY })
    const mapDiv = ref(null)
    const map = ref(null)
    let clickListener = null
    onMounted(async () => {
      await loader.load()
      // eslint-disable-next-line no-new
      map.value = new google.maps.Map(mapDiv.value, {
        center: currPos.value,
        zoom: 7
      })
      clickListener = map.value.addListener(
        'click',
        ({ latLng: { lat, lng } }) =>
          (otherPos.value = { lat: lat(), lng: lng() })
      )
    })
    onUnmounted(() => {
      if (clickListener) {
        clickListener.remove()
      }
    })
    return {
      currPos,
      mapDiv,
      otherPos
    }
  }
})
</script>
