const $restaurantButton = document.querySelector('#restaurant-btn')
const $restaurant = document.querySelector('#restaurant')
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
    const limit = 30
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

function renderRestaurant(restaurant) {
  const { name, url } = restaurant
  const $restaurant = document.createElement('div')
  const $name = document.createElement('a')
  $name.textContent = name
  $name.setAttribute('href', url)
  $name.classList.add('result')
  $restaurant.appendChild($name)
  return $restaurant
}


window.onload = function() {
  $restaurantButton.click();
};
