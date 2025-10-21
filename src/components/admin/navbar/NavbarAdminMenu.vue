<script setup>
import { useNavBarAdminStore } from '@/stores/index'

const store = useNavBarAdminStore()

function handleClick(to) {
  store.navigateTo(to)
}
</script>

<template>
  <nav class="flex flex-col gap-8 text-sm w-full">
    <div
      v-for="section in store.menuSections"
      :key="section.title"
      class="flex flex-col gap-3"
    >
      <!-- título da seção -->
      <p class="text-gray-500 uppercase text-xs tracking-wide">
        {{ section.title }}
      </p>

      <!-- lista de labels -->
      <ul class="flex flex-col gap-2 pl-4"> <!-- desloca levemente para a direita -->
        <li v-for="item in section.items" :key="item.to" @click.prevent="handleClick(item.to)">
          <a
            href="#"
            class="links"
            :class="[
              store.isCurrent(item.to)
                ? 'text-black font-semibold'
                : 'text-gray-700 hover:text-black transparent hover:border-green-800',
              'flex items-center transition-all duration-200 ease-out hover:-translate-y-[2px] hover:translate-x-[2px] rounded-sm'
            ]"
          >
            <span>{{ item.label }}</span>
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>
<style scoped>
.links {
  padding-left: 0.5rem;
  border-left: 6px solid transparent;
  transition: all 0.2s ease-out;
  margin: 5px 0 0 0;
}

.links:hover {
  border-left-color: #B91C1C;
}
</style>
