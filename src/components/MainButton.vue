<template>
  <div class="text-center" id="restaurant-btn">
    <button class="btn btn-outline-dark" @click="() => getRestaurantByPosition({ limit: 50 })">
      {{ buttonText }}
    </button>
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
  computed: {
    buttonText() {
      return !this.restaurantLoaded
        ? 'We\'ll tell you where to eat!'
        : 'Not satisfied? Try again!'
    },
    ...mapGetters([
      'restaurantLoaded'
    ])
  }
}
</script>
