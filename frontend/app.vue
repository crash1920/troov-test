<template>
  <div>
    <nav class="bg-gray-800 p-4">
      <div class="container mx-auto flex justify-between items-center">
        <h1 @click="goToHome" class="text-2xl font-bold text-white cursor-pointer">
          Mon application
        </h1>
        <div v-if="authStore.isLoggedIn">
          <button @click="navigateTo('/objects')" class="ml-4 bg-blue-500 text-white py-2 px-4 rounded">
            Mes Objets
          </button>
        </div>
      </div>
    </nav>
    <NuxtPage />
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { navigateTo } from 'nuxt/app';

const authStore = useAuthStore();

onMounted(() => {
  authStore.checkAuth();

  // Écoute les changements d'authentification
  window.addEventListener('auth-changed', authStore.checkAuth);
});

onBeforeUnmount(() => {
  // Nettoyage de l'écouteur pour éviter les fuites de mémoire
  window.removeEventListener('auth-changed', authStore.checkAuth);
});

function goToHome() {
  navigateTo('/');
}
</script>
