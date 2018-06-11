<template>
  <div class="text-center" id="restaurant-btn" :disabled="isSpinning">
    <v-btn large color="primary" @click="() => getRestaurantByPosition({ limit: 50 })">
      <span v-if="!restaurantLoaded">
        Click Here
      </span>
      <span v-else>
        Not satisfied? Try again!
      </span>
    </v-btn>
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
