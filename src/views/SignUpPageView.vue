<template>
  <div class="register-page">
    <BackButton />
  <passage-auth app-id="WEG5lzsWo0bbZlaYwtVYYb6Q"></passage-auth>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {BackButton, InputForm} from '@/components/index'
import '@passageidentity/passage-elements/passage-auth'
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

.button-footer {
  position: sticky;
  bottom: 0;
  background-color: #1b3d1f;
  padding: 1rem;
}

.button-footer button {
  width: 100%;
}
</style>