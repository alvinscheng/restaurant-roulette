const $restaurantButton = document.querySelector('#restaurant-btn')
const $secretButton = document.querySelector('#secret-btn')
const $restaurant = document.querySelector('#restaurant')
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
  div.classList.toggle("hidden");
  $restaurantButton.removeAttribute('disabled');
  $restaurantButton.textContent = "Not satisfied? Try again!";
  $restaurant.appendChild(renderRestaurant(restaurant))
}

$restaurantButton.addEventListener('click', () => {
  startSpin();
  navigator.geolocation.getCurrentPosition(position => {
    const { latitude, longitude } = position.coords
    const limit = 50
    fetch('/restaurant?latitude=' + latitude + '&longitude=' + longitude + '&limit=' + limit, { method: 'GET' }).then(response => response.json())
      .then(restaurant => {
        showResult(restaurant);
      })
      .catch((e) => {
        showResult({
          name: e, url: 'a/b'
        })
      })
  })
})

$secretButton.addEventListener('click', () => {
  startSpin();
  navigator.geolocation.getCurrentPosition(position => {
    const { latitude, longitude } = position.coords
    const limit = 50
    fetch('/restaurant?latitude=' + latitude + '&longitude=' + longitude + '&limit=' + limit + '&mode=party', { method: 'GET' }).then(response => response.json())
      .then(restaurant => {
        showResult(restaurant);
      })
      .catch((e) => {
        showResult({
          name: e, url: 'a/b'
        })
      })
  })
})

function renderRestaurant(restaurant) {
  const { name, url, image_url } = restaurant
  const $restaurant = document.createElement('div')

  const $name = document.createElement('a')

  $name.textContent = name
  $name.setAttribute('href', url)
  $name.setAttribute('target', '_blank')
  $name.classList.add('result')
  $restaurant.appendChild($name)
  $top_anchor.setAttribute('href', url)
  $top_anchor.setAttribute('target', '_blank')

  $top_image.setAttribute('src', image_url)
  $top_image.classList.add('replaced')

  return $restaurant
}
