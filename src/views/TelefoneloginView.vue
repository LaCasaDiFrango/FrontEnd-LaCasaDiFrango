<template>
    <BackButton />
  <div class="container">
    

    <label class="label" for="phone">Qual seu telefone?</label>

    <PhoneInput v-model="telefone" />

    <button class="submit-btn" @click="enviarCodigo">
      Receber código por WhatsApp
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import BackButton from "@/components/buttons/BackButton.vue";
import PhoneInput from "@/components/cards/PhoneInput.vue";

// Estado reativo
const telefone = ref("");

// Acesso ao roteador
const router = useRouter();

// Métodos

function enviarCodigo() {
  router.push("/telefoneauthlogin");
}

</script>


<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  font-family: sans-serif;
}

.back-btn {
  align-self: flex-start;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

.label {
  font-size: 20px;
}

.submit-btn {
  background-color: #2f4f2f;
  color: white;
  font-size: 16px;
  padding: 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
</style>
