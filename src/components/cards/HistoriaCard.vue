<script setup>
defineProps({
  title: {
    type: String,
    default: 'Nossa História'
  },
  text: {
    type: String,
    default: 'Conheça nossa história de 31 anos de comércio, nossa equipe e algumas lembranças'
  }
})
</script>

<template>
  <div class="historia-container">
    <img src="/src/assets/img/file.png" alt="História" class="historia-icon" />
    <h3 class="historia-title">{{ title }}</h3>
    <p class="historia-text">
      {{ text }}
    </p>
    <router-link to="/historia" class="historia-link">
      <button class="historia-button">
        <span>Ver História</span>
       
      </button>
    </router-link>
  </div>
</template>

<style scoped>
.historia-container {
  text-align: center;
  margin: 28px 0;
  position: relative;
  padding: 20px;
}

/* Ícone da seção */
.historia-icon {
  width: 50px;
  height: 50px;
  margin-bottom: 8px;
}

.historia-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 6px;
  color: #111;
}

.historia-text {
  font-size: 14px;
  color: #333;
  line-height: 1.4;
  margin-bottom: 20px;
}

/* Botão criativo */
.historia-button {
  background: linear-gradient(135deg, #ff6600, #ff9500);
  color: white;
  font-size: 15px;
  font-weight: 600;
  padding: 12px 20px;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(255, 102, 0, 0.4);
  position: relative;
  overflow: hidden;
}



/* Animação no hover */
.historia-button:hover {
  background: linear-gradient(135deg, #ff9500, #ff6600);
  box-shadow: 0 6px 16px rgba(255, 102, 0, 0.6);
  transform: scale(1.05);
}

.historia-button:hover .icon {
  transform: translateX(5px);
}

/* Efeito extra: luz passando no botão */
.historia-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 80%;
  height: 100%;
  background: rgba(255, 255, 255, 0.3);
  transform: skewX(-30deg);
  transition: 0.5s;
}

.historia-button:hover::before {
  left: 120%;
}
</style>
