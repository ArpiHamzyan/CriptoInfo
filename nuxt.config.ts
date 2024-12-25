// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  image: {
    dir: "assets/images",
  },

  app:{
    head:{
      link:[
        { rel:'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Golos+Text:wght@400;500;600;700;800;900&display=swap'},
        { rel: 'icon', type: 'image/png', href: '/_nuxt/assets/images/favicon.png' }
      ]
    }
  },

  modules: ['@pinia/nuxt', '@nuxt/image','@nuxtjs/i18n'],
  runtimeConfig:{
    public: {
      apiKey: process.env.API_KEY,
      cripto_api:process.env.CRIPTO_API,
      coins_api:process.env.COINS_API,
    }
  }
})