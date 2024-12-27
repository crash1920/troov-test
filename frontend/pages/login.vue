<template>
  <div class="h-screen flex items-center justify-center bg-gray-900 text-white">
    <div class="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">
      <h1 class="text-4xl font-bold mb-6 text-center">Connexion</h1>

      <form @submit.prevent="login">
        <!-- Nom d'utilisateur -->
        <div class="mb-4">
          <label for="username" class="block text-sm mb-2">Nom d'utilisateur</label>
          <input 
            v-model="username" 
            type="text" 
            id="username"
            placeholder="Entrez votre nom d'utilisateur" 
            class="w-full p-3 bg-gray-700 text-white rounded focus:outline-none border border-gray-700 placeholder-gray-500"
            required 
          />
        </div>

        <!-- Mot de passe -->
        <div class="mb-6 relative">
          <label for="password" class="block text-sm mb-2">Mot de passe</label>
          <input 
            v-model="password"
            :type="showPassword ? 'text' : 'password'" 
            id="password"
            placeholder="Entrez votre mot de passe" 
            class="w-full p-3 bg-gray-700 text-white rounded focus:outline-none border border-gray-700 placeholder-gray-500 pr-12"
            required 
          />
          <button 
            type="button"
            @click="togglePasswordVisibility"
            class="absolute inset-y-0 right-0 px-4 pt-6 flex items-center  text-gray-400 hover:text-white"
          >
            {{ showPassword ? '🙈' : '👁️' }}
          </button>
        </div>

        <!-- Message d'erreur -->
        <p v-if="error" class="text-red-500 mb-4 text-center">{{ error }}</p>

        <!-- Bouton de connexion -->
        <button 
          type="submit" 
          class="w-full bg-blue-600 hover:bg-blue-800 text-white py-3 rounded-lg"
        >
          Se connecter
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { navigateTo } from 'nuxt/app';
import { useRuntimeConfig } from 'nuxt/app';
import { useAuthStore } from '@/stores/auth'; 

const username = ref('');
const password = ref('');
const error = ref(null);
const showPassword = ref(false);
const config = useRuntimeConfig();
const authStore = useAuthStore();

function togglePasswordVisibility() {
  showPassword.value = !showPassword.value;
}

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
      authStore.login(data.token);
      navigateTo('/');
    } else {
      error.value = 'Identifiants incorrects';
    }
  } catch (err) {
    error.value = 'Erreur serveur';
  }
}
</script>
