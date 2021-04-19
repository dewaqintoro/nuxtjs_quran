export const state = () => ({
  theme: {
    background: 'white',
    color: 'black',
  },
})
export const mutations = {
  setTheme(state, n) {
    console.log('n', n)
    state.theme = n
  },
}
