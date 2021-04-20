export const state = () => ({
  audio: '',
  sub: '',
  theme: {},
  initTheme: {
    darktheme: false,
    background: 'white',
    color: 'black',
  },
  loadingTheme: true,

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

  setAudio({ commit }, data) {
    this.$cookies.set('audio',data, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7
    })
  },
  getAudio({ commit }) {
    const audioCookie = this.$cookies.get('audio')
    commit('setState', { audio: audioCookie })
  },
  changeAudio({ commit }) {
    const audioCookie = this.$cookies.get('audio')
    if(audioCookie === 'On'){
      this.dispatch('setAudio', 'Off');
      commit('setState', { audio: 'Off' })
    } else {
      this.dispatch('setAudio', 'On');
      commit('setState', { audio: 'On' })
    }
  },

  setTheme({ commit }, data) {
    console.log('setTheme',data)
    this.$cookies.set('theme',data, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7
    })
  },
  getTheme({ commit }) {
    const themeCookie = this.$cookies.get('theme')
    console.log('getTheme', themeCookie)
    commit('setState', { theme: themeCookie })
    setTimeout(function () {
      commit('setState', { loadingTheme: false })
    }, 200);
  },
  
}

export const mutations = {
  setState(state, params) {
    for (const [key, value] of Object.entries(params)) {
      state[key] = value
    }
  },
}