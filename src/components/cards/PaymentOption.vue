<template>
  <div class="payment-option" :class="{ expanded: isExpanded }">
    <button class="toggle-button" @click="$emit('toggle')">
      <img :src="icon" alt="" class="icon" />
      <span>{{ title }}</span>
      <span class="arrow">
        <img v-if="isExpanded" :src="uploadIcon" alt="Seta para cima" class="arrow-up" />
        <img v-else :src="DownArrowIcon" alt="Seta para baixo" class="arrow-icon" />
      </span>
    </button>

    <div v-if="isExpanded" class="form">
      <label>
        Número do cartão
        <input type="text" v-model="cardNumber" />
      </label>

      <div class="row">
        <label>
          Data de validade
          <input type="text" v-model="expiry" />
        </label>
        <label>
          CVV
          <input type="text" v-model="cvv" />
        </label>
      </div>

      <label>
        Número do titular
        <input type="text" v-model="cardHolder" />
      </label>

      <button class="add-button">Adicionar</button>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from "vue";
import DownArrowIcon from "@/assets/img/down-arrow.png";
import uploadIcon from "@/assets/img/upload.png";

const props = defineProps({
  title: String,
  icon: String,
  isExpanded: Boolean,
});

const cardNumber = ref("");
const expiry = ref("");
const cvv = ref("");
const cardHolder = ref("");
</script>

<style scoped>
.payment-option {
  border: 2px solid #23471b;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 15px;
  transition: all 0.3s ease;
}

.toggle-button {
  background: white;
  border: none;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}

.icon {
  width: 32px;
  height: 32px;
}

.arrow {
  margin-left: auto;
  display: flex;
  align-items: center;
  height: 100%;
}

.arrow-icon {
  width: 26px;
  height: 26px;
}

.arrow-up {
  width: 20px;
  height: 20px;

}

.form {
  margin-top: 15px;
}

label {
  padding: 2px;
  display: block;
  margin-bottom: 10px;
  font-size: 16px;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #999;
  border-radius: 6px;
  background: #eee;
}

.row {
  display: flex;
  gap: 10px;
}

.row label {
  flex: 1;
}

.add-button {
  margin-top: 10px;
  padding: 10px;
  background-color: #23471b;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  width: 100%;
  cursor: pointer;
}
</style>
