import * as getters from '../../src/store/getters'

describe('getters', () => {

  it('gets the restaurant', () => {
    const state = { restaurant: { name: 'McDonalds' } }
    const result = getters.restaurant(state)
    expect(result).toEqual(state.restaurant)
  })

  it('gets the value of restaurantLoaded', () => {
    const state = { restaurantLoaded: true }
    const result = getters.restaurantLoaded(state)
    expect(result).toBe(true)
  })

})
