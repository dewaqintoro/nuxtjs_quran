export const state = () => ({
  audio: 'On',
  sub: '',
  theme: {},
})

export const actions = {
  setSub({ commit }, data) {
    this.$cookies.set('sub',data, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7
    })
  },
  getSub({ commit }) {
    const subCookie = this.$cookies.get('sub')
    commit('setState', { sub: subCookie })
  },
  changeSub({ commit }) {
    const subCookie = this.$cookies.get('sub')
    if(subCookie === 'On'){
      this.dispatch('setSub', 'Off');
      commit('setState', { sub: 'Off' })
    } else {
      this.dispatch('setSub', 'On');
      commit('setState', { sub: 'On' })
    }
  },
  
}

export const mutations = {
  setState(state, params) {
    for (const [key, value] of Object.entries(params)) {
      state[key] = value
    }
  },
}
