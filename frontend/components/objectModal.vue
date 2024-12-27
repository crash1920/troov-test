<template>
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 class="text-2xl font-bold mb-4 text-white">
          {{ object ? 'Modifier l\'objet' : 'Ajouter un Objet' }}
        </h2>
  
        <form @submit.prevent="submitForm">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-400">Nom</label>
            <input
              v-model="form.name"
              type="text"
              required
              class="mt-1 block w-full p-2 border rounded-lg bg-gray-700 text-white"
            />
          </div>
  
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-400">Description</label>
            <textarea
              v-model="form.description"
              required
              class="mt-1 block w-full p-2 border rounded-lg bg-gray-700 text-white"
            ></textarea>
          </div>
  
          <div class="flex justify-end space-x-4">
            <button
              type="button"
              @click="$emit('close')"
              class="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded"
            >
              Annuler
            </button>
            <button
              type="submit"
              class="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  import { useRuntimeConfig } from 'nuxt/app';
  
  const props = defineProps(['object']);
  const emit = defineEmits(['close', 'refresh']);
  const form = ref({ name: '', description: '' });
  const config = useRuntimeConfig();
  
  watch(
    () => props.object,
    (newVal) => {
      if (newVal) {
        form.value = { ...newVal };
      } else {
        form.value = { name: '', description: '' };
      }
    },
    { immediate: true }
  );
  
  async function submitForm() {
    const token = localStorage.getItem('token');
  
    const method = props.object ? 'PUT' : 'POST';
    const url = props.object
      ? `${config.public.apiBase}/objects/${props.object._id}`
      : `${config.public.apiBase}/objects`;
  
    await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
      body: JSON.stringify(form.value),
    });
  
    emit('close');
    emit('refresh');
  }
  </script>
  