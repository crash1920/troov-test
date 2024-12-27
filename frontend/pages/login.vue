<template>
  <div class="h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
    <h1 class="text-4xl font-bold mb-8">Connexion</h1>
    <form @submit.prevent="login" class="w-full max-w-md">
      <div class="mb-4">
        <input 
          v-model="username" 
          type="text" 
          placeholder="Nom d'utilisateur" 
          class="w-full p-3 bg-gray-800 border border-gray-700 rounded" 
          required 
        />
      </div>
      <div class="mb-4">
        <input 
          v-model="password" 
          type="password" 
          placeholder="Mot de passe" 
          class="w-full p-3 bg-gray-800 border border-gray-700 rounded" 
          required 
        />
      </div>
      <p v-if="error" class="text-red-500 mb-4">{{ error }}</p>
      <button 
        type="submit" 
        class="w-full bg-blue-600 hover:bg-blue-800 text-white py-3 rounded-lg"
      >
        Se connecter
      </button>
    </form>
  </div>
</template>
  
<script setup>
import { ref } from 'vue';
import { navigateTo } from 'nuxt/app';
import { useRuntimeConfig } from 'nuxt/app';
import { useAuthStore } from '@/stores/auth';  // Utilisation du store Pinia

const username = ref('');
const password = ref('');
const error = ref(null);
const config = useRuntimeConfig();
const authStore = useAuthStore();

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
      authStore.login(data.token);  // Stocke le token via Pinia
      navigateTo('/');  // Redirige vers la page d'accueil
    } else {
      error.value = 'Identifiants incorrects';
    }
  } catch (err) {
    error.value = 'Erreur serveur';
  }
}
</script>
  