import { transformAssetUrls } from 'vite-plugin-vuetify';
export default defineNuxtConfig({
  ssr: true,
  buildModules: [
    '@nuxtjs/date-fns',
  ],
  css: ['@/assets/css/main.css',],
  plugins: [
    // '~/plugins/initAuth.js'
  ],
  modules: [
    '@pinia/nuxt',
  ],
  runtimeConfig: {
    mongoDbUri: process.env.MONGO_DB_URI,
    jwtSecret: process.env.JWT_SECRET,
    adminEmail: process.env.ADMIN_EMAIL,
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