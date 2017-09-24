const $restaurantButton = document.querySelector('#restaurant-btn')
const $restaurant = document.querySelector('#restaurant')

$restaurantButton.addEventListener('click', () => {
  navigator.geolocation.getCurrentPosition(position => {
    const { latitude, longitude } = position.coords
    fetch('/restaurant?latitude=' + latitude + '&longitude=' + longitude, { method: 'GET' }).then(response => response.json())
      .then(restaurant => {
        console.log(restaurant)
        $restaurant.textContent = restaurant.name
      })
  })
})
