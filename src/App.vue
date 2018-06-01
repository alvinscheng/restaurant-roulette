<template>
  <div id="app">
    <v-app light>
      <v-content>
        <section>
          <v-parallax src="../assets/tacos.jpeg">
            <v-layout
              column
              align-center
              justify-center
              class="white--text"
            >
              <h1 class="white--text mb-2 display-1 text-xs-center">Restaurant Roulette</h1>
            </v-layout>
          </v-parallax>
        </section>

        <section>
          <v-parallax src="../assets/wings.jpeg">
            <v-layout column align-center justify-center>
              <h3 class="white--text mb-2 display-1 text-xs-center">You're Hungry</h3>
            </v-layout>
          </v-parallax>
        </section>

        <section>
          <v-parallax src="../assets/burger.jpg">
            <v-layout column align-center justify-center>
              <h3 class="white--text mb-2 display-1 text-xs-center">We'll Tell You Where to Eat!</h3>

              <Restaurant :get-restaurant-by-position="getRestaurantByPosition"></Restaurant>
            <MainButton :get-restaurant-by-position="getRestaurantByPosition"></MainButton>
            </v-layout>
          </v-parallax>
        </section>

        <!-- <section>
          <v-container fluid>
            <Restaurant :get-restaurant-by-position="getRestaurantByPosition"></Restaurant>
            <MainButton :get-restaurant-by-position="getRestaurantByPosition"></MainButton>
          </v-container>
        </section> -->

      </v-content>
      <!-- <v-footer app></v-footer> -->
    </v-app>
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
