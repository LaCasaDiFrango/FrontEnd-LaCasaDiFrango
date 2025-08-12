<script setup>
defineProps({
    text: {
        type: String,
    }
})

function VoltarHome() {
  window.location.href = '/home'
}
</script>
<template>
      <div class="main">
        <img src="@/assets/img/block-svgrepo-com.svg" alt="Logo"/>
        <p>{{ text }}</p>
      </div>
            <div class="botoes">
        <button class="botao-verde" @click="VoltarHome()">Voltar para a home</button>
      </div>
</template>
<style scoped>
.main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    width: 100%;
    height: 75dvh;
    }

.main img{
    width: 250px;
    height: auto;
    opacity: 0.4;
}

.main p {
    font-size: 1.2rem;
    color: #555;
    text-align: center;
    }

    .botoes {
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.botao-verde {
  flex: 1;
  padding: 2rem 0;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  background-color: #1d4523;
  color: white;
}
</style>