export const UPDATE_RESTAURANT = (state, payload) => {
  state.restaurant = Object.assign({}, payload.restaurant)
}

export const LOAD_RESTAURANT = state => {
  state.restaurantLoaded = true
}

export const START_SPINNING = state => {
  state.isSpinning = true
}

export const STOP_SPINNING = state => {
  state.isSpinning = false
}
