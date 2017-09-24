const $restaurantButton = document.querySelector('#restaurant-btn')
const $restaurant = document.querySelector('#restaurant')

$restaurantButton.addEventListener('click', () => {
  navigator.geolocation.getCurrentPosition(position => {
    const { latitude, longitude } = position.coords
    fetch('/restaurant?latitude=' + latitude + '&longitude=' + longitude, { method: 'GET' }).then(response => response.json())
      .then(restaurant => {
        $restaurant.appendChild(renderRestaurant(restaurant))
      })
  })
})

function renderRestaurant(restaurant) {
  const { name, url } = restaurant
  const $restaurant = document.createElement('div')

  const $name = document.createElement('a')
  $name.textContent = name
  $name.setAttribute('href', url)

  $restaurant.appendChild($name)
  return $restaurant
}
