<template>
  <section class="historia-banner">
    <div class="overlay"></div>
    <img src="/src/assets/img/GaleriaFrango/frente mais velha.jpg" alt="Nossa História" class="historia-bg" />
    
    <div class="content">
      <h1 class="titulo"> Nossa História </h1>

      <router-link to="/historia" class="historia-link">
        <button class="historia-button">
          <span>Ver História</span>
      
        </button>
      </router-link>
    </div>
  </section>
</template>

<style scoped>
.historia-banner {
  position: relative;
  width: 100%;
  height: 300px; /* ideal para mobile */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

/* Imagem de fundo */
.historia-bg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(60%); /* Foco baixo para destacar texto */
}

/* Camada escura para contraste */
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
}

/* Conteúdo centralizado */
.content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #fff;
  padding: 0 15px;
}

/* Título */
.titulo {
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 8px;
  text-transform: uppercase;
}

/* Descrição */
.descricao {
  font-size: 14px;
  margin-bottom: 16px;
  opacity: 0.9;
}

/* Botão animado */
.historia-button {
  background: linear-gradient(135deg, #2d4d2e, #459c3a);
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  padding: 10px 18px;
  border: none;
  border-radius: 50px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(9, 218, 79, 0.4);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}


</style>
