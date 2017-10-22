import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
 state: {
   restaurant: {}
 },
 mutations: {
   UPDATE_RESTAURANT(state) {
     state.restaurant = Object.assign({}, state.newRestaurant)
   }
 },
 actions: {
   updateRestaurant({commit}){
     commit(UPDATE_RESTAURANT)
   }
 }
})
