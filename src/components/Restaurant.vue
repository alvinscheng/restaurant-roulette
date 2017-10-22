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
      <div class="hidden" id="spinner">
        <i class="result fa fa-circle-o-notch wobble-fix" aria-hidden="true"></i>
      </div>
      <div id="result">
        <a v-if="!restaurant.name">You<span @click="() => getRestaurantByPosition({ limit: 20, mode: 'party' })">'</span>re hungry:</a>
        <a v-else :href="restaurant.url" target="_blank">{{ restaurant.name }}</a>
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
    'restaurant'
  ])
}
</script>

<style scoped>

</style>
