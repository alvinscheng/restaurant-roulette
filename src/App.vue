<template>
  <div id="app">
    <div class="text-center title">
      <h1>Restaurant Roulette!</h1>
    </div>
    <Restaurant :get-restaurant-by-position="getRestaurantByPosition"></Restaurant>
    <div class="text-center">
      <button class="btn btn-outline-dark" @click="() => getRestaurantByPosition({ limit: 50 })">
        We'll tell you where to eat!
      </button>
    </div>
  </div>
</template>

<script>
import Restaurant from './components/Restaurant.vue'

export default {
  components: {
    Restaurant
  },
  methods: {
    getRestaurantByPosition(options) {
      // startSpin()
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords
        fetch('/restaurant?latitude=' + latitude + '&longitude=' + longitude + this.toQueryString(options), { method: 'GET' }).then(response => response.json())
          .then(restaurant => {
            showResult(restaurant);
          })
          .catch((e) => {
            showResult({
              name: e, url: 'a/b'
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

const $r_image = document.querySelector('#r-image')
const $top_image = document.querySelector('#top-image')
const $top_anchor = document.querySelector('#top-anchor')
const div = document.querySelector('#spinner');

const startSpin = () => {
  $restaurant.innerHTML = "";

  const spinner = document.querySelector('#spinner>i');
  $restaurantButton.setAttribute('disabled', '');
  div.classList.toggle("hidden");
  spinner.classList.add("fa-spin");
}
const showResult = (restaurant) => {
  // div.classList.toggle("hidden");
  // $restaurantButton.removeAttribute('disabled');
  // $restaurantButton.textContent = "Not satisfied? Try again!";
  renderRestaurant(restaurant)
}

function renderRestaurant(restaurant) {
  console.log(restaurant)
  // const { name, url, image_url } = restaurant
  // const $restaurant = document.createElement('div')
  //
  // const $name = document.createElement('a')
  //
  // $name.textContent = name
  // $name.setAttribute('href', url)
  // $name.setAttribute('target', '_blank')
  // $name.classList.add('result')
  // $restaurant.appendChild($name)
  // $top_anchor.setAttribute('href', url)
  // $top_anchor.setAttribute('target', '_blank')
  //
  // $top_image.setAttribute('src', image_url)
  // $top_image.classList.add('replaced')
  //
  // return $restaurant
}

</script>
