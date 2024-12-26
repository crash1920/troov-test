<template>
    <div>
      <nav class="bg-gray-800 p-4">
        <div class="container mx-auto flex justify-between items-center">
          <!-- Titre cliquable pour redirection vers l'accueil -->
          <h1 @click="goToHome" class="text-2xl font-bold text-white cursor-pointer">
            Mon application
          </h1>
  
        </div>
      </nav>
  
      <!-- Contenu de la page -->
      <NuxtPage />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { navigateTo } from 'nuxt/app';
  
  // Détecter si l'utilisateur est connecté
  const isLoggedIn = ref(false);
  
  onMounted(() => {
    if (typeof window !== 'undefined') {
      isLoggedIn.value = !!localStorage.getItem('token');
    }
  });
  
  // Redirection vers la page d'accueil
  function goToHome() {
    navigateTo('/');
  }
  
  // Déconnexion de l'utilisateur
  function logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      isLoggedIn.value = false;
      navigateTo('/login');
    }
  }
  </script>
  