<script setup>
import { defineEmits } from 'vue'

const emit = defineEmits(['click'])

const onClick = () => {
  emit('click')
}
</script>
<template>
    <div class="add-pedido-button" @click="onClick">
        <slot>Adicionar Pedido</slot>
    </div>
</template>
<style scoped>
.add-pedido-button {
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 35px 0;
  background-color: #1b3d1f;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
}
</style>