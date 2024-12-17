import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
export default defineNuxtConfig({
  //...
  build: {
    transpile: ['vuetify'],
  },
<<<<<<< HEAD
  components: {
    dirs: [
      '~/components', // Main components folder
      '~/components/new', // Include any subdirectories you want to auto-import from
      // Add more folders if needed
    ]
  },

>>>>>>> 449f854de95e6815f731e83e4778951ee9bdcd05
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ],
<<<<<<< HEAD
  runtimeConfig: {
    MONGO_URI: process.env.MONGO_URI
  },
=======

>>>>>>> 449f854de95e6815f731e83e4778951ee9bdcd05
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },

<<<<<<< HEAD
  compatibilityDate: '2024-12-14',
=======
  compatibilityDate: '2024-12-15',
>>>>>>> 449f854de95e6815f731e83e4778951ee9bdcd05
})