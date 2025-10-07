<template>
  <div
    class="category-nav-wrapper"
    ref="wrapper"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
    @pointercancel="onPointerUp"
    @pointerleave="onPointerUp"
  >
    <div class="category-nav">
      <button
        v-for="category in categories"
        :key="category.id"
        class="category-btn"
        :class="{ active: activeCategory === category.id }"
        @click="goTo(category.id)"
        :aria-pressed="activeCategory === category.id"
        type="button"
      >
        <div class="icon-bg">
          <img :src="category.icon" :alt="category.name" class="category-icon" />
        </div>
        <span class="category-name">{{ category.name }}</span>
        <div class="active-indicator" v-if="activeCategory === category.id"></div>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import frangoIcon from '@/assets/img/chicken-leg.png'
import bebidasIcon from '@/assets/img/soda.png'
import maioneseIcon from '@/assets/img/mashed-potatoes.png'
import farofasIcon from '@/assets/img/migalhas.png'
import costelaIcon from '@/assets/img/ribs.png'
import conservasIcon from '@/assets/img/zucchini.png'

const categories = [
  { id: 'frangos', name: 'Frangos', icon: frangoIcon },
  { id: 'bebidas', name: 'Bebidas', icon: bebidasIcon },
  { id: 'maionese', name: 'Maionese', icon: maioneseIcon },
  { id: 'farofas', name: 'Farofas', icon: farofasIcon },
  { id: 'costela', name: 'Costela', icon: costelaIcon },
  { id: 'conservas', name: 'Conservas', icon: conservasIcon },
]

const activeCategory = ref('frangos')
const wrapper = ref(null)

// drag state
let isDown = false
let startX = 0
let startScroll = 0
let activePointerId = null

function onPointerDown(e) {
  // só processa botão primário/touch
  if (e.button && e.button !== 0) return
  isDown = true
  activePointerId = e.pointerId
  // captura o ponteiro no elemento para receber pointermove mesmo fora do alvo
  try { wrapper.value.setPointerCapture(activePointerId) } catch (err) { /* ignore */ }
  startX = e.clientX
  startScroll = wrapper.value.scrollLeft
  wrapper.value.classList.add('dragging')
}

function onPointerMove(e) {
  if (!isDown) return
  // calcula quanto mover e aplica scroll
  const delta = e.clientX - startX
  wrapper.value.scrollLeft = startScroll - delta
}

function onPointerUp(/* e */) {
  if (!isDown) return
  isDown = false
  try { wrapper.value.releasePointerCapture(activePointerId) } catch (err) { /* ignore */ }
  activePointerId = null
  wrapper.value.classList.remove('dragging')
}

function goTo(id) {
  activeCategory.value = id
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<style scoped>
/* wrapper: controla overflow e comportamento de touch/overscroll */
.category-nav-wrapper {
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  touch-action: pan-y;            /* permite scroll vertical nativo, tratamos horizontal via JS */
  overscroll-behavior: contain;   /* evita que o scroll "vaze" para o body (previne estourar a tela) */
  -ms-overflow-style: none;       /* esconde scrollbar no IE */
  scrollbar-width: none;          /* esconde scrollbar no Firefox */
  user-select: none;              /* evita seleção ao arrastar */
  padding: 10px 0;
}

/* esconde scrollbar nos WebKit */
.category-nav-wrapper::-webkit-scrollbar { display: none; }

.category-nav {
  display: flex;
  gap: 15px;
  align-items: center;
  /* mantemos o conteúdo em linha e com largura dependente do número de itens */
  width: max-content;
  padding: 0 12px;
}

/* cada item: tenta mostrar 3 por vez, mas é responsivo */
.category-btn {
  flex: 0 0 clamp(110px, calc((100vw - 48px) / 3), 180px);
  /* clamp(min, desired, max) -> mantém responsivo e evita itens extremamente grandes */
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background: #fff;
  border: 1px solid transparent;
  border-radius: 10px;
  padding: 10px 8px;
  position: relative;
  cursor: pointer;

  box-shadow: 0 1px 0 rgba(0,0,0,0.04);
  transition: transform .12s ease, box-shadow .12s ease;
}

/* efeito ao pressionar */
.category-btn:active { transform: translateY(1px); }

/* quando arrastando, mostra cursor apropriado */
.category-nav-wrapper.dragging { cursor: grabbing; cursor: -webkit-grabbing; }

/* ícone redondo */
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
  margin-top: 6px;
  font-size: 14px;
  color: #333;
  text-align: center;
}

/* indicador ativo */
.active-indicator {
  width: 50%;
  height: 4px;
  background-color: #1a693b;
  border-radius: 2px;
  position: absolute;
  bottom: 6px;
}

/* estado ativo do botão (borda/elevação) */
.category-btn.active {
  border-color: rgba(26,105,59,0.12);
  box-shadow: 0 4px 14px rgba(26,105,59,0.06);
}

/* evita que imagens movam layout ao carregar */
.category-icon { display: block; }

/* acessibilidade: foco */
.category-btn:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(26,105,59,0.12);
}
</style>
