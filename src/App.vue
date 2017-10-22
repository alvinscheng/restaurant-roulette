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
      const { startSpin, stopSpin } = spinnerActions()
      startSpin()
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords
        fetch('/restaurant?latitude=' + latitude + '&longitude=' + longitude + this.toQueryString(options), { method: 'GET' }).then(response => response.json())
          .then(restaurant => {
            stopSpin()
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

const spinnerActions = () => {
  const $restaurantName = document.querySelector('#result')
  const $restaurantButton = document.querySelector('#restaurant-btn')
  const $spinner = document.querySelector('#spinner')
  const spinner = document.querySelector('#spinner>i')

  return {
    startSpin() {
      $restaurantName.classList.toggle("hidden")
      $restaurantButton.setAttribute('disabled', '')
      $spinner.classList.toggle("hidden")
      spinner.classList.add("fa-spin")
    },
    stopSpin() {
      $restaurantName.classList.toggle("hidden")
      $spinner.classList.toggle('hidden')
      $restaurantButton.removeAttribute('disabled');
    }
  }
}

</script>
