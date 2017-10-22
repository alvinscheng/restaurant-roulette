<template>
  <div>
    <div class="container hero">
      <a id="top-anchor" href="#">
        temp
        <!-- <img src="../assets/splash2.jpg" class="img-fluid mx-auto d-block" id="top-image"/> -->
      </a>
    </div>
    <div class="row justify-content-center spacer">
      <div class="hidden" id="spinner">
        <i class="result fa fa-circle-o-notch wobble-fix" aria-hidden="true"></i>
      </div>
      <div id="restaurant">
        <a id="result">You<span @click="() => getRestaurantByPosition({ limit: 20, mode: 'party' })">'</span>re hungry:</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  updated(){
    console.log(this.restaurant)
  },
  props: {
    getRestaurantByPosition: {
      type: Function
    }
  },
  computed: {
    restaurant() {
      return this.store.getters.restaurant
    }
  }
}
</script>
