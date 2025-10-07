// src/stores/ui.js
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', () => {
  const loading = ref(false)

function showLoading() {
  console.log('🔵 Loading ON')
  loading.value = true
}

function hideLoading() {
  console.log('🟢 Loading OFF')
  loading.value = false
}


  return { loading, showLoading, hideLoading }
})
