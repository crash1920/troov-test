<template>
    <div class="min-h-screen bg-gray-900 text-white">
      <div class="container mx-auto p-6">
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-3xl font-bold">Mes Objets</h1>
          <button 
            @click="openAddModal"
            class="flex items-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            <span class="mr-2">+</span> Ajouter un Objet
          </button>
        </div>
  
        <!-- Barre de recherche -->
        <div class="mb-6">
          <input 
            v-model="searchQuery"
            type="text"
            placeholder="Rechercher un objet..."
            class="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>
  
        <div v-if="objectStore.loading" class="text-center text-gray-500">
          Chargement...
        </div>
  
        <div v-else>
          <div v-if="filteredObjects.length === 0" class="text-center text-gray-500">
            Aucun objet trouvé.
          </div>
  
          <div v-else>
            <ul class="divide-y divide-gray-700">
              <li 
                v-for="object in filteredObjects" 
                :key="object._id" 
                class="py-6 flex justify-between items-center bg-gray-800 px-4 rounded-lg mb-4 shadow-lg"
              >
                <div>
                  <h3 class="text-xl font-semibold">{{ object.name }}</h3>
                  <p class="text-gray-400">{{ object.description }}</p>
                </div>
                <div class="flex space-x-4">
                  <button
                    @click="editObject(object)"
                    class="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded"
                  >
                    Modifier
                  </button>
                  <button
                    @click="objectStore.deleteObject(object._id)"
                    class="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                  >
                    Supprimer
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
  
        <!-- Modal -->
        <ObjectModal
          v-if="showModal"
          :object="selectedObject"
          @close="closeModal"
          @refresh="objectStore.fetchObjects"
        />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import { useObjectStore } from '@/stores/object';
  import ObjectModal from '@/components/objectModal.vue';
  
  const objectStore = useObjectStore();
  const showModal = ref(false);
  const selectedObject = ref(null);
  const searchQuery = ref('');
  
  // Charger les objets lors du montage
  onMounted(() => {
    objectStore.fetchObjects();
  });
  
  // Filtrage des objets en fonction de la recherche
  const filteredObjects = computed(() => {
    return objectStore.objects.filter((object) =>
      object.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });
  
  // Ouvrir la modal pour ajouter un objet
  function openAddModal() {
    selectedObject.value = null;
    showModal.value = true;
  }
  
  // Ouvrir la modal pour modifier un objet
  function editObject(object) {
    selectedObject.value = object;
    showModal.value = true;
  }
  
  // Fermer la modal
  function closeModal() {
    showModal.value = false;
  }
  </script>
  
  <style>
  html, body {
    @apply bg-gray-900;
    margin: 0;
    padding: 0;
  }
  input::placeholder {
    color: #9ca3af;
  }
  </style>
  