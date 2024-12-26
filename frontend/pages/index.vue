<template>
  <div class="h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
    <h1 class="text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
      Bienvenue 🚀
    </h1>
    <p class="text-lg text-gray-600 dark:text-gray-300 mb-8">
      Découvrez notre application moderne avec Nuxt 3 et Tailwind CSS.
    </p>

    <button
      v-if="!isLoggedIn"
      @click="navigateTo('/login')"
      class="bg-blue-600 hover:bg-blue-800 text-white py-3 px-6 rounded-lg text-lg shadow-lg"
    >
      Se connecter
    </button>
    
    <button
      v-else
      @click="logout"
      class="bg-red-600 hover:bg-red-800 text-white py-3 px-6 rounded-lg text-lg shadow-lg"
    >
      Se déconnecter
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { navigateTo } from 'nuxt/app';

const isLoggedIn = ref(false);

onMounted(() => {
  if (typeof window !== 'undefined') {
    // Protéger l'accès à localStorage (uniquement côté client)
    isLoggedIn.value = !!localStorage.getItem('token');
  }
});

function logout() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    isLoggedIn.value = false;
    navigateTo('/login');
  }
}
</script>
