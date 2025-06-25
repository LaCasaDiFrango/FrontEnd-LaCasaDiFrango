<template>
  <div class="register-page">
    <BackButton />
    <!-- Componente de login Passage -->
    <passage-auth app-id="WEG5lzsWo0bbZlaYwtVYYb6Q"></passage-auth>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import '@passageidentity/passage-elements/passage-auth'
import InputForm from '@/components/forms/InputForm.vue'
import BackButton from '@/components/buttons/BackButton.vue'
import api from '@/api/api'

</script>


<style scoped>
.register-page {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  background-color: white;
}
</style>
