<template>
    <div class="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 class="text-2xl font-bold text-center">Connexion</h2>
        <form @submit.prevent="login" class="mt-6">
          <div>
            <label for="username" class="block text-sm font-medium text-gray-700">Nom d'utilisateur</label>
            <input v-model="username" type="text" id="username" class="mt-1 w-full p-2 border rounded-lg" required>
          </div>
          <div class="mt-4">
            <label for="password" class="block text-sm font-medium text-gray-700">Mot de passe</label>
            <input v-model="password" type="password" id="password" class="mt-1 w-full p-2 border rounded-lg" required>
          </div>
          <button type="submit" class="w-full bg-blue-500 text-white py-2 px-4 rounded mt-6 hover:bg-blue-700">
            Se connecter
          </button>
          <p v-if="error" class="text-red-500 mt-4 text-center">{{ error }}</p>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { navigateTo } from 'nuxt/app';
  import { useRuntimeConfig } from 'nuxt/app';
  
  const username = ref('');
  const password = ref('');
  const error = ref(null);
  const config = useRuntimeConfig();
  
  async function login() {
    try {
      const response = await fetch(`${config.public.apiBase}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username.value, password: password.value })
      });
      const data = await response.json();
  
      if (response.ok) {
        if (typeof window !== 'undefined') {
          localStorage.setItem('token', data.token);
        }
        navigateTo('/');
      } else {
        error.value = 'Identifiants incorrects';
      }
    } catch (err) {
      error.value = 'Erreur serveur';
    }
  }
  </script>
  