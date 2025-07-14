<script setup>
import { BackButton, NavBar } from '@/components/index'
</script>
<template>
  <div class="cardapio-container">
    <BackButton />
    <h2>Cardápio</h2>
    <div class="search">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="icon-lupa"
        viewBox="0 0 24 24"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <span>Procure em nosso cardápio</span>
    </div>
    <div class="nav">
      <div class="categorias">
        <img src="@/assets/img/chicken-leg.png" alt="Categorias" />
        <span>Frango</span>
      </div>
      <div class="categorias">
        <img src="@/assets/img/chicken-leg.png" alt="Categorias" />
        <span>Maionese</span>
      </div>
      <div class="categorias">
        <img src="@/assets/img/chicken-leg.png" alt="Categorias" />
        <span>Bebidas</span>
      </div>
    </div>
    <section class="cardapioMain">
      <div class="categoriaCardapio">
        <h3>Frango</h3>
        <div class="cardapioItem">
          <img src="@/assets/img/chicken-leg.png" alt="Frango Assado" />
          <div class="itemInfo">
            <h4>Frango Assado</h4>
            <span>R$ 29,90</span>
          </div>
        </div>
        <div class="cardapioItem">
          <img src="@/assets/img/chicken-leg.png" alt="Frango Assado" />
          <div class="itemInfo">
            <h4>Frango Assado</h4>
            <span>R$ 29,90</span>
          </div>
        </div>
      </div>
      <div class="categoriaCardapio">
        <h3>Bebidas</h3>
        <div class="cardapioItem">
          <img src="@/assets/img/chicken-leg.png" alt="Frango Assado" />
          <div class="itemInfo">
            <h4>Frango Assado</h4>
            <span>R$ 29,90</span>
          </div>
        </div>
        <div class="cardapioItem">
          <img src="@/assets/img/chicken-leg.png" alt="Frango Assado" />
          <div class="itemInfo">
            <h4>Frango Assado</h4>
            <span>R$ 29,90</span>
          </div>
        </div>
      </div>
       <div class="categoriaCardapio">
        <h3>Maionese</h3>
        <div class="cardapioItem">
          <img src="@/assets/img/chicken-leg.png" alt="Frango Assado" />
          <div class="itemInfo">
            <h4>Frango Assado</h4>
            <span>R$ 29,90</span>
          </div>
        </div>
        <div class="cardapioItem">
          <img src="@/assets/img/chicken-leg.png" alt="Frango Assado" />
          <div class="itemInfo">
            <h4>Frango Assado</h4>
            <span>R$ 29,90</span>
          </div>
        </div>
      </div>
    </section>
<NavBar/>
  </div>
</template>
<style scoped>
.cardapio-container {
  padding: 14px 50px 50px 50px;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 15px;
  justify-content: center;
}
.search {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  color: #555;
  cursor: text; /* Para parecer que pode digitar */
  border: 2px solid #ccc;
  border-radius: 12px;
  padding: 10px 30px;
}

.icon-lupa {
  color: #888;
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.nav .categorias {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  cursor: pointer;
}

.nav .categorias img {
  width: 50px;
  height: 50px;
  background-color: #f0f0f0;
}

.cardapioMain {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.cardapioMain .categoriaCardapio {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.cardapioMain .categoriaCardapio h3 {
  font-size: 24px;
  color: #333;
}

.cardapioMain .categoriaCardapio .cardapioItem {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 0 0 20px 0;
  border-bottom: 2px solid #ccc;
}

.cardapioMain .categoriaCardapio .cardapioItem img {
  width: 100px;
  height: 100px;
  border-radius: 8px;
}

.cardapioMain .categoriaCardapio .cardapioItem .itemInfo {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.cardapioMain .categoriaCardapio .cardapioItem .itemInfo h4 {
  font-size: 20px;
  color: #333;
}

.cardapioMain .categoriaCardapio .cardapioItem .itemInfo span {
  font-size: 18px;
  color: #000; /* Cor do preço */
}
</style>