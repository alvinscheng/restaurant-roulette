<template>
  <div id="app">
    <v-app light>
      <v-content>
        <section>   
          <v-parallax :src="'../assets/' + randomImage">
            <v-layout
              column
              align-center
              justify-center
              class="white--text"
            >
              <h1 class="white--text mb-2 display-3 font-weight-medium text-xs-center">Restaurant Roulette</h1>
              <span class="subheading font-italic">
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
                      <v-card-title primary-title class="layout justify-center">
                        <MainButton :get-restaurant-by-position="getRestaurantByPosition"></MainButton>
                      </v-card-title>
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

        <section>
          <v-footer
            dark
            height="auto"
          >
            <v-layout
              justify-center
              row
              wrap
            >
              <v-btn
                class="mx-3"
                dark
                icon
                href="https://www.linkedin.com/in/alvin-cheng-69161313a"
              >
                <v-icon size="24px">fab fa-linkedin</v-icon>
              </v-btn>

              <v-btn
                class="mx-3"
                dark
                icon
                href="https://www.github.com/alvinscheng"
              >
                <v-icon size="24px">fab fa-github</v-icon>
              </v-btn>

              <v-btn
                class="mx-3"
                dark
                icon
                href="https://alvinsfastfoodchronicles.wordpress.com"
              >
                <v-icon size="24px">fab fa-wordpress</v-icon>
              </v-btn>
            </v-layout>
          </v-footer>
        </section>
      </v-content>
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
  data() {
    return {
      zip: null
    }
  },
  computed: {
    randomImage() {
      const images = ['tacos.jpeg', 'burger.jpg', 'wings.jpeg']
      const randomIndex = Math.floor(images.length * Math.random())
      return images[randomIndex]
    }
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
      }, err => {
        if (!this.zip) {
          this.zip = prompt('Enter your zip code')
        }
        fetch('/restaurant?location=' + this.zip + this.toQueryString(options), { method: 'GET' }).then(response => response.json())
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
