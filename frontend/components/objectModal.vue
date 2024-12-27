<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div class="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg">
      <h2 class="text-2xl font-bold mb-4">
        {{ object ? 'Modifier' : 'Ajouter' }} un Objet
      </h2>
      <form @submit.prevent="saveObject">
        <div class="mb-4">
          <label class="block mb-2">Nom</label>
          <input v-model="objectData.name" required class="w-full p-3 bg-gray-700 rounded" />
        </div>
        <div class="mb-4">
          <label class="block mb-2">Description</label>
          <textarea v-model="objectData.description" class="w-full p-3 bg-gray-700 rounded"></textarea>
        </div>
        <div class="mb-4">
          <label class="block mb-2">URL de l'image</label>
          <input v-model="objectData.imageUrl" type="text" class="w-full p-3 bg-gray-700 rounded" />
        </div>
        <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg">
          Enregistrer
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import { useRuntimeConfig } from 'nuxt/app';

const props = defineProps(['object']);
const emit = defineEmits(['close', 'refresh']);
const config = useRuntimeConfig();

const objectData = ref({
  name: '',
  description: '',
  imageUrl: '',
  ...props.object
});

async function saveObject() {
  const token = localStorage.getItem('token');
  const method = objectData.value._id ? 'PUT' : 'POST';
  const url = `${config.public.apiBase}/objects${objectData.value._id ? '/' + objectData.value._id : ''}`;

  try {
    await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token
      },
      body: JSON.stringify(objectData.value)
    });
    emit('refresh');
    emit('close');
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement de l\'objet', error);
  }
}
</script>
