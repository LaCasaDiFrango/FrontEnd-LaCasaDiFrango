<template>
  <div class="contato-container">
    <h3 class="contato-titulo">CONTATOS</h3>
    <div class="contato-grid">
      <a
        href="https://wa.me/5547999942292"
        target="_blank"
        rel="noopener noreferrer"
        class="contato-item"
      >
        <img src="/src/assets/img/whatsapp.png" alt="WhatsApp" class="contato-icon" />
        <span>(47) 99994-2292</span>
      </a>

      <a
        href="https://www.instagram.com/lacasadifrangojoinville"
        target="_blank"
        rel="noopener noreferrer"
        class="contato-item"
      >
        <img src="/src/assets/img/instagram.png" alt="Instagram" class="contato-icon" />
        <span>@lacasadifrangojoinville</span>
      </a>
    </div>
  </div>
</template>

<style scoped>
.contato-container {
  text-align: center;
  margin: 32px 0;
}

.contato-titulo {
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 16px;
  color: #111;
}

.contato-grid {
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
}

.contato-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: #111;
  font-size: 13px;
}

.contato-icon {
  width: 32px;
  height: 32px;
  margin-bottom: 8px;
}
</style>
