<template>
  <div class="text-center" id="restaurant-btn" :disabled="isSpinning">
    <button class="btn btn-outline-dark" @click="() => getRestaurantByPosition({ limit: 50 })">
      <span v-if="!restaurantLoaded">
        Click Here
      </span>
      <span v-else>
        Not satisfied? Try again!
      </span>
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
  computed: mapGetters([
    'restaurantLoaded',
    'isSpinning'
  ])
}
</script>
