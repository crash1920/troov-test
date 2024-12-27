import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRuntimeConfig } from 'nuxt/app';

export const useObjectStore = defineStore('object', () => {
  const objects = ref([]);
  const loading = ref(true);
  const config = useRuntimeConfig();

  async function fetchObjects() {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch(`${config.public.apiBase}/objects`, {
        headers: {
          'x-auth-token': token,
        },
      });
      const data = await response.json();
      objects.value = data;
    } catch (error) {
      console.error('Erreur lors du chargement des objets', error);
    } finally {
      loading.value = false;
    }
  }

  async function deleteObject(id) {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      await fetch(`${config.public.apiBase}/objects/${id}`, {
        method: 'DELETE',
        headers: {
          'x-auth-token': token,
        },
      });
      fetchObjects();
    } catch (error) {
      console.error("Erreur lors de la suppression de l'objet", error);
    }
  }

  return {
    objects,
    loading,
    fetchObjects,
    deleteObject,
  };
});
