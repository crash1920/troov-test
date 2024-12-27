module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',              // Règles JavaScript de base
    'plugin:vue/vue3-essential',       // Linting essentiel pour Vue 3
    'plugin:prettier/recommended',     // Intégration avec Prettier
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  rules: {
    // === RÈGLES DE BASE ===
    'no-unused-vars': ['warn', {       // Warning au lieu d'erreur pour les variables inutilisées
      vars: 'all',
      args: 'none',
    }],
    'no-undef': 'off',                 // Désactive l'erreur sur les variables globales non définies (navigateTo, etc.)
    'no-console': 'warn',              // Console autorisé en dev (warning uniquement)
    'no-debugger': 'warn',             // Debugger autorisé en dev (warning uniquement)
    'no-constant-condition': 'off',    // Conditions constantes autorisées (utile pour while(true))
    'no-useless-escape': 'off',        // Désactive les erreurs d'échappement inutiles

    // === RÈGLES VUE ===
    'vue/multi-word-component-names': 'off',  // Autorise les noms de composants en un seul mot
    'vue/script-setup-uses-vars': 'off',      // Désactive l'erreur si une variable est définie mais non utilisée dans <script setup>

    // === FORMATAGE ET STYLE ===
    'prettier/prettier': ['warn', {            // Prettier en warning (ne bloque pas la compilation)
      singleQuote: true,
      semi: false,
      trailingComma: 'es5',
      endOfLine: 'auto',
    }],
    
    // === JEST (Tests) ===
    'jest/no-disabled-tests': 'warn',          // Warn si un test est désactivé
    'jest/no-focused-tests': 'error',          // Erreur si un test est ciblé (it.only)
    'jest/no-identical-title': 'error',        // Interdit les titres de test identiques
  },
  globals: {
    defineNuxtRouteMiddleware: 'readonly',     // Définir les globales pour éviter les no-undef
    navigateTo: 'readonly',
    useAuthStore: 'readonly',
    definePageMeta: 'readonly',
    useFetch: 'readonly',
  },
};
