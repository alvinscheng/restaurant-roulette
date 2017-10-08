const $restaurantButton = document.querySelector('#restaurant-btn')
const $restaurant = document.querySelector('#restaurant')
const $r_image = document.querySelector('#r-image')
const div = document.querySelector('#spinner');

const startSpin = () => {
  $restaurant.innerHTML = "";
  $r_image.innerHTML = "";
  const spinner = document.querySelector('#spinner>i');
  $restaurantButton.setAttribute('disabled', '');
  div.classList.toggle("hidden");
  spinner.classList.add("fa-spin");
  // setTimeout(function() {
  //   console.log('timeout')
  //   showResult();
  // }, 1000)
}
const showResult = (restaurant) => {
  div.classList.toggle("hidden");
  $restaurantButton.removeAttribute('disabled');
  $restaurantButton.textContent = "Not satisfied? Try again!";
  // const restaurant = {
  //   name: "TEST",
  //   url: "/a/b/c"
  // }
  $restaurant.appendChild(renderRestaurant(restaurant))
}

$restaurantButton.addEventListener('click', () => {
  startSpin();
  navigator.geolocation.getCurrentPosition(position => {
    const { latitude, longitude } = position.coords
    const limit = 15
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
  const { name, url, image_url } = restaurant
  const $restaurant = document.createElement('div')

  const $name = document.createElement('a')
  
  $name.textContent = name
  $name.setAttribute('href', url)
  $name.classList.add('result')
  $restaurant.appendChild($name)

  const $img = document.createElement('img')
  $img.classList.add('r-image')
  $img.classList.add('img-fluid')
  $img.classList.add('mx-auto')
  $img.classList.add('d-block')
  $img.setAttribute('src', image_url)
  $r_image.appendChild($img)
  return $restaurant
}
