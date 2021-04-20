export const state = () => ({
  audio: '',
  sub: '',
  theme: {},
  initTheme: {
    'darktheme': false,
    'background': 'white',
    'color': 'black',
  },
  loadingTheme: true,
  isChecked: false
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
    console.log('setTheme', data)
    this.$cookies.set('theme',data, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7
    })
  },
  getTheme({ commit }) {
    const themeCookie = this.$cookies.get('theme')
    console.log('getTheme', themeCookie)
    commit('setState', { theme: themeCookie })
    commit('setState', { loadingTheme: false })
  },
  changeTheme({ commit }) {
    const data = this.$cookies.get('theme')
    console.log('changeTheme', data)
    if(data.darktheme){
      const classObject= {
        'darktheme': false,
        'background': 'white',
        'icon': 'sun',
        'color': 'black',
      }
      this.dispatch('setTheme', classObject);
      commit('setState', { theme: classObject })
    } else {
      const classObject= {
        'darktheme': true,
        'background': '#1d2d50',
        'icon': 'moon',
        'color': 'white',
      }
      this.dispatch('setTheme', classObject);
      commit('setState', { theme: classObject })
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
