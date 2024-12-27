<template>
    <div class="h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 class="text-4xl font-bold mb-6">Créer un compte</h1>
      
      <form @submit.prevent="register" class="w-96 bg-gray-800 p-6 rounded-lg shadow-lg">
        
        <!-- Nom d'utilisateur -->
        <div class="mb-4">
          <label class="block text-sm mb-2" for="username">Nom d'utilisateur</label>
          <input
            id="username"
            v-model="username"
            type="text"
            required
            placeholder="Entrez votre nom"
            class="w-full p-3 bg-gray-700 text-white rounded focus:outline-none"
          />
        </div>
  
        <!-- Mot de passe avec icône de hide/show -->
        <div class="mb-4 relative">
          <label class="block text-sm mb-2" for="password">Mot de passe</label>
          <input
            :type="showPassword ? 'text' : 'password'"
            v-model="password"
            required
            placeholder="Créez un mot de passe"
            class="w-full p-3 bg-gray-700 text-white rounded focus:outline-none pr-12"
          />
          <button 
            type="button"
            @click="togglePasswordVisibility"
            class="absolute inset-y-0 right-0 px-4 pt-6 flex items-center justify-center text-gray-400 hover:text-white"
          >
            {{ showPassword ? '🙈' : '👁️' }}
          </button>
        </div>
  
        <!-- Confirmation du mot de passe avec icône de hide/show -->
        <div class="mb-4 relative">
          <label class="block text-sm mb-2" for="confirm-password">Confirmer le mot de passe</label>
          <input
            :type="showConfirmPassword ? 'text' : 'password'"
            v-model="confirmPassword"
            required
            placeholder="Confirmez votre mot de passe"
            class="w-full p-3 bg-gray-700 text-white rounded focus:outline-none pr-12"
          />
          <button 
            type="button"
            @click="toggleConfirmPasswordVisibility"
            class="absolute inset-y-0 right-0 px-4 pt-6 flex items-center justify-center text-gray-400 hover:text-white"
          >
            {{ showConfirmPassword ? '🙈' : '👁️' }}
          </button>
        </div>
  
        <!-- Message d'erreur -->
        <p v-if="error" class="text-red-400 mb-4">{{ error }}</p>
  
        <!-- Bouton de soumission -->
        <button
          type="submit"
          class="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg"
        >
          S'inscrire
        </button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { navigateTo } from 'nuxt/app';
  import { useRuntimeConfig } from 'nuxt/app';
  
  const username = ref('');
  const password = ref('');
  const confirmPassword = ref('');
  const error = ref(null);
  const showPassword = ref(false);
  const showConfirmPassword = ref(false);
  const config = useRuntimeConfig();
  
  // Regex pour un mot de passe sécurisé
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  
  // Afficher/masquer le mot de passe
  function togglePasswordVisibility() {
    showPassword.value = !showPassword.value;
  }
  
  // Afficher/masquer la confirmation du mot de passe
  function toggleConfirmPasswordVisibility() {
    showConfirmPassword.value = !showConfirmPassword.value;
  }
  
  async function register() {
    if (!passwordRegex.test(password.value)) {
      error.value = 'Le mot de passe doit contenir au moins 8 caractères, une majuscule, un chiffre et un caractère spécial.';
      return;
    }
  
    if (password.value !== confirmPassword.value) {
      error.value = 'Les mots de passe ne correspondent pas.';
      return;
    }
  
    try {
      const response = await fetch(`${config.public.apiBase}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username.value,
          password: password.value
        })
      });
  
      const data = await response.json();
  
      if (response.ok) {
        navigateTo('/login');
      } else {
        error.value = data.message || 'Erreur lors de l\'inscription';
      }
    } catch (err) {
      error.value = 'Erreur de connexion au serveur';
    }
  }
  </script>
  