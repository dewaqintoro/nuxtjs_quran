export const state = () => ({
  theme: 'light',
})
export const mutations = {
  setTheme(state, n) {
    state.theme = n
  },
}
