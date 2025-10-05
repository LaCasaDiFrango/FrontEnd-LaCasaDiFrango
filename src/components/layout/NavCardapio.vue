<template>
  <div class="category-nav-wrapper">
    <div class="category-nav">
      <div
        class="category-btn"
        v-for="category in categories"
        :key="category.id"
        :class="{ active: activeCategory === category.id }"
        @click="scrollToSection(category.id)"
      >
        <div class="icon-bg">
          <img :src="category.icon" :alt="category.name" class="category-icon" />
        </div>
        <span class="category-name">{{ category.name }}</span>
        <div class="active-indicator" v-if="activeCategory === category.id"></div>
      </div>
    </div>
  </div>
</template>

<script>
import frangoIcon from '@/assets/img/chicken-leg.png'
import bebidasIcon from '@/assets/img/soda.png'
import maioneseIcon from '@/assets/img/mashed-potatoes.png'
import farofasIcon from '@/assets/img/migalhas.png'
import costelaIcon from '@/assets/img/ribs.png'
import conservasIcon from '@/assets/img/zucchini.png'

export default {
  name: 'CategoryNav',
  data() {
    return {
      activeCategory: 'frangos',
      categories: [
        { id: 'frangos', name: 'Frangos', icon: frangoIcon },
        { id: 'bebidas', name: 'Bebidas', icon: bebidasIcon },
        { id: 'maionese', name: 'Maionese', icon: maioneseIcon },
        { id: 'farofas', name: 'Farofas', icon: farofasIcon },
        { id: 'costela', name: 'Costela', icon: costelaIcon },
        { id: 'conservas', name: 'Conservas', icon: conservasIcon },
      ],
    }
  },
  methods: {
    scrollToSection(id) {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        this.activeCategory = id
      }
    },
  },
}
</script>

<style scoped>
.category-nav-wrapper {
  overflow-x: auto;
  scroll-snap-type: x mandatory; /* habilita snap horizontal */
  -webkit-overflow-scrolling: touch;
  padding: 10px 0;
}

.category-nav {
  display: flex;
  gap: 15px;
}

.category-btn {
  flex:  39.33%; /* mostra 3 itens por vez */
  scroll-snap-align: start; /* snap ao arrastar */
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  

  padding: 10px 5px;
  cursor: pointer;
  position: relative;

}

.icon-bg {
  background-color: #f5f5f5;
  border-radius: 50%;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.category-icon {
  width: 50px;
  height: 50px;
  object-fit: contain;
}

.category-name {
  margin-top: 5px;
  font-size: 14px;
  color: #333;
  text-align: center;
}

.active-indicator {
  width: 50%;
  height: 4px;
  background-color: #1a693b;
  border-radius: 2px;
  position: absolute;
  bottom: 0;
}
.category-nav-wrapper {
  overflow-x: auto;
  overflow-y: hidden;       /* previne scroll vertical/acidental */
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch; /* smooth scroll no mobile */
  display: flex;
  gap: 15px;
  padding: 10px 0;
}

.category-nav-wrapper::-webkit-scrollbar {
  display: none; /* opcional: esconde a barra de rolagem */
}

.category-nav {
  display: flex;
  gap: 15px;
  flex-wrap: nowrap;        /* força os itens em linha única */
}

.category-btn {
  flex: 0 0 20.33%;         /* mostra 3 por vez */
  scroll-snap-align: start; /* encaixa ao arrastar */
}



</style>
