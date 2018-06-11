<template>
  <div id="app">
    <v-app light>
      <v-content>
        <section>
          
          <!-- Randomize these images -->
          <v-parallax src="../assets/tacos.jpeg">
            <v-layout
              column
              align-center
              justify-center
              class="white--text"
            >
              <h1 class="white--text mb-2 display-1 text-xs-center">Restaurant Roulette</h1>
              <span class="subheading">
                We'll Tell You Where to Eat!
              </span>
            </v-layout>
          </v-parallax>
        </section>

        <section>
          <v-layout
            column
            wrap
            class="my-5"
            align-center
          >
            <v-flex xs12>
              <v-container grid-list-xl>
                <v-layout row wrap align-center>
                  <v-flex xs12 md4>
                    <v-card class="elevation-0 transparent">
                      <v-card-text class="text-xs-center">
                        <v-icon x-large class="blue--text text--lighten-2">color_lens</v-icon>
                      </v-card-text>
                      <v-card-title primary-title class="layout justify-center">
                        <MainButton :get-restaurant-by-position="getRestaurantByPosition"></MainButton>
                      </v-card-title>
                      <v-card-text>
                        Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare. 
                        Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
                        Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti. 
                      </v-card-text>
                    </v-card>
                  </v-flex>
                  <v-flex xs12 md4>
                    <v-card class="elevation-0 transparent">
                      <v-card-text class="layout justify-center">
                        <Restaurant :get-restaurant-by-position="getRestaurantByPosition"></Restaurant>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                  <v-flex xs12 md4>
                    <v-card class="elevation-0 transparent">
                      <v-card-text class="text-xs-center">
                        <v-icon x-large class="blue--text text--lighten-2">build</v-icon>
                      </v-card-text>
                      <v-card-title primary-title class="layout justify-center">
                        <div class="headline text-xs-center">About Restaurant Roulette</div>
                      </v-card-title>
                      <v-card-text>
                        Have you ever been hungry and couldn't decide where to eat? Plans to hang out with friends ruined due to an inability to choose where to meet?
                        Ended up in relationship-ending arguments with your significant other over your choice in restaurant (or lack thereof)?
                        Well fear no more! Restaurant Roulette is here to make that decision for you.
                        Using your location and the perfect degree of randomness, our algorithm sets to provide you with your optimal restaurant choice!
                        Satisfaction guaranteed or you can press the button again!
                      </v-card-text>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-flex>
          </v-layout>
        </section>

        <!-- <section>
          <v-parallax src="../assets/wings.jpeg">
            <v-layout column align-center justify-center>
              <h3 class="white--text mb-2 display-1 text-xs-center">We'll Tell You Where to Eat!</h3>
            </v-layout>
          </v-parallax>
        </section> -->

        <!-- <section>
          <v-layout
            column
            wrap
            class="my-5"
            align-center
          >
            <MainButton :get-restaurant-by-position="getRestaurantByPosition"></MainButton>
            <Restaurant :get-restaurant-by-position="getRestaurantByPosition"></Restaurant>
            
          </v-layout>
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
