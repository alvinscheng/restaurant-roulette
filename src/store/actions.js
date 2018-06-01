export const updateRestaurant = ({ commit }, payload) => commit('UPDATE_RESTAURANT', payload)

export const loadRestaurant = ({ commit }) => commit('LOAD_RESTAURANT')

export const startSpinning = ({ commit }) => commit('START_SPINNING')

export const stopSpinning = ({ commit }) => commit('STOP_SPINNING')
