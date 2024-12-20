// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  app:{
    head:{
      title:'CriptoInfo',
      meta:[
        { name:'description', content:'Everything about Cripto'}
      ],
      link:[
        {rel:'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Golos+Text:wght@400;500;600;700;800;900&display=swap'},
        {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
      ]
    }
  },

  modules: ['@pinia/nuxt', '@nuxt/image','@nuxtjs/i18n'],
  runtimeConfig:{
    public: {
      apiKey: process.env.API_KEY,
      apiUrl1:process.env.API_URL1,
      apiUrl2:process.env.APY_URL2,
    }
  }
})