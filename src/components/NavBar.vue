<template>
  <nav>
    <ul>
      <li>
        <router-link to="/">
          <img src="/src/assets/img/home.png" alt="Início" />
          <span>Início</span>
        </router-link>
      </li>
      <li>
        <router-link to="/pedidos">
          <img src="/src/assets/img/bill.png" alt="Pedido" />
          <span>Pedido</span>
        </router-link>
      </li>
      <li>
        <router-link to="/produtos">
          <img src="/src/assets/img/roasted-chicken.png" alt="Produtos" />
          <span>Produtos</span>
        </router-link>
      </li>
      <li>
        <router-link to="/perfil">
          <img src="/src/assets/img/people.png" alt="Perfil" />
          <span>Perfil</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<style>
nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  border-top: 1px solid #d1d5db; 
  box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.1);
  z-index: 50;
  font-family: sans-serif;
}

ul {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0.5rem 0;
  margin: 0;
  list-style: none;
}

li {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.75rem; 
}

img {
  width: 30px;
  height: 30px;
  margin-bottom: 4px;
}


a {
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
