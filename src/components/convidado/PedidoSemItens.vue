<script setup>
defineProps({
    text: {
        type: String,
    }
})
</script>
<template>
      <div>
        <img src="@/assets/img/logo.png" alt="Logo"/>
        <p>{{ text }}</p>
      </div>
</template>
<style scoped>
div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    width: 100%;
    height: 75dvh;
    }

div img{
    width: 350px;
    height: auto;
    opacity: 0.4;
}

div p {
    font-size: 1.2rem;
    color: #555;
    text-align: center;
    }
</style>