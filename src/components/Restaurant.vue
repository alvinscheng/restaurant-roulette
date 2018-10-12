<template>
  <div>
    <div class="row justify-content-center spacer">
      <div id="result">
        <div v-if="isSpinning || !restaurant.name">
          <div id="spinner">
            <i class="fas fa-utensils wobble-fix" :class="{'fa-spin': isSpinning}"></i>
          </div>
        </div>
        <div v-else>
          <a :href="restaurant.url" target="_blank">{{ restaurant.name }}</a>
        </div>
      </div>
    </div>

    <div class="container hero">
      <a v-if="!restaurant.image_url" href="#">
        <img src="../assets/splash2.jpg" class="r-image img-fluid mx-auto d-block"/>
      </a>
      <a v-else :href="restaurant.url" target="_blank">
        <img :src="restaurant.image_url" class="r-image img-fluid mx-auto d-block"/>
      </a>
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
