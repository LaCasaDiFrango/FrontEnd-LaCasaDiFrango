<template>
  <div class="register-page">
    <BackButton />

    <!-- Componente de login Passage -->
    <passage-auth app-id="WEG5lzsWo0bbZlaYwtVYYb6Q"></passage-auth>

    <!-- Formulário extra (só aparece após login via Passage) -->
      <ContinueButton type="submit" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import '@passageidentity/passage-elements/passage-auth'
import BackButton from '@/components/buttons/BackButton.vue'
import InputForm from '@/components/forms/InputForm.vue'
import ContinueButton from '@/components/buttons/ContinueButton.vue'
import api from '@/api/api'
</script>

<style scoped>
.register-page {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  background-color: white;
}

.form-content {
  padding: 1.5rem;
  flex-grow: 1;
  font-weight: 550;
}
</style>
