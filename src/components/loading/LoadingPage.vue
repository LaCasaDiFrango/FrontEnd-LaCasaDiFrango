<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const frases = [
  'O frango mais saboroso da cidade!',
  'Entrega rápida e quentinha!',
  'Sabor que conquista toda a família!',
  'Do forno para a sua mesa em minutos!'
]

const fraseAtual = ref(frases[0])
let index = 0
let intervalo = null

const progressWidth = ref(0)

onMounted(() => {
  const duration = 3000 // 3 segundos
  const stepTime = 50
  const step = stepTime / duration * 100

  intervalo = setInterval(() => {
    // Atualiza progress
    progressWidth.value += step
    if (progressWidth.value >= 100) {
      progressWidth.value = 0
      index = (index + 1) % frases.length
      fraseAtual.value = frases[index]
    }
  }, stepTime)
})

onUnmounted(() => {
  clearInterval(intervalo)
})
</script>

<template>
  <div class="container">
    <h2>La Casa Di Frango</h2>
    
    <div class="progress-bar">
      <div class="progress-fill" :style="{ width: progressWidth + '%' }"></div>
    </div>

    <img src="@/assets/img/logo.png" alt="Logo" />
    
    <transition name="fade" mode="out-in">
      <p :key="fraseAtual">{{ fraseAtual }}</p>
    </transition>
  </div>
</template>

<style scoped>
.container {
    position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 100%;
  height: 100dvh;
  background: #214225;
}

h2 {
  font-size: 1.8rem;
  color: #fff;
  text-align: center;
  font-weight: 700;
  letter-spacing: 1px;
}

/* Barra de progresso */
.progress-bar {
  width: 70%;
  height: 6px;
  background: rgba(255,255,255,0.2);
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #fff;
  width: 0%;
  transition: width 0.05s linear; /* suaviza o crescimento */
}

/* Logo girando */
img {
  width: 350px;
  height: auto;
  animation: spin 2s linear infinite;
}

/* Frases fade */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.8s;
}
.fade-enter-from, .fade-leave-to { opacity: 0; }
.fade-enter-to, .fade-leave-from { opacity: 1; }

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

p {
  font-size: 1.2rem;
  color: #fff;
  text-align: center;
  font-weight: 500;
}
</style>
