import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
export default defineNuxtConfig({
  //...
  build: {
    transpile: ['vuetify'],
  },

  components: {
    dirs: [
      '~/components',
      '~/components/new',
      '~/components/new/day',
    ]
  },
  modules: [
    '@pinia/nuxt',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    '@sidebase/nuxt-auth',
  ],
  runtimeConfig: {
    MONGO_DB_URI: process.env.MONGO_DB_URI,
    SIDEBASE_CLIENT: process.env.SIDEBASE_CLIENT,
    SIDEBASE_SECRET: process.env.SIDEBASE_SECRET
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  compatibilityDate: '2024-12-15',
})