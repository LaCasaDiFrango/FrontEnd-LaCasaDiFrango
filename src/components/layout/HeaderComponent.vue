<script setup>
</script>

<template>
  <header class="header">
    <router-link to="/" >
    <button class="logo-button">
      <img src="@/assets/img/logo.png" alt="Logo Galinha" class="logo-img" />
    </button>
    </router-link>

    <div class="address-selector">
      <span class="address-text">{{ Rua }}Rua Ascurra, 125</span>
      <svg xmlns="http://www.w3.org/2000/svg" class="arrow-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </div>

  
    <button class="phone-button">
      <img src="@/assets/img/phone-call.png" alt="Telefone" class="phone-icon" />
    </button>
  </header>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap');

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0.5rem;
  background-color: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  font-family: 'Montserrat', sans-serif;
  position: relative;
}


.address-selector {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 0.25rem;
  cursor: pointer;
}

.address-text {
  font-size: 0.8rem;
}

.arrow-icon {
  width: 16px;
  height: 16px;
}

.logo-button,
.phone-button {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}

.logo-img {
  width: 80px;
  height: 50px;
}

.phone-icon {
  width: 30px;
  height: 30px;
  margin-right: 1.5rem;
}
</style>
