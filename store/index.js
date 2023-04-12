export const state = () => ({
    counter: 1
  })
  
  export const getters = {
    getCounter(state) {
      return state.counter
    }
  }
  
  export const mutations = {
    increment(state) {
      state.counter++
    }
  }
  
  export const actions = {
    async get({ commit }) {
        const t = await this.$axios.$get('https://api.nuxtjs.dev/posts/2')
        console.log(t)
    }
  }