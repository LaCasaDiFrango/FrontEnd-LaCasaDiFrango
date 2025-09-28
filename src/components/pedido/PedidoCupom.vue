<script setup>
     defineProps({
    title: {
        type: String,
    },
    subtitle: {
        type: String,
    },
    img: {
        type: String,
    },
    customClass: {
        type: String,
        default: ''
    },
});
const emit = defineEmits(['click'])
</script>
<template>
    <section class="cupom-container" @click="emit('click')">
        <div class="title">
            <img :src="img" alt="Cupom">
            <div class="title-subtitle">
                <h2>{{ title }}</h2>
               <h4 :class="customClass">{{ subtitle }}</h4>
            </div>
        </div>
        <div class="button">
            <button><img src="/src/assets/img/left-chevron.png" alt="Ir para o {{ title }}"></button>
        </div>
    </section>
</template>
<style scoped>
.cupom-container{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #eee;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 100%;
    transition: transform 0.3s;
}

.cupom-container:hover{
    background: #f9f9f9;
    cursor: pointer;
    transform: translateX(5px) translateY(-2px);
}
.cupom-container .title{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

.cupom-container .title img{
    width: 30px;
    height: auto;
}

.cupom-container .title .title-subtitle{
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    gap: 5px;
}
.cupom-container .title .title-subtitle h2{
    font-weight: 600;
    font-size: 1rem;
}
.cupom-container .button{
    display: flex;
    align-items: center;
    justify-content: center;
}
.cupom-container .button button{
    background: none;
    border: none;
    cursor: pointer;
}

.cupom-container .button button img{
    width: 20px;
    height: auto;
    rotate: 180deg;
}

/* estilo especial só quando for cupom */
.cupom-style {
    font-weight: 400;
    font-size: .8rem;
}

/* estilo default (ex: pagamento) */
.pagamento-style {
    font-weight: 600;
    font-size: .8rem;
    background: #1d4523;
    color: #fff;
    padding:3px 6px;
    border-radius: 4px;
    letter-spacing: 1px;
}
</style>