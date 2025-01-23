import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';
export default defineNuxtConfig({
  ssr: true,
  build: {
    transpile: ['vuetify'],
  },
  css: ['@/assets/css/main.css',],
  plugins: [
    {src: '~/plugins/auth.js', mode: 'client'}
  ],
  components: {
    dirs: [
      '~/components',
    ]
  },
  modules: [
    '@pinia/nuxt',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ],
  runtimeConfig: {
    MONGO_DB_URI: process.env.MONGO_DB_URI,
    JWT_SECRET: process.env.JWT_SECRET,
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