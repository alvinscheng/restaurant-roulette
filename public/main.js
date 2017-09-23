const $restaurantButton = document.querySelector('#restaurant-btn')
const $restaurant = document.querySelector('#restaurant')

$restaurantButton.addEventListener('click', () => {
  fetch('/restaurant', { method: 'GET' }).then(response => response.json())
    .then(restaurant => {
      console.log(restaurant)
      $restaurant.textContent = restaurant.name
    })
})
