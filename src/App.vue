<template>
  <div id="app">
    <div class="text-center title">
      <h1>Restaurant Roulette!</h1>
    </div>
    <Restaurant :get-restaurant-by-position="getRestaurantByPosition"></Restaurant>
    <MainButton :get-restaurant-by-position="getRestaurantByPosition"></MainButton>
  </div>
</template>

<script>
import Restaurant from './components/Restaurant.vue'
import MainButton from './components/MainButton.vue'

export default {
  components: {
    Restaurant,
    MainButton
  },
  methods: {
    getRestaurantByPosition(options) {
      this.$store.dispatch('startSpinning')

      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords
        fetch('/restaurant?latitude=' + latitude + '&longitude=' + longitude + this.toQueryString(options), { method: 'GET' }).then(response => response.json())
          .then(restaurant => {
            this.$store.dispatch('stopSpinning')
            this.$store.dispatch('loadRestaurant')
            this.$store.dispatch('updateRestaurant', { restaurant })
          })
          .catch((e) => {
            this.$store.dispatch('loadRestaurant')
            this.$store.dispatch('updateRestaurant', {
              restaurant: { name: e, url: 'a/b' }
            })
          })
      })
    },
    toQueryString(options) {
      let query = ''
      for (let key in options) {
        query += '&' + key + '=' + options[key]
      }
      return query
    }
  }
}
</script>
