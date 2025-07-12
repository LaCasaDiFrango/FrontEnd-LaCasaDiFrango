<template>
  <div class="localizacao-container">
    <img src="/src/assets/img/lugar-colocar.png" alt="Localização" class="localizacao-icon" />
    <p class="localizacao-text">
      Saiba Nossa Localização Acompanhando o<br />
      mapa abaixo
    </p>

    <div class="mapa-wrapper">
      <iframe
        class="mapa-frame"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3575.9384190156743!2d-48.84838872374107!3d-26.328493477000215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94deb0fb413e9309%3A0xa2a1b12fae98c0cb!2sLa%20Casa%20di%20Frango!5e0!3m2!1spt-BR!2sbr!4v1752282947240!5m2!1spt-BR!2sbr"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  </div>
</template>


<style scoped>
.localizacao-container {
  text-align: center;
  margin: 52px 0;
}

.localizacao-icon {
  width: 55px;
  height: 55px;
  margin-bottom: 17px;
}

.localizacao-text {
  font-size: 14px;
  color: #333;
  margin-bottom: 29px;
}

.mapa-wrapper {
  max-width: 100%;
  padding: 0 16px;
  display: flex;
  justify-content: center;
}

.mapa-frame {
  width: 320px;
  height: 200px;
  border: 0;
  border-radius: 12px;
}
</style>
