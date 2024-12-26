import { defineNuxtConfig } from 'nuxt/config';
import consola from 'consola';

export default defineNuxtConfig({
  // 🌐 Configuration globale du header HTML
  app: {
    head: {
      title: 'Troov App',
      htmlAttrs: {
        lang: 'en',
        class: 'dark',

      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Troov App for managing objects' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ],
    }
  },

  // 📂 Import automatique des composants
  components: true,

  // 🎨 Global CSS (intégration de Tailwind CSS)
  css: ['@/assets/css/tailwind.css'],

  // 📦 Modules de build (ESLint, Stylelint, etc.)
  buildModules: [
    '@nuxtjs/tailwindcss',
  ],

  // ⚙️ Modules Nuxt (sans axios, avec Tailwind)
  modules: [
    '@nuxtjs/tailwindcss'
  ],

  // 🔗 Configuration pour fetch (remplaçant axios)
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:5000/api'  // L'URL de ton API backend
    }
  },

  // 🚀 Router – Redirection par défaut vers /login
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'login',
        path: '/login',
        component: resolve(__dirname, 'pages/login.vue')  // Chemin vers la page login
      });
    }
  },

  // 🛠️ Hooks pour fixer des erreurs de consola
  hooks: {
    'builder:prepared'() {
      consola.wrapConsole();
    }
  },

  // ⚙️ Configuration de build
  build: {
    transpile: ['ofetch']  // Permet la transpilation de ofetch si nécessaire
  },

  compatibilityDate: '2024-12-25'
});