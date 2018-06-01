<template>
  <div>
    <div class="container hero">
      <a v-if="!restaurant.image_url" href="#">
        <img src="../assets/splash2.jpg" class="r-image img-fluid mx-auto d-block"/>
      </a>
      <a v-else :href="restaurant.url" target="_blank">
        <img :src="restaurant.image_url" class="r-image img-fluid mx-auto d-block"/>
      </a>
    </div>
    <div class="row justify-content-center spacer">
      
      <div id="result">
        <div v-if="!isSpinning">
          <a v-if="!restaurant.name"><span @click="() => getRestaurantByPosition({ limit: 20, mode: 'party' })"></span></a>
          <a v-else :href="restaurant.url" target="_blank">{{ restaurant.name }}</a>
        </div>
        <div v-else>
          <div id="spinner">
            <i class="fas fa-utensils fa-spin wobble-fix"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    getRestaurantByPosition: {
      type: Function
    }
  },
  computed: mapGetters([
    'restaurant',
    'isSpinning'
  ])
}
</script>

<style scoped>

</style>
