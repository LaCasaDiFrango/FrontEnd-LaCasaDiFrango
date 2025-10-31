<script setup>
import { ref, watch } from 'vue'

// Props
const props = defineProps({
  show: { type: Boolean, required: true },
  item: { type: Object, default: () => ({}) },
  dataKey: { type: String, required: true },
  modalTitle: { type: String, default: '' },
  startEditing: { type: Boolean, default: false },
})

// Emits
const emit = defineEmits(['close', 'save'])

// Estado local
const isEditing = ref(false)
const editedItem = ref({})

// Mapas de exibição
const statusMap = { 1: 'Carrinho', 2: 'Realizado', 3: 'Pago', 4: 'Entregue' }
const perfilMap = { administrador: 'Administrador', usuario: 'Usuário' }

// Formatação
const formatPrice = (val) => Number(val ?? 0).toFixed(2).replace('.', ',')

// Classes de badge
const statusBadgeClass = (status) => ({
  'bg-yellow-200 text-yellow-800': status === 1,
  'bg-blue-200 text-blue-800': status === 2,
  'bg-green-200 text-green-800': status === 3,
  'bg-emerald-300 text-emerald-800': status === 4,
})

const perfilBadgeClass = (perfil) => ({
  'bg-emerald-200 text-emerald-800': perfil === 'administrador',
  'bg-blue-200 text-blue-800': perfil === 'usuario',
})

// Alternar edição
const toggleEdit = () => {
  if (!isEditing.value) {
    editedItem.value = JSON.parse(JSON.stringify(props.item))
  } else {
    emit('save', editedItem.value)
  }
  isEditing.value = !isEditing.value
}

// Cancelar edição (volta ao estado original)
const cancelEdit = () => {
  editedItem.value = JSON.parse(JSON.stringify(props.item))
  isEditing.value = false
}

watch(
  () => props.show,
  (val) => {
    if (val) {
      isEditing.value = props.startEditing
      editedItem.value = JSON.parse(JSON.stringify(props.item))
    } else {
      isEditing.value = false
    }
  }
)

</script>

<template>
    <transition name="fade">
  <div v-if="show" class="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
    <div class="relative bg-white rounded-2xl shadow-xl p-8 w-[750px] max-h-[90vh] flex flex-col">
      
      <!-- Botão fechar -->
      <button
        @click="$emit('close')"
        class="absolute top-3 right-3 p-2 rounded-full bg-gray-300 hover:bg-gray-400 transition"
        title="Fechar"
      >
        <img class="w-5 h-auto" src="@/assets/img/icons/close.svg" alt="Fechar" />
      </button>

      <!-- Cabeçalho -->
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-xl font-semibold">{{ modalTitle }}</h3>
        
        <div class="flex gap-3 mr-4">
          <button
            v-if="isEditing"
            @click="cancelEdit"
            class="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold transition"
          >
            Cancelar
          </button>

          <button
            @click="toggleEdit"
            class="px-4 py-2 rounded-lg text-white font-semibold transition flex items-center gap-2"
            :class="isEditing ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'"
          >
            <img
              v-if="!isEditing"
              src="@/assets/img/icons/edit-black.svg"
              class="w-4 h-4 invert"
            />
            {{ isEditing ? 'Salvar' : 'Editar' }}
          </button>
        </div>
      </div>

      <!-- Conteúdo -->
      <div class="flex-1 overflow-y-auto space-y-4">
        <!-- Pedido -->
<!-- Pedido -->
<template v-if="dataKey === 'pedidos' && item?.itens?.length">
  <div class="space-y-3">
    <div class="flex items-center gap-2">
      <span class="font-semibold text-gray-700">Usuário:</span>
      <template v-if="!isEditing">
        <span class="text-gray-600">{{ item.usuario }}</span>
      </template>
      <template v-else>
        <div class="relative flex items-center group">
          <input v-model="editedItem.usuario" class="border rounded-lg px-2 py-1" />
          <img
            src="@/assets/img/icons/edit-black.svg"
            alt="Editar"
            class="w-4 h-4 absolute right-2 opacity-70 cursor-pointer transition-transform group-hover:scale-110"
          />
        </div>
      </template>
    </div>

    <div class="flex items-center gap-2">
      <span class="font-semibold text-gray-700">Status:</span>
      <template v-if="!isEditing">
        <span
          class="ml-1 px-3 py-1 rounded-full text-xs font-semibold"
          :class="statusBadgeClass(item.status)"
        >
          {{ statusMap[item.status] }}
        </span>
      </template>
      <template v-else>
        <select v-model="editedItem.status" class="border rounded-lg px-2 py-1">
          <option v-for="(label, key) in statusMap" :key="key" :value="Number(key)">
            {{ label }}
          </option>
        </select>
      </template>
    </div>
  </div>

  <h4 class="font-semibold text-gray-800 mt-4 mb-2">Itens do Pedido</h4>

  <div class="max-h-[400px] overflow-y-auto rounded-lg border border-gray-200">
    <table class="w-full text-sm border-separate" style="border-spacing: 0 6px">
      <thead class="sticky top-0 bg-white z-10">
        <tr class="text-gray-600 border-b border-gray-200">
          <th class="text-left py-2 px-2">Produto</th>
          <th class="text-center py-2 px-2">Qtd</th>
          <th class="text-center py-2 px-2">Preço</th>
          <th class="text-center py-2 px-2">Total</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(i, idx) in (isEditing ? editedItem.itens : item.itens)"
          :key="idx"
          class="bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg"
        >
          <td class="py-2 px-2 flex items-center gap-3 text-gray-800">
            <img :src="i.produto.imagem" alt="Produto" class="w-10 h-10 object-cover rounded-lg" />
            {{ i.produto.nome }}
          </td>

          <td class="py-2 px-2 text-center font-medium">
            <template v-if="!isEditing">{{ i.quantidade }}</template>
            <template v-else>
              <div class="relative flex items-center justify-center group">
                <input
                  type="number"
                  min="1"
                  v-model.number="i.quantidade"
                  class="border rounded px-1 py-0.5 w-16 text-center"
                />
                <img
                  src="@/assets/img/icons/edit-black.svg"
                  alt="Editar"
                  class="w-4 h-4 absolute right-1 opacity-70 cursor-pointer transition-transform group-hover:scale-110"
                />
              </div>
            </template>
          </td>

          <td class="py-2 px-2 text-center text-gray-700">
            R$ {{ formatPrice(i.produto.preco) }}
          </td>

          <td class="py-2 px-2 text-center text-gray-700">
            R$ {{ formatPrice(i.quantidade * i.produto.preco) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="mt-4 flex justify-end items-center font-bold text-green-700">
    Total Geral: R$
    {{
      formatPrice(
        (isEditing ? editedItem.itens : item.itens).reduce(
          (acc, i) => acc + i.quantidade * i.produto.preco,
          0
        )
      )
    }}
  </div>
</template>


        <!-- Produto -->
        <template v-else-if="dataKey === 'produtos' && item">
          <div class="flex flex-col gap-3">
            <img :src="item.imagem" alt="Produto" class="w-32 h-32 object-cover rounded-lg mx-auto" />
            <div class="flex items-center gap-2">
              <span class="font-semibold">Nome:</span>
              <template v-if="!isEditing">{{ item.nome }}</template>
              <template v-else>
                <div class="relative flex items-center group">
                  <input v-model="editedItem.nome" class="border rounded-lg px-2 py-1" />
                  <img
                    src="@/assets/img/icons/edit-black.svg"
                    alt="Editar"
                    class="w-4 h-4 absolute right-2 opacity-70 cursor-pointer transition-transform group-hover:scale-110"
                  />
                </div>
              </template>
            </div>
            <div class="flex items-center gap-2">
              <span class="font-semibold">Preço:</span>
              <template v-if="!isEditing">R$ {{ formatPrice(item.preco) }}</template>
              <template v-else>
                <div class="relative flex items-center group">
                  <input
                    type="number"
                    step="0.01"
                    v-model.number="editedItem.preco"
                    class="border rounded-lg px-2 py-1 w-24"
                  />
                  <img
                    src="@/assets/img/icons/edit-black.svg"
                    alt="Editar"
                    class="w-4 h-4 absolute right-2 opacity-70 cursor-pointer transition-transform group-hover:scale-110"
                  />
                </div>
              </template>
            </div>
            <div class="flex items-center gap-2">
              <span class="font-semibold">Quantidade:</span>
              <template v-if="!isEditing">{{ item.quantidade_em_estoque }}</template>
              <template v-else>
                <div class="relative flex items-center group">
                  <input
                    type="number"
                    min="0"
                    v-model.number="editedItem.quantidade_em_estoque"
                    class="border rounded-lg px-2 py-1 w-24"
                  />
                  <img
                    src="@/assets/img/icons/edit-black.svg"
                    alt="Editar"
                    class="w-4 h-4 absolute right-2 opacity-70 cursor-pointer transition-transform group-hover:scale-110"
                  />
                </div>
              </template>
            </div>
          </div>
        </template>

        <!-- Usuário -->
        <template v-else-if="dataKey === 'usuarios' && item">
          <div class="flex flex-col gap-3">
            <div class="flex items-center gap-2">
              <span class="font-semibold">Nome:</span>
              <template v-if="!isEditing">{{ item.name || 'Usuário sem nome' }}</template>
              <template v-else>
                <div class="relative flex items-center group">
                  <input v-model="editedItem.name" class="border rounded-lg px-2 py-1" />
                  <img
                    src="@/assets/img/icons/edit-black.svg"
                    alt="Editar"
                    class="w-4 h-4 absolute right-2 opacity-70 cursor-pointer transition-transform group-hover:scale-110"
                  />
                </div>
              </template>
            </div>
            <div class="flex items-center gap-2">
              <span class="font-semibold">Email:</span>
              <template v-if="!isEditing">{{ item.email }}</template>
              <template v-else>
                <div class="relative flex items-center group">
                  <input v-model="editedItem.email" class="border rounded-lg px-2 py-1" />
                  <img
                    src="@/assets/img/icons/edit-black.svg"
                    alt="Editar"
                    class="w-4 h-4 absolute right-2 opacity-70 cursor-pointer transition-transform group-hover:scale-110"
                  />
                </div>
              </template>
            </div>
            <div class="flex items-center gap-2">
              <span class="font-semibold">Perfil:</span>
              <template v-if="!isEditing">
                <span
                  class="ml-1 px-3 py-1 rounded-full text-xs font-semibold"
                  :class="perfilBadgeClass(item.perfil)"
                >
                  {{ perfilMap[item.perfil] || item.perfil }}
                </span>
              </template>
              <template v-else>
                <select v-model="editedItem.perfil" class="border rounded-lg px-2 py-1">
                  <option value="administrador">Administrador</option>
                  <option value="usuario">Usuário</option>
                </select>
              </template>
            </div>
          </div>
        </template>

        <!-- Nenhum dado -->
        <template v-else>
          <div class="text-center text-gray-400 italic">Sem dados para exibir.</div>
        </template>
      </div>
    </div>
  </div>
  </transition>
</template>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
