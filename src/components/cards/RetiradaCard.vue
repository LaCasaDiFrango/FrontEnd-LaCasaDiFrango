<script setup></script>
<template>
   <div class="retirada-card">
      <img src="@/assets/img/logo.png" class="retirada-icon" alt="logo" />
      <div class="retirada-texto">
        <span class="retirada-title">Retirar em</span>
        <span class="retirada-endereco">R. Santa Catarina, 683 - Floresta, Joinville - SC</span>
      </div>
    </div>
</template>
<style scoped>
.retirada-card {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9f9f9;
  gap: 5px;
  border-radius: 10px;
  padding: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.retirada-icon {
  width: 60px;
  height: auto;
}

.retirada-texto {
  display: flex;
  flex-direction: column;
}

.retirada-title {
  font-weight: bold;
  font-size: 14px;
}

.retirada-endereco {
  font-size: 13px;
  color: #555;
}
</style>