import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    restaurant: {}
  },
  mutations: {
    UPDATE_RESTAURANT(state, payload) {
      console.log(payload)
      // state.restaurant = payload.restaurant
    }
  },
  actions: {
    updateRestaurant({commit}, payload){
      console.log(commit)
      commit(UPDATE_RESTAURANT, payload)
    }
  },
  getters: {
    restaurant: state => state.restaurant
  }
})

export default store
