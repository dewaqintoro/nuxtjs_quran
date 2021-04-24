export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  configureWebpack: config => {
      config.output.globalObject = "this"
  },
  head: {
    title: 'Al-Quran',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      // { "http-equiv": 'Content-Security-Policy', content: 'upgrade-insecure-requests'},
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  // render: {
  //   csp: true
  // },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/material.css',
  ],
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {src: '@/plugins/axios' },
    {src: '@/plugins/global.ts', ssr: false},
    {src: '@/plugins/pagination.ts', ssr: false},
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  // components: true,
  components: [{ path: '~/components' }],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/composition-api',
    '@nuxtjs/fontawesome',
    '@nuxt/typescript-build',
    '@nuxtjs/pwa',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['cookie-universal-nuxt', '@nuxtjs/axios',],

  // axios: {},
  http: {
    proxy: true // Can be also an object with default options
  },
  // proxy: {
  //   '/api/v1': { target: 'https://api.rajaongkir.com', pathRewrite: {'^/api/v1': ''}, changeOrigin: true }
  // },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    loaders: {
      vue: {
        transformAssetUrls: {
          audio: 'src'
        }
      }
    },

    extend(config, ctx) {
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      })
    }
  },
  fontawesome: {
    icons: {
      solid: true,
      brands: true
    }
  },
  generate: {
    fallback: true
  }
}
