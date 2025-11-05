<template>
  <div class="space-y-2 relative">
    <label class="font-medium text-gray-700">Selecionar Cliente</label>

    <input
      type="text"
      v-model="query"
      @input="debouncedSearch"
      placeholder="Digite nome, email ou username..."
      class="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
    />

    <ul
      v-if="showDropdown"
      class="absolute z-50 w-full bg-white border rounded shadow max-h-60 overflow-y-auto mt-1"
    >
      <li
        v-for="user in users || []"
        :key="user.id"
        @click="selectUser(user)"
        class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
      >
        {{ user.name || "Usuário sem nome" }} — {{ user.email }}
      </li>

      <li v-if="loading" class="px-4 py-2 text-gray-500">Carregando...</li>
      <li
        v-if="!loading && (users?.length || 0) === 0"
        class="px-4 py-2 text-gray-500"
      >
        Nenhum usuário encontrado
      </li>
    </ul>

    <div v-if="selectedUser" class="mt-2 text-sm text-gray-600">
      Selecionado: {{ selectedUser.name || "Usuário sem nome" }} — {{ selectedUser.email }}
      <button @click="clearUser" class="ml-2 text-red-500 hover:underline">Remover</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import UserService from '@/api/usuario/user'
import _ from 'lodash'

const emit = defineEmits(['update:selected'])

const users = ref([])
const query = ref('')
const selectedUser = ref(null)
const showDropdown = ref(false)
const loading = ref(false)
const userService = new UserService()

async function searchUsers() {
  if (!query.value || query.value.trim() === '') {
    users.value = []
    showDropdown.value = false
    return
  }

  loading.value = true
  try {
    // Usar getAll e garantir URL correta
    const data = await userService.getAll({ search: query.value })
    users.value = data?.results || []
    showDropdown.value = true
  } catch (error) {
    console.error('Erro ao buscar usuários:', error)
    users.value = []
    showDropdown.value = false
  } finally {
    loading.value = false
  }
}

// Debounce para evitar muitas requisições
const debouncedSearch = _.debounce(searchUsers, 300)

function selectUser(user) {
  selectedUser.value = user
  showDropdown.value = false
  users.value = []
  emit('update:selected', user)
}

function clearUser() {
  selectedUser.value = null
  query.value = ''
  emit('update:selected', null)
}
</script>
