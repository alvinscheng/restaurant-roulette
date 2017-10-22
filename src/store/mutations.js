export const UPDATE_RESTAURANT = (state, payload) => {
  state.restaurant = Object.assign({}, payload.restaurant)
}
