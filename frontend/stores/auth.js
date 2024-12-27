import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore('auth', () => {
  const isLoggedIn = ref(false);
  const router = useRouter();

  function checkAuth() {
    if (typeof window !== 'undefined') {
      isLoggedIn.value = !!localStorage.getItem('token');
    }
  }

  function login(token) {
    localStorage.setItem('token', token);
    isLoggedIn.value = true;
    window.dispatchEvent(new Event('auth-changed'));  // Déclenche un événement global
    router.push('/');  // Redirection vers l'accueil après connexion
  }

  function logout() {
    localStorage.removeItem('token');
    isLoggedIn.value = false;
    window.dispatchEvent(new Event('auth-changed'));  // Déclenche un événement global
    router.push('/login');
  }

  return {
    isLoggedIn,
    checkAuth,
    login,
    logout,
  };
});
