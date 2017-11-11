import * as mutations from '../../src/store/mutations'

const { UPDATE_RESTAURANT, LOAD_RESTAURANT } = mutations

describe('mutations', () => {

  describe('UPDATE_RESTAURANT', () => {
    it('updates the restaurant', () => {
      const state = { restaurant: { name: 'Old Restaurant' } }
      const restaurant = { name: 'New Restaurant' }
      UPDATE_RESTAURANT(state, { restaurant })
      expect(state.restaurant.name).toBe('New Restaurant')
    })
  })

  describe('LOAD_RESTAURANT', () => {
    it('returns true when a restaurant is loaded', () => {
      const state = { restaurantLoaded: false }
      LOAD_RESTAURANT(state)
      expect(state.restaurantLoaded).toBe(true)
    })
  })

})
