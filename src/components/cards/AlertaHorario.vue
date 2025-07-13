<template>
  <div class="alerta-container">
    <img src="/src/assets/img/warning-sign.png" alt="Atenção" class="alert-icon" />
    <p class="alert-title">ATENÇÃO</p>
    <p class="alert-text">Horário de Funcionamento: <strong>Quarta a Domingo</strong></p>
    <p class="alert-text">Retirada de Encomendas: <strong>9:00 a 12:30</strong> </p>
  </div>
</template>

<style scoped>
.alerta-container {
  text-align: center;
  margin: 52px 0;
}

.alert-icon {
  width: 50px;
  height: 50px;
  margin-bottom: 12px;
}

.alert-title {
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 6px;
  color: #000;
}

.alert-text {
  font-size: 14px;
  color: #333;
  margin: 0;
}
</style>