import { transformAssetUrls } from 'vite-plugin-vuetify';
export default defineNuxtConfig({
  ssr: true,
  build: {
  },
  css: ['@/assets/css/main.css',],
  plugins: [
    '~/plugins/initAuth.js'
  ],
  components: {
    dirs: [
      '~/components',
    ]
  },
  modules: [
    '@pinia/nuxt',
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