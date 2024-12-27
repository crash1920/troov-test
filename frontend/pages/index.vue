<template>
  <div class="h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
    <h1 class="text-5xl font-extrabold mb-6">
      Bienvenue 🚀
    </h1>
    <p class="text-lg mb-8">
      Découvrez notre application moderne avec Nuxt 3 et Tailwind CSS.
    </p>
    <div class="flex space-x-4">
    <button
      v-if="!authStore.isLoggedIn"
      @click="navigateTo('/login')"
      class="bg-blue-600 hover:bg-blue-800 text-white py-3 px-6 rounded-lg"
    >
      Se connecter
    </button>
    <button
        v-if="!authStore.isLoggedIn"
        @click="navigateTo('/signup')"
        class="bg-green-600 hover:bg-green-800 text-white py-3 px-6 rounded-lg"
      >
        S'inscrire
      </button>

    <button
      v-else
      @click="logout"
      class="bg-red-600 hover:bg-red-800 text-white py-3 px-6 rounded-lg"
    >
      Se déconnecter
    </button>
  </div>
</div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import { navigateTo } from 'nuxt/app';

const authStore = useAuthStore();

function logout() {
  authStore.logout();
  navigateTo('/login');
}
</script>
